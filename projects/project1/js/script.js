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

$boulder = $('#boulder');

window.addEventListener('deviceorientation', function(event) {
  // Gives us a value for the angle of the mobile device on the y axis
  // and stores it in the angle variable
  angle = (Math.floor(event.gamma));

  if (angle < 0) {
    rollRight();
  }
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
  let incline = Math.floor(map(angle,-90,0,0,2500));
  $boulder.addClass('roll-right',incline);
  console.log(incline);
}
