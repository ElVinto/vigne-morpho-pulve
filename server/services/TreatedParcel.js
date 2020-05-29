path = require('path');
fs = require('fs');
rl = require('readline');

coordConverter = require("./CoordConverter.js");
geom = require("./Geom.js");
simpleStat = require ("./SimpleStat.js")

class TreatedParcel{

    static parseTreatedParcel(inputDataFName){

        return new Promise((resolve, reject) => {
            try{
                let parcelTrack = []
    
                
                const input = fs.createReadStream(inputDataFName);
                // const output = fs.createWriteStream(outputDataPath)
                const readInterface = rl.createInterface({
                    input: input,
                    // output: output,
                    // console: false
                });
    
    
                input.on('end',() => {
                    console.log(`end of ${inputDataFName} reached`)
                    console.log(`parcelTrack is composed of ${parcelTrack.length} enrichedPoints`)
                    resolve(parcelTrack)
                });
    
                let firstLinePassed =false;

                readInterface.on('line', (line) =>{
                    let raw =line.split(";");
                    if(firstLinePassed){ // pass header
                        // console.log(`received : ${line}`)
                        let xLamb = parseFloat(raw[0]);
                        let yLamb = parseFloat(raw[1]);
                        let coord = coordConverter.lambert93toWGPS(xLamb,yLamb)
    
                        // console.log(`lamb: (x:${xLamb} y:${yLamb}) => gps : (lng:${coord.lng} lat:${coord.lat})`)
                        
                        let enrichedPoint ={
                            lat: coord.lat,
                            lng: coord.lng,
                            height: parseFloat(raw[2]),
                            thickness: parseFloat(raw[3]),
                            density: parseFloat(raw[4]),
                            leafWallArea: parseFloat(raw[5]),
                            authorisedDose: parseFloat(raw[6]),
                            appliedDose: (raw.length>7? parseFloat(raw[7]):parseFloat(raw[6]))
                        }
                        parcelTrack.push(enrichedPoint)
                    }
                    else{
                        firstLinePassed =true
                        console.log(`file header: ${line}`)
                    }
    
                })
     
            } catch (err) { reject(err); }
        })
    }

    static async getTrack (parcelName,actuator, phenoPhase){

        let inputDataFolderPath ='./server/data/input/csv/treatedParcelTracks/'
        let outputDataFolderPath ='./server/data/output/json/treatedParcelTracks/'
        
        let treatedParcelTrackJsonFName = path.resolve(`${outputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}.json`)
        let treatedParcelTrack = [];
        try{
            let treatedParcelJsonData = fs.readFileSync(treatedParcelTrackJsonFName);
            treatedParcelTrack = JSON.parse(treatedParcelJsonData);
            console.log(`loaded ${treatedParcelTrackJsonFName}`)

        }catch(errReadJsonFile){
            try{
                let treatedParcelDataFName = path.resolve(`${inputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}.csv`)
                treatedParcelTrack = await this.parseTreatedParcel(treatedParcelDataFName)
                
                try{
                    fs.writeFileSync(treatedParcelTrackJsonFName, JSON.stringify(treatedParcelTrack));
                }catch(errorWrittingJson){
                    console.log(" Warning File not saved: "+ treatedParcelTrackJsonFName)
                    console.error(errorWrittingJson)
                }
            }catch(errReadDataFile){
                console.error(errReadDataFile)
            }
        }
        console.log(`Number of enriched points in Track: ${treatedParcelTrack.length}`)
        return treatedParcelTrack;
    }

    static async getArea (parcelName, actuator, phenoPhase){
        
        let outputDataFolderPath ='./server/data/output/json/treatedParcelAreas/'
        
        let treatedParcelAreaJsonFName = path.resolve(`${outputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}.json`)
        let treatedParcelArea = [];

        try{
            // Loading convex hull
            let treatedParcelAreaJsonData = fs.readFileSync(treatedParcelAreaJsonFName);
            treatedParcelArea = JSON.parse(treatedParcelAreaJsonData);
            console.log(`loaded ${treatedParcelAreaJsonFName}`)
        }catch(errReadJsonFile){
            // Computing convex hull
            let treatedParcelTrack = await this.getTrack(parcelName, actuator, phenoPhase);
            treatedParcelArea = geom.convexHull(treatedParcelTrack);
            // Saving convex hull
            try{
                fs.writeFileSync(treatedParcelAreaJsonFName, JSON.stringify(treatedParcelArea));
            }catch(errorWrittingJson){
                console.log(" Warning File not saved: "+ treatedParcelAreaJsonFName)
                console.error(errorWrittingJson)
            }
            console.log(`created ${treatedParcelAreaJsonFName}`)
        }

        console.log(`Number of enriched points in Area: ${treatedParcelArea.length}`)
        return treatedParcelArea;
    }

