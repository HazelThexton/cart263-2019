"use strict";

/*****************

Youtube Storytime
Hazel Thexton

******************/

let onscreenText;

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
  onscreenText = new OnscreenText(width/10,height/10,width/10*8,height/10*8,20,"Comic Sans",0);
}


// draw()
//
// Description of draw()

function draw() {

  if (keyIsDown(ENTER)) {
    background(255);
    story();
  }
}

function story() {
          let grammar = tracery.createGrammar(grammars);
          let tale = grammar.flatten('#origin#');
          onscreenText.display(tale);
        }
