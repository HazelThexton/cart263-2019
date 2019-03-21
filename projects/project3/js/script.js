"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let imgElement;
let inputElement;

// Calls setup when the document is ready
$(document).ready(setup);

// setup()
//
// Description of setup

function setup() {
onOpenCvReady();
   imgElement = document.getElementById("imageSrc");
   inputElement = document.getElementById("fileInput");
  inputElement.addEventListener("change", (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  }, false);

  imgElement.onload = function() {
    let mat = cv.imread(imgElement);
    cv.imshow('canvasOutput', mat);
    mat.delete();
  };
  function onOpenCvReady() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
  }
}


// draw()
//
// Description of draw()

function draw() {

}
