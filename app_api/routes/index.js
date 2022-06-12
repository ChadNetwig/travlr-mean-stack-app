const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    // CLN: added tripsController POST for adding TRIP to backend
    .post(tripsController.tripsAddTrip);
    
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    // CLN: added .put to pass to tripsUpdateTrip in controller which updates TRIP on backend MongoDB
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
