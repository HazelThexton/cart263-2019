"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

******************/

// Variable tracking which screen you are on
let currentScreen = 0;

// A place to store the jQuery selection of redacted spans
let $redactSpans;
// A place to store the jQuery selection of secret spans
let $secretSpans;


// When the document is loaded we call the setup function
$(document).ready(setup);

window.addEventListener('deviceorientation', function(event) {
  console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all redaction spans (since we do stuff to them multiple times)
  $redactSpans = $('span.revealed,span.redacted');
  // Set a click handler on these spans (so we know when they're clicked)
  $redactSpans.on('click',spanClicked);

  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update,500);
};

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $redactSpans.each(updateSpan);
  $("#secret-count").text("alpha: " + event.alpha + " beta: " + event.beta + " gamma: " + event.gamma);
}

// updateSpan()
//
// With a probability of 10% it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

// spanMouseover()
//
// When moused over, adds found class, removes the mouseover event
// from the found element, and updates the score text
function spanMouseover() {
  $(this).addClass('found');
  $(this).off('mouseover',spanMouseover);
  secretsFound += 1;

}
