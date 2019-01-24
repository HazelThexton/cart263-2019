"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

******************/

// A place to store the angle of the mobile device
let $angle;


// When the document is loaded we call the setup function
$(document).ready(setup);

window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the x axis
  // and stores it in the angle variable
  $angle = $(int(event.beta));
  console.log($angle);
});

// setup()
//
//
function setup() {
  if (window.orientation == 0){
    $("#portrait-text").show()
    $("span.game-elements").hide();
  }
  else {
    $("#portrait-text").hide();
    $("span.game-elements").show();
  }
  window.update();
};

// update()
//
// Updates the page
function update() {
  $(window).on("orientationchange", function(event) {
    if (window.orientation == 0){
      $("#portrait-text").show()
      $("span.game-elements").hide();
    }
    else {
      $("#portrait-text").hide();
      $("span.game-elements").show();
    }
  });
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
