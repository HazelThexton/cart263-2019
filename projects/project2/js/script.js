"use strict";

/*****************

Youtube Storytime
Hazel Thexton

It is highly recommended to use HEADPHONES (to prevent responsiveVoice from
triggering annyang) and FIREFOX (to avoid a microphone input bug in google chrome)

video from

https://www.youtube.com/watch?v=YfUNPdxP6mo&t=35s

******************/

let startTextImage;
let startScreen = true;
let helpActive = false;
let video;
let mic;
let font;
let textArea;
let yourName;

// preload()
//
// Description of preload
function preload() {
  startTextImage = loadImage("assets/images/startTextImage.png");
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
  // Start the Audio Input.
  mic.start();

  if (annyang) {
    // Defines voice commands
    let commands = {
      'tell me a story': story,
      'tell me a :long story': story,
      'tell me a :short story': story,
      'tell me a story about *name': story,
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
  console.log(annyang);
}

// draw()
//
// enables the help screen by default
function draw() {
  background(0);
  if (startScreen) {
startText ();
    if (mouseIsPressed){
      helpActive = true;
      startScreen = false;

    }
  }
  else if (helpActive) {
    help();
  }
  else {
    videoTorus();
  }
  }

function startText () {
  normalMaterial();
  texture(startTextImage);
  push();
  plane(500,105);
  pop();
}

// story()
//
// Creates a story based on our grammar and on the length chosen by the user,
// then displays and/or reads it
function story(lengthOrName) {
console.log('working');
// If the user just asked for a story without specifying length, it's selected randomly
    if (lengthOrName != 'short' || lengthOrName != 'long'){
      if (random <= 0.5) {
        let length = short;
      }
      else {
        let length = long;
      }
      // If the argument passed from annyang isn't a length OR undefined, it's a name,
      // which we push to the grammar to get a story featuring that name
      if (lengthOrName != undefined){
        grammar.pushRules(name, [lengthOrName]);
      }
    }

    console.log(lengthOrName);

  // Generates a trace, aka a possible output of a tracery grammar
  let grammar = tracery.createGrammar(length);



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
  responsiveVoice.speak("say 'what do i do' for help. say 'tell me a story' for a story. You can also ask for a long or short story. Say 'Stop talking' or 'keep talking' to pause or resume the story.",'UK English Female');

  helpActive = false;
}

function videoTorus() {
  // Basic ambient lighting
  ambientLight(255,255,255);
  // Additional directional light to add some dimension
  directionalLight(255, 255, 255, 1, -1, 0);
  // Specular material reflects light
  specularMaterial(0,0,0);
  // Applies a weird kids' video as the texture
  texture(video);
  // The size of the video torus increases proportionally to noise detected by the mic
  let torusSize = mic.getLevel()*500;
  // Mild constant rotation in all directions
 push();
 rotateZ(frameCount * 0.02);
 rotateX(frameCount * 0.05);
 rotateY(frameCount * 0.01);
 // The 'thickness' of the torus always stays the same for a stretching/squashing effect
 torus(100+torusSize,50);
 pop();
}
