# liri-node-app

## Description
LIRI is a Language Interpretation and Recognition Interface. This is a command line node app that takes in arguements entered by the user and returns data.

## Installs
* Axios `npm install axios`
* Moment.js `npm install moment`
* Spotify `npm install --save node-spotify-api`

## User Interface
Enter `node liri.js` + one of these four commands:
1. `concert-this` + `<artist/band name here>` displays the following:
    * Venue name
    * Venue location
    * Event date

2. `spotify-this-song` + `<song name here>` displays the following:
    * Artist name
    * Song name
    * Song preview URL from Spotify
    * Album name
    * NOTE:  If no song name is entered, LIRI defaults to "The Sign" by Ace of Base

3. `movie-this` + `<movie name here>` displays the following:
    * Title
    * Year
    * IMDB Rating
    * Rotten Tomatoes Rating
    * Country where the movie was produced
    * Language
    * Plot
    * Actors
    * NOTE:  If no movie name is entered, LIRI defaults to "Mr. Nobody"

4. `do-what-it-says` 
    * Uses the fs Node package to take the text inside the random.txt file to call one of LIRI's commands.

## Technology
* API - OMDB (via Axios)
* API - Bands in Town (via Axios)
* Node.js
* NPM Spotify
* JavaScript
* Moment.js
