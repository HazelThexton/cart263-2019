"use strict";

/*****************

Synthesthesia
Hazel Thexton

Turns images into sound.

https://scotch.io/tutorials/introduction-to-computer-vision-in-javascript-using-opencvjs

******************/

// Declare variables for...
// HTML elements
let imgElement;
let inputElement;
let $circlesButton;
let $refreshButton;
// OpenCV matrices
let srcMat;
let displayMat;
let circlesMat;
// Whether circles have been detected
let circlesDetected = false;
// Note frequency
let xyFrequency = [];
let xyIndex = 0;
// Note tempo
let radiusTempo = [];
let radiusIndex = 0;
let tempo;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;
// Whether the sound has started
let started = false;
// The synth
let synth;

// Calls setup when the document is ready
$(document).ready(setup);

// setup()
//
// Assigns html elements to variables, creates the synth object and calls the
// "onOpenCVReady" function.
function setup() {
  imgElement = document.getElementById('imageSrc');
  inputElement = document.getElementById('fileInput');
  $circlesButton = $('.circlesButton');
  $refreshButton = $('.refreshButton');
  onOpenCvReady();
  // Creates the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });
}

// onOpenCvReady()
//
// Performs actions meant to prepare the page for use
function onOpenCvReady() {
  // Once OpenCV is ready we display a prompt
  document.getElementById('status').innerHTML = 'Load an image to make it sing!';

  // Once user has input an image, changes the location of the image to the url of the input
  // and resets the button and synth
  inputElement.onchange = function() {
    imgElement.src = URL.createObjectURL(event.target.files[0]);
  };
  // Once the image has loaded, displays the image on the canvas
  imgElement.onload = function() {
    let image = cv.imread(imgElement);
    cv.imshow('imageCanvas', image);
    image.delete();
    $circlesButton.css({"display":"block"});
  };
  // When the user clicks the element, calls the function for detecting circles
  $circlesButton.on('click',detectCircles);
}

// detectCircles()
//
// Detects circles in the image and displays them over top of it
function detectCircles() {
  // Unbinds the event handler to avoid repeat clicks
  $(this).unbind( "click" );
  $(this).hover(function() {
  $(this).css("color","white")
});
  // Hides the input button
  $('.input').css({"display":"none"});
  // Assigns our matrices- a source, an output, and one for the circle detection
  srcMat = cv.imread('imageCanvas');
  displayMat = srcMat.clone();
  circlesMat = new cv.Mat();
  // Converts our image to greyscale and resizes it for easier circle detection
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
  cv.resize(srcMat, srcMat, new cv.Size(0, 0), 0.1, 0.1, cv.INTER_AREA);
  // This is the actual function which detects the circles and stores their information in the matrix
  cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);
  // Grabs x, y and radius from the matrix and draws each circle in its
  // respective location (with a x10 multiplier to undo the resize)
  for (let i = 0; i < circlesMat.cols; ++i) {
    let x = circlesMat.data32F[i * 3]*10;
    let y = circlesMat.data32F[i * 3 + 1]*10;
    let radius = circlesMat.data32F[i * 3 + 2]*10;
    let center = new cv.Point(x, y);
    cv.circle(displayMat, center, radius, [0, 0, 0, 255], 3);
    // For each circle, maps the x*y to frequency (so the lowest freq circle would be
    // in the top left and vice versa) and the radius to tempo (so the larger
    // a circle is, the longer the note lasts) and pushes this to corresponding arrays
    xyFrequency.push(map(x*y,0,windowWidth*windowHeight,200,500,true));
    radiusTempo.push(map(radius,0,300,5,200,true));
    console.log(xyFrequency[i]);
  }
  // Displays the completed image, with circles
  cv.imshow('imageCanvas', displayMat);
  // If no circles were detected (so the frequency array is empty), a message
  // is displayed and it doesn't attempt to play sound (otherwise we would get an error)
  if (xyFrequency.length === 0) {
    $(this).text('Please try another image.');

  }
  // Otherwise, another message displays and we trip a variable which allows
  // the sound to play
  else {
    $(this).text('Done!');
    circlesDetected = true;
  }
  $refreshButton.css({"display":"block"});
}

// draw()
//
// Description of draw()
function draw() {
  if (started === false) {
    if (circlesDetected === true) {
      started = true;
      notes();
    }
  }
  // When the user clicks the element, refreshes the page
  $refreshButton.on('click', function(event) {
location.reload();
});
}

function notes() {
  // Assigns the correct tempo, based on circle radius.
  tempo = radiusTempo[radiusIndex];
  setTimeout(playNote,tempo);
}

// playNote
//
// Assigns a frequency from the array
function playNote() {
  // Pick a random frequency from the array
  let frequency = xyFrequency[xyIndex];

  if (frequency === undefined) {
    frequency = 200;
  }
  // Set the synth's frequency
  synth.frequency = frequency;
  // If it's note already play, play the synth

  synth.play();

  setTimeout(notes,tempo);

  // Advance the pattern by a beat
  xyIndex = (xyIndex + 1) % xyFrequency.length;
  // Advance the pattern by a beat
  radiusIndex = (radiusIndex + 1) % radiusTempo.length;
}
