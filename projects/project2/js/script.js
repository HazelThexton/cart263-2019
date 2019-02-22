"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

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
  let source = {
    "name": ["aladdin",
"barbie",
"batman",
"captain America",
"donald Duck",
"hazel",
"jasmine",
"lion King",
"mickey Mouse",
"peppa Pig",
"robin",
"scrooge McDuck",
"smurfette",
"spiderman",
"superman",
"superwoman",
"goofy"],
"setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"],
    "animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"],
    "mood": ["vexed","indignant","impassioned","wistful","astute","courteous"],
    "story": ["#hero# traveled with #heroTheir# pet #heroPet#. #heroThey.capitalize# was never #mood#, for the #heroPet# was always too #mood#."],
    "origin": ["#[#setPronouns#][hero:#name.capitalize#][heroPet:#animal#]story#"]
  }


  let grammar = tracery.createGrammar(source);
  let tale = grammar.flatten('#origin#');
  text(tale,50,50);
}
