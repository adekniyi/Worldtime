var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
app.set('view engine', 'ejs');

// var button = document.querySelector(".button");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// button.addEventListener("click", function() {
//     var url = 'http://worldtimeapi.org/api/timezone/' + country + '/' + state;
//     var country = req.query.country;
//     var state = req.query.state;
//     request(url, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var parsedData = JSON.parse(body);
//             time.innerHTML = parsedData["datetime"]
//         }
//     });
// })
var sentence = "the date in"

app.get("/", function(req, res) {
    var continent = req.query.country;
    console.log(continent);
    var state = req.query.state;
    console.log(state);
    var url = 'http://worldtimeapi.org/api/timezone/' + continent + '/' + state
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var parsedData = JSON.parse(body);
            console.log(body)
            var newParsedData = parsedData["datetime"];
            var parsedDate = new Date (newParsedData.toLocaleString('en-US'));
            var realDate = parsedDate.toLocaleDateString();
            var realTime = parsedDate.toLocaleTimeString();
            console.log(parsedDate);
            console.log(newParsedData);
            console.log(realDate);
            console.log(realTime);
        }
        res.render("time", { realDate: realDate, realTime: realTime, state: state, sentence:sentence });
    });
});

app.listen(2100, function() {
    console.log("server started!!!")
});