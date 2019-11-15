// Include all modules you need
var path = require('path');
var express = require('express');
var zipdb = require('zippity-do-dah');
var ForecastIo = require('forecastio');

// Create an Express application
var app = express();
// Create an ForecastIO object with your API key
var weather = new ForecastIo('745c7515a99f2d2e7c02c371cb29809c');

// Serve static files out of public
app.use(express.static(path.resolve(__dirname,'public')));

// Use EJS as the view engine, and serve the views out of a views folder
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');

// Render the index view if you hit the homepage
app.get('/', function (req,res) {
    res.render('index');
});

console.log('test');
app.get(/^\/(\d{5})$/, function (req,res,next) {
    // Capture the specified ZIP Code and pass it as req.params[0]
    var zipcode = req.params[0];
    // Grab location data with the ZIP Code
    var location = zipdb.zipcode(zipcode);
    // Return {} when no results are found. Continue if the object isn't empty
    if(!location.zipcode){        
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, function (err, data) {
        if(err) {
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            temperature:  data.currently.temperature
        });
    });
});

// Show a 404 error if no otheer routes are matched
app.use(function (req,res) {
    res.status(404).render('404');
});

// Start the app on port 3000
app.listen(3000);




