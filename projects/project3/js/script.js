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



// Calls setup when the document is ready
$(document).ready(setup);

// setup()
//
// Description of setup

function setup() {
  imgElement = document.getElementById('imageSrc');
  inputElement = document.getElementById('fileInput');
  onOpenCvReady();

}

function onOpenCvReady() {

  document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
  // changes the location of the image to the url of the input
  inputElement.onchange = function() {
    imgElement.src = URL.createObjectURL(event.target.files[0]);
  };
  imgElement.onload = function() {
    let image = cv.imread(imgElement);
    cv.imshow('imageCanvas', image);
    image.delete();
  };
  document.getElementById('circlesButton').onclick = function() {
    let srcMat = cv.imread('imageCanvas');
    let displayMat = srcMat.clone();
    let circlesMat = new cv.Mat();
    cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
    cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);
    for (let i = 0; i < circlesMat.cols; ++i) {
        let x = circlesMat.data32F[i * 3];
        let y = circlesMat.data32F[i * 3 + 1];
        let radius = circlesMat.data32F[i * 3 + 2];
        let center = new cv.Point(x, y);
        cv.circle(displayMat, center, radius, [0, 0, 0, 255], 3);
    }
    cv.imshow('imageCanvas', displayMat);
  };
}



// draw()
//
// Description of draw()

function draw() {

}
