"use strict";

/*****************

Youtube Storytime
Hazel Thexton

******************/

let storyText;
let helpScreenText;
let helpScreenActive = true;
let textModeActive = true;

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
  helpScreenText = new OnscreenText(width/10,height/10,20,0);

  if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'tell me a story': story,
    'what do i do': helpScreen,
    'show me the story': textMode,
    'hide the story': textModeHide
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}
}

// draw()
//
// Description of draw()

function draw() {
  if (helpScreenActive) {
  helpScreen();
}
}

function story() {
  helpScreenActive = false;
  background(255);
  let grammar = tracery.createGrammar(long);
  let tale = grammar.flatten('#origin#');
  tale.substring();
  responsiveVoice.speak(tale,'UK English Female');
  storyText.display(tale);
  if (textModeActive) {
    storyText.display(tale);
  }
}

function helpScreen() {
  background(255);
  //responsiveVoice.cancel();
  helpScreenText.display("say 'what do i do?' for help.\nsay 'tell me a story' for a story.\nsay 'show me the story' to turn on text, or 'hide the story' to turn it off.");
  if (!textModeActive) {
    responsiveVoice.speak("say 'what do i do?' for help.\nsay 'tell me a story' for a story.\nsay 'show me the story' to turn on text, or 'hide the story' to turn it off.",'UK English Female');
  }
}

function textMode() {
  textModeActive = true;
}

function textModeHide() {
  background(255);
    textModeActive = false;
}