    static getPathSegments(enrichedPoints){
        let pathSegments = [];
        for(let k=0;k<enrichedPoints.length;k++){
            const pi = enrichedPoints[k];
            let pj = (k<(enrichedPoints.length-1))? enrichedPoints[k+1]:enrichedPoints[k];
            if(geom.distance(pi,pj)>10){
                console.log(` ignoring segment pi(${pi.lat},${pi.lng}), pj(${pj.lat},${pj.lng}): ${geom.distance(pi,pj)} meters `)
                pj=pi
            }
            const segment ={
                orig: {lat:pi.lat ,lng:pi.lng},
                dest: {lat:pj.lat ,lng:pj.lng},
                height: pi.height,
                thickness: pi.thickness,
                density: pi.density,
                leafWallArea: pi.leafWallArea,
                authorisedDose: pi.authorisedDose,
                appliedDose: pi.appliedDose
            }
            pathSegments.push(segment)
            
        }
        return pathSegments
    }

    static getCentre (points) {
        let cntrLat =0;
        let cntrLng =0;
        for(let point of points){
            cntrLat += point.lat;
            cntrLng += point.lng;
        }
        if(points.length>0){
            cntrLat = cntrLat/points.length;
            cntrLng = cntrLng/points.length;
        }

        return {lat:cntrLat, lng:cntrLng}
    }

    static getStat(enrichedPoints,feature){
        let arr = []
        
        enrichedPoints.forEach(e => arr.push(e[feature]))

        let sortedArr = simpleStat.asc(arr);

        
        return {
            nbElemts: arr.length,
            sum: simpleStat.sum(arr),
            mean: simpleStat.mean(arr),
            std: simpleStat.std(arr),
            min: simpleStat.quantile(sortedArr, 0,true),
            q25: simpleStat.quantile(sortedArr, .25,true),
            median: simpleStat.quantile(sortedArr, .50,true),
            q75: simpleStat.quantile(sortedArr, .75,true),
            max: simpleStat.quantile(sortedArr, 1,true)
        }

    }

    // TODO link each point of the track with at most 4 other node
    static async getGraph(parcelName, actuator, phenoPhase){
        
        let outputDataFolderPath ='./server/data/output/json/treatedParcelAreas/'
        
        let treatedParcelGraphJsonFName = path.resolve(`${outputDataFolderPath}Parcelle_${parcelName}-actionneur_${actuator}-phasePheno_${phenoPhase}.json`)
        let treatedParcelGraph = [];

        try{
            // Loading graph
            let treatedParcelGraphJsonData = fs.readFileSync(treatedParcelGraphJsonFName);
            treatedParcelGraph = JSON.parse(treatedParcelGraphJsonData);
            console.log(`loaded ${treatedParcelGraphJsonFName}`)
        }catch(errReadJsonFile){
            // Computing convex hull
            let treatedParcelTrack = await this.getTrack(parcelName, actuator, phenoPhase);
            treatedParcelGraph = null ; // TODO
            console.log(`computed graph`)
            // Saving convex hull
            try{
                fs.writeFileSync(treatedParcelGraphJsonFName, JSON.stringify(treatedParcelGraph));
            }catch(errorWrittingJson){
                console.log(" Warning File not saved: "+ treatedParcelGraphJsonFName)
                console.error(errorWrittingJson)
            }
            console.log(`created ${treatedParcelAreaJsonFName}`)
        }

        console.log(`Number of enriched points in Graph: ${treatedParcelGraph.length}`)
        return treatedParcelGraph;
    }

    


}

module.exports = TreatedParcel;