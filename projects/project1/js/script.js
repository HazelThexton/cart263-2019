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
  angle = (Math.floor(event.beta));
  $(".portrait-text").text(Math.floor(event.beta));

  if (angle < 180 && angle > -180) {
    roll();
  }
});

screen.orientation.lock('landscape');

// setup()
//
//
function setup() {
  $boulder = $('img.boulder');
  window.update();

};

// update()
//
// Updates the page
function update() {
}

function roll() {
  let incline = Math.abs((Math.floor(map(angle,-50,50,0,20))));
  console.log(incline);
  if (angle < 0 && parseInt($boulder.css('left')) > -(screen.width/2)) {
    $boulder.animate({
      left: '-=' + incline + 'px',
    }, 0, function() {
    });
  }
  if (angle > 0 && parseInt($boulder.css('left')) < screen.width/2) {
    $boulder.animate({
      left: '+=' + incline + 'px',
    }, 0, function() {
    });
  }
}
