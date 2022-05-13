/* GET travel view */
const travel = (req, res) => {
    // pageTitle = process.env.TRAVEL_TITLE + ' - Travel';
    // CLN: did not use because requires environment variable to be set
    //res.render('travel', { title: pageTitle });
    res.render('travel', { title: 'Travlr Getaways' });
   };
module.exports = {
    travel
};