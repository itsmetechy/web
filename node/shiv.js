var movies = require('./movies');
var shivMovies = movies();
shivMovies.favMovie = "Salt";
console.log("My fav movie is " + shivMovies.favMovie);