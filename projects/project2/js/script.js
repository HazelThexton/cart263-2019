"use strict";

/*****************

Youtube Storytime
Hazel Thexton

video from

https://www.youtube.com/watch?v=YfUNPdxP6mo&t=35s

******************/

let startScreenText;
let startScreen = true;
let helpActive = false;
let video;
let mic;

// preload()
//
// Description of preload
function preload() {
video = createVideo(["assets/images/video.mp4"]);
video.elt.muted = true;
video.loop();
video.hide();
}

// setup()
//
// Sets up the canvas, creates text objects and initialies annyang
function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  // Create an Audio input
  mic = new p5.AudioIn();
  mic.start();
  // Creates our text objects
  startScreenText = new OnscreenText(width/10,height/10,20,0);

  if (annyang) {
    // Defines voice commands
    var commands = {
      'tell me a long story': function() {
        story(long)
      },
      'tell me a short story': function() {
        story(short)
      },
      'stop (talking)': function() {
        responsiveVoice.pause();
      },
      'keep talking': function() {
        responsiveVoice.resume();
      },
      'what do i do': help,
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  }
}

// draw()
//
// enables the help screen by default
function draw() {
  background(0);
  if (startScreen) {
    //startScreenText.display("tap to start");
    if (mouseIsPressed){
      helpActive = true;
      startScreen = false;

    }
  }
  else if (helpActive) {
    help();
  }
  // Start the Audio Input.

  orb();

}

// story()
//
// Creates a story based on our grammar and on the length chosen by the user,
// then displays and/or reads it
function story(length, yourName) {
  console.log('working');
  // Hides the help screen
  helpActive = false;

  // Generates a trace, aka a possible output of a tracery grammar
  let grammar = tracery.createGrammar(length);

  //if (yourName != noname){
  //  grammar.pushRules(name, [yourName]);
//  }

  let trace = grammar.flatten('#origin#');
  // Has our responsiveVoice speak the trace out loud
  responsiveVoice.speak(trace,'UK English Female');

}

// help()
//
// Displays a list of the voice commands a user can use to interact
function help() {
  // Clears the screen
  background(255);
  // If text is disabled, responsiveVoice reads out the instructions
  responsiveVoice.speak("say 'what do i do?' for help. say 'tell me a short story' or 'tell me a long story' for a story.",'UK English Female');

  helpActive = false;
}

function orb() {
  texture(video);
  let orbSize = mic.getLevel()*500;
 push();
 rotateZ(frameCount * 0.02);
 rotateX(frameCount * 0.05);
 rotateY(frameCount * 0.01);
 sphere(100+orbSize);
 pop();
}
