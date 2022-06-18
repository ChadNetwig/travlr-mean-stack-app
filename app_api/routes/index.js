const express = require('express');
const router = express.Router();

//CLN: Added JSON Web Token support
//const jwt = require('express-jwt');
const { expressjwt: jwt }  = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET, 
    userProperty: "payload",
    algorithms: ["HS256"],
  });

// CLN: adding route to authController
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// CLN: added routers for /login and /register for API auth
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList)
    // CLN: added tripsController POST for adding TRIP to backend
    // CLN: added auth middleware injection to POST to allow access to the API endpoint for authorized users only
    .post(auth, tripsController.tripsAddTrip);
    
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    // CLN: added .put to pass to tripsUpdateTrip in controller which updates TRIP on backend MongoDB
    // CLN: adeed auth middleware injection to POST to allow access to the API endpoint for authorized users only
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
