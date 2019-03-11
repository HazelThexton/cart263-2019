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
// Sets up the canvas, creates text objects and initialies annyang
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);

  // Creates our text objects
  storyText = new OnscreenText(width/10,height/10,20,0);
  helpScreenText = new OnscreenText(width/10,height/10,20,0);

  if (annyang) {
    // Defines voice commands
    var commands = {
      'tell me a long story': story(long),
      'tell me a short story': story(short),
      'what do i do': helpScreen,
      'show me the story': textMode(true),
      'hide the story': textMode(false)
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
  if (helpScreenActive) {
    helpScreen();
  }
}

// story()
//
// Creates a story based on our grammar and on the length chosen by the user,
// then displays and/or reads it
function story(length) {
  // Hides the help screen
  helpScreenActive = false;
  background(255);
  // Generates a trace, aka a possible output of a tracery grammar
  let grammar = tracery.createGrammar(length);
  let trace = grammar.flatten('#origin#');
  // Has our responsiveVoice speak the trace out loud
  responsiveVoice.speak(trace,'UK English Female');
  // If text mode is enabled, the story is displayed onscreen
  storyText.display(trace);
  if (textModeActive) {
    storyText.display(trace);
  }
}

// helpScreen()
//
// Displays a list of the voice commands a user can use to interact
function helpScreen() {
  // Clears the screen
  background(255);
  // Displays the help text by default (after all the user may not know this is speech-based)
  helpScreenText.display("say 'what do i do?' for help.\nsay 'tell me a story' for a story.\nsay 'show me the story' to turn on text, or 'hide the story' to turn it off.");
  // If text is disabled, responsiveVoice reads out the instructions
  if (!textModeActive) {
    responsiveVoice.speak("say 'what do i do?' for help.\nsay 'tell me a story' for a story.\nsay 'show me the story' to turn on text, or 'hide the story' to turn it off.",'UK English Female');
  }
}

// textMode()
//
// Enables or disables the display of text (as opposed to just audio) based on
// the command spoken by the user
function textMode(toggle) {
  textModeActive = toggle;

  // Clears the screen if text is disabled
  if (toggle === false){
    background(255);
  }
}
