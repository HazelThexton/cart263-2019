"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

code for boulder animation adapted from:
https://www.sitepoint.com/frame-by-frame-animation-css-javascript/

code for equivalent to map() function adapted from:
https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

sound source:
http://soundbible.com/904-Rock-Slide.html

******************/

// A place to store the angle of the mobile device
let angle;

// A place to store elements for landscape and portrait mode
let $portraitElements;
let $landscapeElements;

// A place to store the boulder image
let $boulder;
// A place to store our background
let $background;
// A place to store our sound button
let $soundButton;
// Variable to store the speed of the boulder animation and background scrolling
let speed;
// Variable to store our sound effect
let rollSFX = new Audio("assets/sounds/roll.mp3");

// Constants and variables for our boulder animation
const imagePath = 'assets/images';
const totalFrames = 36;
let timePerFrame;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;

// Equivalent to p5 map() function (without using p5!)
const scale = (num, inputMin, inputMax, outputMin, outputMax) => {
  return (num - inputMin) * (outputMax - outputMin) / (inputMax - in_min) + outputMin;
}

// Calls setup when the document is ready
$(document).ready(setup);

// setup()
//
// Sets up the project, including initial screen orientation and storing objects
// in variables
function setup() {
  // Stores elements in variables
  $boulder = $('.boulder');
  $landscapeElements = $('.landscape-elements');
  $portraitElements = $('.portrait-elements');
  $background = $('.background');
  $soundButton = $('.soundButton');

  // Set a click handler on the button which calls the soundToggle function (once the user
  // has interacted with the page sound can autoplay)
  $soundButton.on('click',soundToggle);

  // Preloads our frames by creating a set of hidden divs
  // and setting their background-image attribute to the frame images.
  // This will force the browser to download the images
  for (var i = 1; i < totalFrames + 1; i++) {
    $background.append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/boulder${i}.png');"></div>`);
  }

  // Shows portrait mode text and hides
  // landscape mode elements (boulder, etc) if in portrait mode, and vice versa
  if (window.orientation == 0){
    $portraitElements.show();
    $landscapeElements.hide();
  }
  else {
    $portraitElements.hide();
    $landscapeElements.show();
  }

  // Calls the orientationUpdate function, which checks if our device has changed orientation
  // and updates accordingly
  orientationUpdate();
};

// Detects when the angle of the device changes and calls all our movement functions
window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the x axis
  // and stores it in the angle variable
  angle = (event.beta);

  // Calls the boulderMove function, which makes the boulder move based on device angle
  boulderMove();
  // Calls the boulderRoll function, which controls the boulder animation proper (rolling on itself)
  requestAnimationFrame(boulderRoll);
  // Calls the background scrolling function, which scrolls the background based on device angle
  bgScroll();
  // Calls the sound effect function, which plays the sound unless the screen angle is at zero
  rollingSound();
});

// orientationUpdate()
//
// Displays text/images based on whether the phone is in portrait or landscape mode
function orientationUpdate() {
  // Detects when screen orientation has changed, shows portrait mode text and hides
  // landscape elements (boulder, etc) if in portrait mode, and vice versa
  // (using this instead of toggle() because of bugs with using toggle)
  $(window).on("orientationchange", function(event) {
    if (window.orientation == 0){
      $portraitElements.show();
      $landscapeElements.hide();
    }
    else {
      $portraitElements.hide();
      $landscapeElements.show();
    }

  });
}

// boulderMove()
//
// Moves the boulder left or right based on device angle, and adjusts speed likewise
function boulderMove() {
  // Calculates incline of device based on angle's distance from zero (positive or negative).
  // Based on this number, returns a # from 0-100.
  speed = scale(Math.abs(angle),0,90,0,100);
  console.log(speed + " " + scale(Math.abs(angle),0,90,0,100));

  // The speed variable is applied as the number of pixels the boulder should boulderMove either way,
  // with a higher value simulating faster speed

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

  // Maps the speed variable to a range which suits the boulder animation
  timePerFrame = scale(speed,0,30,100,50);
}

// boulderRoll()
//
// Animates the boulder (and Sisyphus) by switching between numbered frames.
// Speed and direction depends on angle of device.
function boulderRoll(startTime) {
  // Establishing links between timing variables
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  // If more time has elapsed than the assigned time per frame, switches to
  // the next frame. This then loops.
  if (timeFromLastUpdate > timePerFrame) {
    $boulder.attr('src', imagePath + '/boulder' + frameNumber + '.png');
    timeWhenLastUpdate = startTime;
    // If the angle is positive, the next frame is +1 (1,2,3,etc.)
    if (angle >= 0.9) {
      if (frameNumber >= totalFrames) {
        frameNumber = 1;
      } else {
        frameNumber = frameNumber + 1;
      }
    }
    // If the angle is negative, the next frame is -1 (6,5,4,etc.) because
    // the animation is reversing
    else if (angle <= -0.9) {
      if (frameNumber <= 1) {
        frameNumber = 6;
      } else {
        frameNumber = frameNumber - 1;
      }
    }
    // If the angle is around 0, the animation stops and Sisyphus stands still
    else {
      frameNumber = 1;
    }
  }
  // Tells the browser to update the animation
  requestAnimationFrame(boulderRoll);
}

// bgScroll()
//
// Scrolls the background image faster or slower, right or left, based on angle
function bgScroll() {
  // Moves the background right if the angle is positive
  if (angle <= 0) {
    // If background image hits the edge of the screen, returns it to its
    // starting position
    if ($background.css('backgroundPositionX') <= 0) {
      $background.css('backgroundPositionX', screen.width + 'px');
    }
    else {
      // Similar to the boulderMove function, increases the x position of the background
      // by the speed variable
      $background.animate({
        backgroundPositionX: "+=" + speed + 'px',
      }, 5, function() {
      });
    }
  }
  // Moves the background left if the angle is negative
  else {
    // If background image hits the edge of the screen, returns it to its
    // starting position
    if ($background.css('backgroundPositionX') >= screen.width) {
      $background.css('backgroundPositionX', '0px');
    }
    else {
      // Reduces the x position of the background
      // by the speed variable
      $background.animate({
        backgroundPositionX: "-=" + speed + 'px',
      }, 10, function() {
      });
    }
  }
}

// soundToggle()
//
// Allows us to get around the browser's refusal to autoplay sounds by making the
// user interact with the page
function soundToggle() {
  // Changes sound button text, creates a quick highlight effect and unbinds
  // the click handler (we don't need to click the button anymore)
  $(this).effect("highlight", {color:"#ffffff"}, 1000);
  $(this).text('Sound enabled!');
  $(this).unbind( "click" );
}

// rollingSound()
//
// Plays the rolling sound effect and pauses it if the angle of the device is around zero
function rollingSound() {
  // Pauses the sound if the angle is around zero
  if (angle < 0.9 && angle > -0.9) {
    rollSFX.pause();
  }
  else {
    // Plays the rolling sound effect
    rollSFX.loop = true;
    rollSFX.play();
  }
}
