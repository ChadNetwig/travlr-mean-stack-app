const mongoose = require('mongoose');
const model = mongoose.model('trips');
// CLN: added model (schema) for users
const User = mongoose.model('users');

// GET: /trips - lists all the trip - returns all trips, implementing Read functionality of CRUD MongoDB backend
const tripsList = async (req, res) => {
    model
        .find({})   // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip for Read functionality of CRUD MongoDB backend
const tripsFindCode = async (req, res) => {
    model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message:": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// CLN: Added tripsAddTrip to backend for Create functionality of CRUD MongoDB backend
const tripsAddTrip = async (req, res) => {
    console.log('tripsAddTrip invoked');
    //CLN: Wrapped findOneAndUpdate in getUser method to validate that the user exists before executing
    getUser(req, res,
        (req, res) => {
    model
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
            (err, trip) => {
                if (err) {
                    return res
                        .status(400) // bad request, invalid content
                        .json(err);
                } else {
                    return res
                        .status(201)  // successfully created Trip on backend
                        .json(trip);
                }
            });
        }
    )
}

// CLN: Added tripsUpdateTrip to backend for Update functionality of CRUD MongoDB backend
const tripsUpdateTrip = async (req, res) => {
    console.log('tripsUpdateTrip invoked');
    //CLN: Wrapped findOneAndUpdate in getUser method to validate that the user exists before executing
    getUser(req, res,
        (req, res) => {
    model
        .findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(trip => {
            if (!trip) {
                return res
                    .status(404)
                    .send({
                      message: "Trip not found with code " + req.params.tripCode
                });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
             }
            return res
                .status(500) // server error
                .json(err);
        });
    }
    )
}

// CLN: Added getUser method to validate that the user exists in the
//      database and return the user’s name for use as wrapper in the controller
const getUser = (req, res, callback) => {
    //if (req.payload && req.payload.email) {
    if (req.headers && req.headers.authorization) {
        // CLN: decode JWT passed into header and return JSON
        const decodedToken = parseJwt(req.headers.authorization);
        //console.log('decodedToken', decodedToken);
        User
            .findOne({ email: decodedToken.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "getUser message": "User not found! not in MongoDB" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);       
                }
                callback(req, res, user.name);
            });
    } else {
        // CLN: debug
        //console.log('res.payload = ' + res.payload);
        //console.log('req.headers.authorization', req.headers.authorization);
        return res
            .status(404)
            .json({ "getUser message": "User not found!" });
    }
};

// CLN: Helper function to decode JWT token
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

module.exports = {
    tripsList,
    tripsFindCode,
    // CLN: exported tripsAddTrip
    tripsAddTrip,
    // CLN: exported tripsUpdateTrip
    tripsUpdateTrip
};