var impTwitter = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var fs = require("fs");
console.log(impTwitter.twitterKeys.consumer_key);


// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


var getArtistNames = function(artist) {
  return artist.name;
};


var getSpotify = function(songName) {

  if (songName === undefined) {
    songName = "What\"s my age again";
  }

  spotify.search({
    type: "track",
    query: songName
  }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artists.map(getArtistNames));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
    }
  });
};


var getTweets = function() {

  var client = new twitter(impTwitter.twitterKeys);

  var params = {
    screen_name: "lauraHomework"
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};


var getMovie = function(movieName) {

  if (movieName === undefined) {
    movieName = "Harold and Maude";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};


var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};


var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};


var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};


runThis(process.argv[2], process.argv[3]);
