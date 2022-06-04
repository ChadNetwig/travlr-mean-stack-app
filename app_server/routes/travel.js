const express = require('express');
const router = express.Router();
const controller= require('../controllers/travel');

/* GET home page. */
//router.get('/', controller.travel);

//CLN: Updated router to call travelList
router.get('/', controller.travelList);

module.exports = router;
