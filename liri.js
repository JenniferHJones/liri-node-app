// Read and set environment variables
require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Command line arguements entered by user
var command = process.argv[2];
var query = process.argv[3];

if (command === "movie-this") {
    movie();
} else if (command === "spotify-this-song") {
    song();
} else if (command === "concert-this") {
    concert();
} else if (command === "do-what-it-says") {
    doIt();
} else if (command === undefined) {
    console.log("Please enter a command.")
} else {
    console.log("Invalid command. Please enter a different command.")
}

function movie() {
    // OMDB API
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";

    // if (process.argv.length > 3) {
    //     process.argv[].join("+");
    // };

    // Default to the movie Twister if User fails to input movie title
    if (query === undefined) {
        queryUrl = "http://www.omdbapi.com/?t=twister&apikey=trilogy";
    };

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            console.log("* Title of the movie: " + response.data.Title);
            console.log("* Year the movie came out: " + response.data.Year);
            console.log("* IMDB Rating of the movie: " + response.data.Ratings[0].Value);
            console.log("* Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("* Country where the movie was produced: " + response.data.Country);
            console.log("* Language of the movie: " + response.data.Language);
            console.log("* Plot of the movie: " + response.data.Plot);
            console.log("* Actors in the movie: " + response.data.Actors);
        },
        function (error) {
            console.log(error);
        });
}

function song() {
    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function concert() {
    // Bands in Town API
    var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            // console.log("* Venue name: " + response.data.venue[4]);
            // console.log("* Venue location: " + response.data.venue[1]);
            console.log("* Event Date: " + moment(response.datetime).format("MM/DD/YYYY"));
        },
        function (error) {
            console.log(error);
        });
}

function doIt() {
    fs.readFile("random.txt","utf8",function(err,data) {
        if(err) {
            return console.log(err);
        }
});
}