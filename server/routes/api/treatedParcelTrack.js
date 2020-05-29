var express = require('express');
var router = express.Router();

var TreatedParcel = require('./../../services/TreatedParcel.js')

// POST




router.post('/treatedParcel', async (req, res) => {

    console.log(req.body)

    let parcelName = req.body.parcelName;
    let actuator = req.body.actuator;
    let phenoPhase = req.body.phenoPhase;

    
    let treatedParcelTrack = await TreatedParcel.getTrack(parcelName,actuator,phenoPhase)
    
    let treatedParcelSegments = TreatedParcel.getPathSegments(treatedParcelTrack);
    let treatedParcelArea = await TreatedParcel.getArea(parcelName,actuator,phenoPhase)
    let treatedParcelCentre = TreatedParcel.getCentre(treatedParcelArea)

    
    
    let heightStat = TreatedParcel.getStat(treatedParcelTrack,"height")
    let thicknessStat = TreatedParcel.getStat(treatedParcelTrack,"thickness")
    let densityStat = TreatedParcel.getStat(treatedParcelTrack,"density")
    let leafWallAreaStat = TreatedParcel.getStat(treatedParcelTrack,"leafWallArea")
    let authorisedDoseStat = TreatedParcel.getStat(treatedParcelTrack,"authorisedDose")
    let appliedDoseStat = TreatedParcel.getStat(treatedParcelTrack,"appliedDose")

    treatedParcel = {
        track: treatedParcelTrack,
        pathSegments: treatedParcelSegments,
        area: treatedParcelArea,
        centre: treatedParcelCentre,
        stat:{
            height: heightStat,
            leafWallArea: leafWallAreaStat,
            thickness: thicknessStat,
            density: densityStat,
            authorisedDose: authorisedDoseStat,
            appliedDose: appliedDoseStat
        }
    }

    res.json(treatedParcel)
    
});


router.post('/treatedParcelTrack', async (req, res) => {

    console.log(req.body)

    let parcelName = req.body.parcelName;
    let actuator = req.body.actuator;
    let phenoPhase = req.body.phenoPhase;

    
    let treatedParcelTrack = await TreatedParcel.getTrack(parcelName,actuator,phenoPhase)

    res.json(treatedParcelTrack)
    
});

router.post('/treatedParcelArea', async (req, res) => {


    let parcelName = req.body.parcelName;
    let actuator = req.body.actuator;
    let phenoPhase = req.body.phenoPhase;
    
    let treatedParcelArea = await TreatedParcel.getArea(parcelName,actuator,phenoPhase)

    res.json(treatedParcelArea)
    
});

module.exports = router;