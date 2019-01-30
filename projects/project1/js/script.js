"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

******************/

// A place to store the angle of the mobile device
let angle;
// A place to store the boulder image
let $boulder;


// When the document is loaded we call the setup function
$(document).ready(setup);

// Detects when the angle of the device changes
window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the x axis
  // and stores it in the angle variable (returns an integer for easier debugging)
  angle = (Math.floor(event.beta));

// Calls the roll function, which makes the boulder move based on device angle
  roll();
});

// setup()
//
// Sets up the project, including initial screen orientation
function setup() {
  if (window.orientation == 0){
    $("span.portrait-text").show()
    $("span.game-elements").hide();
  }
  else {
    $("span.portrait-text").hide();
    $("span.game-elements").show();
  }
  $boulder = $('img.boulder');
  window.orientationUpdate();

};

// orientationUpdate()
//
// Displays text/images based on whether the phone is in portrait or landscape mode
function orientationUpdate() {
  // Detects when screen orientation has changed, shows portrait mode text and hides
  // game elements (boulder, etc) if in portrait mode, and vice versa
  $(window).on("orientationchange", function(event) {
    if (window.orientation == 0){
      $("span.portrait-text").show()
      $("span.game-elements").hide();
    }
    else {
     $("span.portrait-text").hide();
      $("span.game-elements").show();
    }
  });
}

// roll()
//
// Moves the boulder left or right based on device angle, and adjusts speed likewise
function roll() {
  // Calculates incline of device based on angle's distance from zero (positive or negative).
  // Based on this number, returns a # from 0-100.
  let speed = map(Math.abs(angle),0,90,0,100);

  // The speed variable is applied as the number of pixels the boulder should move either way,
  // with a higher value simulating faster speed

  // Moves the boulder right (if it's within the screen)
  if (angle <= 0 && parseInt($boulder.css('left')) > -(screen.width/2)) {
    $boulder.animate({
      left: '-=' + speed + 'px',
    }, 0, function() {
    });
  }
  // Moves the boulder left (if it's within the screen)
  if (angle >= 0 && parseInt($boulder.css('left')) < screen.width/2) {
    $boulder.animate({
      left: '+=' + speed + 'px',
    }, 0, function() {
    });
  }
}
