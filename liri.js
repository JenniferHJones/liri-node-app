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
                // console.log(Object.keys(response.data));           
                console.log("* Venue name: " + response.data[i].venue.name);
                console.log("* Venue location: " + response.data[i].venue.city + "," + response.data[i].venue.region);
                console.log("* Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("\r\n\=================================\r\n");
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

        if (error) {
            console.log('Error occurred: ' + error);
        } else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist name: " + songs[i].artists[0].name);
                console.log("Song name: " + songs[i].name);
                console.log("Preview song URL: " + songs[i].preview_url);
                console.log("Album name: " + songs[i].album.name);
                console.log("\r\n\=================================\r\n");
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
            console.log("* Title of the movie: " + response.data.Title);
            console.log("* Year the movie came out: " + response.data.Year);
            console.log("* IMDB Rating of the movie: " + response.data.Ratings[0].Value);
            console.log("* Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("* Country where the movie was produced: " + response.data.Country);
            console.log("* Language of the movie: " + response.data.Language);
            console.log("* Plot of the movie: " + response.data.Plot);
            console.log("* Actors in the movie: " + response.data.Actors);
            console.log("\r\n\=================================\r\n");
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
    });
}