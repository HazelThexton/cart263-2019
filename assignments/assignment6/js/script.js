/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

RiTA
http://rednoise.org/rita/index.html

*/

let vowels = ["a","e","i","o","u","A","E","I","O","U"];

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json', gotData);
  $( "html" ).on( "click", function() {
    reset();
  });

});

// reset
//
// This function gets called on click, clears the text, and reloads a new string
function reset() {
  $('body').text("");
  $.getJSON('data/data.json', gotData);
}
// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {

  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';

  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  let cat = getRandomElement(data.cats);

  // Assume it starts with a consonant
  let catArticle = "a";

  for (let i = 0; i < vowels.length; i++) {
    // Check if the first latter of the condiment is a vowel
    if (cat.charAt(0) === vowels[i]) {
      // If so, change article to "an"
      catArticle = 'an';
    }
    console.log(vowels[i]);
  }

  // Same again for room
  let room = getRandomElement(data.rooms);

  // Assume it starts with a consonant
  let roomArticle = "a";

  for (let i = 0; i < vowels.length; i++) {
    // Check if the first latter of the condiment is a vowel
    if (room.charAt(0) === vowels[i]) {
      // If so, change article to an
      roomArticle = 'an';
    }
  }

  let adjective = getRandomElement(data.adjs);

let interjections = getRandomElement(data.interjections);
interjectionsCapitalized = interjections.charAt(0).toUpperCase() + interjections.slice(1)
  console.log(cat.charAt(0) + " and " + room.charAt(0));
  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${condiment} ${verb} like ${catArticle} ${cat} in ${roomArticle} ${room}, to be enjoyed only by the most ${adjective} gourmets. When one tastes it, one thinks "${interjectionsCapitalized}, that's good!"`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
