"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

code for boulder animation adapted from:
https://www.sitepoint.com/frame-by-frame-animation-css-javascript/

******************/

// A place to store the angle of the mobile device
let angle;
// A place to store the boulder image
let $boulder;

// Constants and variables for our boulder animation
const imagePath = 'assets/images';
const totalFrames = 36;
let timePerFrame;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;
let speed;

let scrollSpeed = 5;

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready((setup));

// Detects when the angle of the device changes
window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the x axis
  // and stores it in the angle variable
  angle = (event.beta);

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
  $boulder = $('.boulder');
  window.orientationUpdate();

//preloads our frames
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/boulder${i}.png');"></div>`);
  }
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
  speed = map(Math.abs(angle),0,90,0,100);

  // The speed variable is applied as the number of pixels the boulder should move either way,
  // with a higher value simulating faster speed

  timePerFrame = map(speed,0,30,100,50);
  requestAnimationFrame(step);



  // Moves the boulder left (if it's within the screen)
  if (angle <= 0 && parseInt($boulder.css('left')) >= 0) {
    $boulder.animate({
      left: '-=' + speed + 'px',
    }, 0, function() {
    });
  }
  // Moves the boulder right (if it's within the screen)
  if (angle >= 0 && parseInt($boulder.css('left')) <= screen.width+50) {
    $boulder.animate({
      left: '+=' + speed + 'px',
    }, 0, function() {
    });
  }
}

function step(startTime) {
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  if (timeFromLastUpdate > timePerFrame) {
    $boulder.attr('src', imagePath + '/boulder' + frameNumber + '.png');
    timeWhenLastUpdate = startTime;
    if (angle >= 0) {
      if (frameNumber >= totalFrames) {
        frameNumber = 1;
      } else {
        frameNumber = frameNumber + 1;
      }
    }
    else {
      if (frameNumber <= 1) {
        frameNumber = 6;
      } else {
        frameNumber = frameNumber - 1;
      }
    }
  }

  requestAnimationFrame(step);
}

let BackgroundScroll = function() {

  let step = 1,
  current = 0,
  restartPosition = screen.width;

  let scroll = function() {
    if (angle >= 0){
      current -= step;
      if (current == restartPosition){
        current = 0;
      }
    }
    else {
      current += step;
      if (current == 0){
        current = restartPosition;
      }
    }

    $('body').css('backgroundPosition', current + 'px 0');

  };

  this.init = function() {
    setInterval(scroll, scrollSpeed);

  };
};

let scroll = new BackgroundScroll();
scroll.init();
