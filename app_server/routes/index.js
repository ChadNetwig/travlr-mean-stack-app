var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

// CLN: passes the request for the site default starting page 
//     (i.e. root '/') over to the new main controller.
const ctrlMain = require('../controllers/main');
/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
