"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

******************/

// A place to store the angle of the mobile device
let angle;
let $boulder;


// When the document is loaded we call the setup function
$(document).ready(setup);



window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the y axis
  // and stores it in the angle variable
  angle = (Math.floor(window.orientation));

  if (angle < 0 && angle > -90) {
    rollRight();
  }
  if (angle < 90 && angle > 0) {
    rollLeft();

  }
});

// setup()
//
//
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
  window.update();

};

// update()
//
// Updates the page
function update() {
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

function rollRight() {
  let incline = Math.floor(map(angle,0,-90,200,2500));
  //$boulder.addClass('roll_right',incline)
  $boulder.animate({
    left: screen.width,
  }, incline, function() {
    // Animation complete.
  });
  console.log("going right" + event.gamma);
//  $('.roll_right').css('left',window.width);
}

function rollLeft() {
  let incline = Math.floor(map(angle,90,0,200,2500));
  //$boulder.addClass('roll_right',incline)
  $boulder.animate({
    right: screen.width,
  }, incline, function() {
    // Animation complete.
  });
  console.log("going left" + window.orientation);
//  $('.roll_right').css('left',window.width);
}
