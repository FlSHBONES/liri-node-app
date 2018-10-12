require('dotenv').config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();


// Create the Band in Town Constructor
var Bandintown = function () {
  var divider =
    "\n------------------------------------------------------------\n\n";

  this.findBand = function (band) {
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {
    
      var jsonData = JSON.parse(body);

      var bandData = [
        "Venue: " + jsonData.venue.name,
        "Date: " + jsonData.datetime, // TODO moment().format();
        "Loaction: " + jsonData.venue.city + ", " + jsonData.venue.region,+ ", " + jsonData.venue.country
    
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
        "Artist: " + jsonData.tracks.items[0].album.artists,
        "Preview: " + jsonData.tracks.items[0].preview_url //TODO Change these to API info for Spotify
      ].join("\n\n");

      fs.appendFile("log.txt", musicData + divider, function (err) {
        if (err) throw err;
        console.log(musicData); //TODO need to put in musicData
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
        "Rotten Tomatoes Rating: " + jsonData.Ratings[2].Value,
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

module.exports = Bandintown;
module.exports = Spotifyme;
module.exports = Movieme;
