path = require('path');
fs = require('fs');
rl = require('readline');

coordConverter = require("./CoordConverter.js");
geom = require("./Geom.js");

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

    static getTrack = async (parcelName,actuator, phenoPhase)=>{

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

    static getArea =  async (parcelName, actuator, phenoPhase)=>{
        
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

    static getCentre = (points) => {
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

    // TODO link each point of the track with at most 4 other node
    static getGraph =  async (parcelName, actuator, phenoPhase) => {
        
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