"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let imgElement;
let inputElement;
let mat;
let $circlesButton;
let xyFrequency = [];
let xyIndex = 0;
let radiusTempo = [];
let radiusIndex = 0;
let imageLoaded = false;

// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

let tempo;

let started = false;

var reverb = new Pizzicato.Effects.Reverb({
  time: 1,
  decay: 0.6,
  reverse: true,
  mix: 0.5
});

var tremolo = new Pizzicato.Effects.Tremolo({
  speed: 5,
  depth: 1,
  mix: 0.5
});

// The synth
let synth;


// Calls setup when the document is ready
$(document).ready(setup);

// setup()
//
// Description of setup
function setup() {
  imgElement = document.getElementById('imageSrc');
  inputElement = document.getElementById('fileInput');
  $circlesButton = $('.circlesButton');
  onOpenCvReady();
  // Create the synth
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

function onOpenCvReady() {
  // Once OpenCV is ready we display a prompt
  document.getElementById('status').innerHTML = 'Load an image to make it sing!';
  // changes the location of the image to the url of the input
  inputElement.onchange = function() {
    imgElement.src = URL.createObjectURL(event.target.files[0]);
  };
  imgElement.onload = function() {
    let image = cv.imread(imgElement);
    cv.imshow('imageCanvas', image);
    image.delete();
  };
  $circlesButton.on('click',detectCircles);
}

function detectCircles() {
  xyFrequency.length = 0;
  $(this).text('Loading...');
  let srcMat = cv.imread('imageCanvas');
  let displayMat = srcMat.clone();
  let circlesMat = new cv.Mat();
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
  cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 70, 90, 50, 0, 0);
  for (let i = 0; i < circlesMat.cols; ++i) {
    let x = circlesMat.data32F[i * 3];
    let y = circlesMat.data32F[i * 3 + 1];
    let radius = circlesMat.data32F[i * 3 + 2];
    let center = new cv.Point(x, y);
    cv.circle(displayMat, center, radius, [0, 0, 0, 255], 3);
    xyFrequency.push(int(map(x*y,0,500*500,200,500)));
    radiusTempo.push(map(radius, 0,200,50,300));
    console.log(xyFrequency[i]);
  }
  cv.imshow('imageCanvas', displayMat);
  $(this).text('Done!');
  imageLoaded = true;

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
  // Pick a random frequency from the array
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
