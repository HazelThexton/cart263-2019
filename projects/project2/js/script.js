"use strict";

/*****************

Youtube Storytime
Hazel Thexton

******************/

let storyText;
let startScreenText;
let startScreenActive = true;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  storyText = new OnscreenText(width/10,height/10,20,0);
  startScreenText = new OnscreenText(width/10,height/10,20,0);
}


// draw()
//
// Description of draw()

function draw() {
  if (startScreenActive) {
  startScreen();
}
else {
    if (mouseIsPressed){
      background(255);
      story();
    }
  }
}

function story() {
  let grammar = tracery.createGrammar(long);
  let tale = grammar.flatten('#origin#');
  storyText.display(tale);
}

function startScreen() {
  background(255);
  startScreenText.display("tap the screen");
  if (mouseIsPressed){
    background(255);
    startScreenActive = false;
  }
}
