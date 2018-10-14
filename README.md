# liri-node-app
Language Interpretation and Recognition Interface

Hi!

Welcome to the Language Interpretation and Recognition Interface, or LIRI for short.

To get started with LIRI, open up your favorite JAVA script running command line interface (examples: terminal (MAC) or git bash with (Windows)).

LIRI can look for three items:

Bands, Music, and Movies.


Here's how it works... Type in the following (do not include quotes or use --Headers--):

--FOR SONG INFORMATION--

"node liri.js spotify-this-song <insert song>"

LIRI will then return track information for the song included in the search command. Information includes,artists, album, and preview information provided by Spotify.



--FOR MOVIE INFORMATION--

 "node liri.js movie-this <insert movie>"
 
LIRI will then film information for the movie included in the search command from OMDB.  Infromation includes, Synopsis, production information, Rotten Tomatoes rating and more.



 --FOR A BANDS NEXT SHOW--

 "node liri.js concert-this <insert band>"

LIRI will then provide you the information for the next concert a band will play (if scheduled) rom the Bands in Town API.  Information includes show date and venue location information.




