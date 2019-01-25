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
  angle = (Math.floor(event.gamma));

  if (angle < 0) {
    rollRight();
  }
  angle = (Math.floor(event.gamma));
  if (angle > 0) {
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
  $('.roll_right').css('left',window.width);
  console.log(window.width);
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
  let incline = Math.floor(map(angle,0,-90,0,2500));
  //$boulder.addClass('roll_right',incline)
  $boulder.animate({
    left: screen.width,
  }, 5000, function() {
    // Animation complete.
  });
//  $('.roll_right').css('left',window.width);
}

function rollLeft() {
  let incline = Math.floor(map(angle,90,0,0,2500));
  //$boulder.addClass('roll_right',incline)
  $boulder.animate({
    right: screen.width,
  }, 5000, function() {
    // Animation complete.
  });
//  $('.roll_right').css('left',window.width);
}
