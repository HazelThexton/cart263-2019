"use strict";

/*****************

Synaesthetics
Hazel Thexton

Turns images into sound.

******************/

// Declare variables for...
// HTML elements
let imgElement;
let inputElement;
let mat;
let $circlesButton;

// Whether the image has been read
let imageLoaded = false;

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

  // Once user has input an image, hanges the location of the image to the url of the input
  inputElement.onchange = function() {
    imgElement.src = URL.createObjectURL(event.target.files[0]);
  };
  // Once the image has loaded, displays the image on the canvas
  imgElement.onload = function() {
    let image = cv.imread(imgElement);
    cv.imshow('imageCanvas', image);
    image.delete();
  };
  // When the user clicks the element, calls the function for detecting circles
  $circlesButton.on('click',detectCircles);
}

function detectCircles() {
  xyFrequency.length = 0;
  radiusTempo.length = 0;
  $(this).text('Loading...');
  let srcMat = cv.imread('imageCanvas');
  let displayMat = srcMat.clone();
  let circlesMat = new cv.Mat();
  let dsize = new cv.Size(0, 0);
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
cv.resize(srcMat, srcMat, dsize, 0.2, 0.2, cv.INTER_AREA);
  cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 70, 70, 10, 0, 0);
  for (let i = 0; i < circlesMat.cols; ++i) {
    let x = circlesMat.data32F[i * 3]*5;
    let y = circlesMat.data32F[i * 3 + 1]*5;
    let radius = circlesMat.data32F[i * 3 + 2]*5;
    let center = new cv.Point(x, y);
    cv.circle(displayMat, center, radius, [0, 0, 0, 255], 3);
    xyFrequency.push(map(x*y,0,windowWidth*windowHeight,200,500,true));
    radiusTempo.push(map(radius,0,300,50,300));
    console.log("location " + xyFrequency[i]);
  }
  cv.imshow('imageCanvas', displayMat);
  if (xyFrequency.length === 0) {
    $(this).text('Please try another image.');
  }
  else {
    $(this).text('Done!');
    imageLoaded = true;
  }
}




// draw()
//
// Description of draw()

function draw() {
  if (started === false) {
    if (imageLoaded === true) {
      started = true;
        notes();
    }
  }
}

function notes() {
  // Assigns the correct tempo, based on circle radius.
  tempo = radiusTempo[radiusIndex];
  setTimeout(playNote,tempo);
}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {

  // Pick a random frequency from the array
  let frequency = xyFrequency[xyIndex];
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
