require('dotenv').config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

// Attack of the Functions

//Create the Band in Town Constructor
var Bandintown = function () {
    var divider =
        "\n------------------------------------------------------------\n\n";

    this.findBand = function (band) {
        request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {

            var jsonData = JSON.parse(body);

            var bandData = [
                "Venue: " + jsonData[0].venue.name,
                "Date: " + jsonData[0].datetime, // TODO moment().format();
                "Loaction: " + jsonData[0].venue.city + ", " + jsonData[0].venue.region, + ", " + jsonData[0].venue.country

            ].join("\n\n");

            fs.appendFile("log.txt", bandData + divider, function (err) {
                if (err) throw err;
                console.log(bandData);
            });
        });
    };

};

// Create the Spotify Constuctor
var Spotifyme = function () {
    var divider =
        "\n------------------------------------------------------------\n\n";

    this.findMusic = function (song) {

        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }
            var dataArray = data.tracks.items[0].album.artists;
            var datapushname = [];

            for (var i = 0; i < dataArray.length; i++) {
                datapushname.push(dataArray[i].name);
            }
            var artistname = datapushname.join(", ");
            var jsonData = data;

            var musicData = [
                "\nSong: " + artistname,
                "Album: " + jsonData.tracks.items[0].album.name,
                "Artist: " + jsonData.tracks.items[0].album.artists[0].name,
                "Preview: " + jsonData.tracks.items[0].preview_url
            ].join("\n\n");

            fs.appendFile("log.txt", musicData + divider, function (err) {
                if (err) throw err;
                console.log(musicData);
            });
        });
    };
};

var Movieme = function () {
    var divider =
        "\n------------------------------------------------------------\n\n";
    this.findMovie = function (movie) {
        var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short&tomatoes=true&r=json";

        request(URL, function (err, response, body) {

            var jsonData = JSON.parse(body);

            var movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "Rating: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Country of Production: " + jsonData.Country,
                "Film Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors/Actresses: " + jsonData.Actors
            ].join("\n\n");

            fs.appendFile("log.txt", movieData + divider, function (err) {
                if (err) throw err;
                console.log(movieData);
            });
        });
    };
};




// Node front end...?
// Create a new object
var spotifyme = new Spotifyme();
var bandintown = new Bandintown();
var movieme = new Movieme();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");


if (!search) {
    search = "do-what-it-says";
}


// Find what
if (search === "spotify-this-song") {
    console.log("\n\nSearching for a song\n");
    spotifyme.findMusic(term);
}
else if (search === "spotify-this-song" && !term) {
    console.log("\n\nSearching for a song\n");
    spotifyme.findMusic("The Sign");
}
else if (search === "movie-this") {
    movieme.findMovie(term);
    console.log("\n\nSearching for a movie\n");
}
else if (search === "movie-this" && !term) {
    movieme.findMovie("Mr. Nobody");
    console.log("\n\nSearching for a movie\n");
}
else if (search === "concert-this") {
    bandintown.findBand(term);
    console.log("\n\nSearching for a band\n");
}
else if (search === "concert-this" && !term) {
    bandintown.findBand("Coheed and Cambria");
    console.log("\n\nSearching for a band\n");
}

else if (search === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var dataArray = data.split(",");
            console.log(dataArray);
            var term1 = dataArray[0];
            var term2 = dataArray[1];
            // Back around the merry-go-round
            if (term1 === "spotify-this-song") {
                console.log("\n\nSearching for a song\n");
                spotifyme.findMusic(term2);
            }
            else if (term1 === "spotify-this-song" && !term) {
                console.log("\n\nSearching for a song\n");
                spotifyme.findMusic("The Sign");
            }
            else if (term1 === "movie-this") {
                movieme.findMovie(term2);
                console.log("\n\nSearching for a movie\n");
            }
            else if (term1 === "movie-this" && !term) {
                movieme.findMovie("Mr. Nobody");
                console.log("\n\nSearching for a movie\n");
            }
            else if (term1 === "concert-this") {
                bandintown.findBand(term2);
                console.log("\n\nSearching for a band\n");
            }
            else if (term1 === "concert-this" && !term) {
                bandintown.findBand("Coheed and Cambria");
                console.log("\n\nSearching for a band\n");
            }

        }
    })
}

else {
    console.log("Not a valid input.  Please try one of the following: \n'spotify-this-song' <insert song> \n'movie-this' <insert movie> \n 'concert-this' <insert band>");
}
