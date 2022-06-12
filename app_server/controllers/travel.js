// const fs = require('fs');
// const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// CLN: Imported the request module so it can make HTTP requests
const request = require('request');
const apiOptions = {
 server: 'http://localhost:3000'
}

/*
// GET travel view
const travel = (req, res) => {
    // pageTitle = process.env.TRAVEL_TITLE + ' - Travel';
    // CLN: did not use because requires environment variable to be set
    //res.render('travel', { title: pageTitle });
    res.render('travel', { title: 'Travlr Getaways', trips });
   };

*/


// CLN: Added new helper function to render the travel list view when called in travelList below
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = 'Travlr Getaways - Travel';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];   
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }

    res.render('travel',
        {
            title: pageTitle,
            trips: responseBody,
            message
        });
};

// CLN: Replaced travel view static GET logic (above) with travelList method to make the HTTP GET API request
/* GET travel list view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        // url: parses variables apiOptions and path above (using backticks)
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    // console output for debugging
    console.info('>> travelController.travelList calling ' + requestOptions.url);

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    );  
};



module.exports = {
    // travel
    travelList
};