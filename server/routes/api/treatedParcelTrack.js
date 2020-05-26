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
    let treatedParcelArea = await TreatedParcel.getArea(parcelName,actuator,phenoPhase)
    let treatedParcelCentre = TreatedParcel.getCentre(treatedParcelArea)

    treatedParcelTrack.f
    let heigth = {}

    treatedParcel = {
        track: treatedParcelTrack,
        area: treatedParcelArea,
        centre: treatedParcelCentre
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