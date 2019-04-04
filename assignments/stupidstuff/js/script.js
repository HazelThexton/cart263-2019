"use strict";

/*****************

Exercise 1
Hazel Thexton

A simple game in which the player controls a shrinking circle with their mouse and tries
to overlap another circle (food) in order to grow bigger.

******************/

// Create a MarkovText object with a word depth of 3
var myMarkov = new MarkovText(3);

// Learn from our text
myMarkov.learn("This is sample text to show usage of the MarkovText class.");

// Output 10 words
var generatedWords = myMarkov.output(10);
console.log(generatedWords);
