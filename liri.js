// Read and set environment variables
require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Command line arguements entered by user
const command = process.argv[2];
const query = process.argv.slice(3);

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

// ----------Bands in Town API using Axios----------
// Function to respond to concert-this command
function concert() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + query.join('+') + "/events?app_id=codingbootcamp";

    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data);
                output =
                    "\r\n\=================================\r\n" +
                    "* Lineup: " + response.data[i].lineup + "\r\n" +
                    "* Venue name: " + response.data[i].venue.name + "\r\n" +
                    "* Venue location: " + response.data[i].venue.city + "," + response.data[i].venue.region + "\r\n" +
                    "* Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY")
                console.log(output);
                logIt(output);
            }
        },
        function (error) {
            console.log(error);
        });
}

// ----------Spotify API using npm package----------
// Function to respond to spotify-this-song command
function song() {
    spotify.search({ type: 'track', query: query }, function (error, data) {
        var songs = data.tracks.items;

        if (query === "") {
            query = "The Sign";
        }

        if (error) {
            console.log('Error occurred: ' + error);
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                output =
                    "\r\n\=================================\r\n" +
                    "Artist name: " + songs[i].artists[0].name + "\r\n" +
                    "Song name: " + songs[i].name + "\r\n" +
                    "Preview song URL: " + songs[i].preview_url + "\r\n" +
                    "Album name: " + songs[i].album.name
                console.log(output);
                logIt(output);
            }
        }
    });
}

// ----------OMDB API---------- 
// Function to respond to movie-this command
function movie() {
    // Default movie if User fails to input movie title
    if (query === "") {
        query = "Mr. Nobody";
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            output =
                "\r\n\=================================\r\n" +
                "* Title of the movie: " + response.data.Title + "\r\n" +
                "* Year the movie came out: " + response.data.Year + "\r\n" +
                "* IMDB Rating of the movie: " + response.data.Ratings[0].Value + "\r\n" +
                "* Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\r\n" +
                "* Country where the movie was produced: " + response.data.Country + "\r\n" +
                "* Language of the movie: " + response.data.Language + "\r\n" +
                "* Plot of the movie: " + response.data.Plot + "\r\n" +
                "* Actors in the movie: " + response.data.Actors 
            console.log(output);
            logIt(output);
        },
        function (error) {
            console.log(error);
        });
}

// Function to respond to do-what-it-says command
function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArray = data.split(",");
        console.log(data);
        console.log(dataArray[1]);
        // movie(dataArray[3]);
        // concert(dataArray[5]);
    });
}

// Function to append LIRI command results to log.txt file
function logIt(data) {
    fs.appendFile("log.txt", (data), function (error) {
        if (error) {
            return console.log(error);
        }
    });
    fs.appendFile("log.txt", "\r\n", function (error) {
        if (error) {
            return console.log(error);
        }
        console.log("Log file updated");
    });
}