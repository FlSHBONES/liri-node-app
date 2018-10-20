var Bandintown = require("./apis");
var Movieme = require("./apis");
var Spotifyme = require("./apis");

// Create a new object

var bandintown = new Bandintown();
var movieme = new Movieme();
var spotifyme = new Spotifyme();

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or tv show name may contain spaces
var term = process.argv.slice(3).join(" ");


if (!search) {
    search = "do-what-it-says";
}


if (!term) {
    term = "";
}

// Find what
if (search === "spotify-this-song") {
    console.log("Searching for a song");
    spotifyme.findMusic(term);
}
else if (search === "spotify-this-song" && !term) {
    console.log("Searching for a song");
    spotifyme.findMusic("The Sign");
}
else if (search === "movie-this") {
    movieme.findMovie(term);
    console.log("Searching for a movie");
}
else if (search === "movie-this" && !term) {
    movieme.findMovie("Mr. Nobody");
    console.log("Searching for a movie");
}
else if (search === "concert-this") {
    bandintown.findBand(term);
    console.log("Searching for a band");
}
else if (search === "concert-this" && !term) {
    bandintown.findBand("Coheed and Cambria");
    console.log("Searching for a band");
}

else if (search === "do-what-it-says") {
    apis.findBand(term);
    console.log("Time to see what LIRI can do!!  Demo:");
}

else{
    console.log("Not a valid input.  Please try one of the following: \n'spotify-this-song' <insert song> \n'movie-this' <insert movie> \n 'concert-this' <insert band>");
}
