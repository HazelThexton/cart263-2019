"use strict";

/*****************

Youtube Storytime
Hazel Thexton

It is highly recommended to use HEADPHONES (to prevent responsiveVoice from
  triggering annyang or interfering with your commands) and FIREFOX
  (to avoid a microphone input bug in google chrome)

  video from

  https://www.youtube.com/watch?v=YfUNPdxP6mo&t=35s

  ******************/

  let startTextImage;
  let startScreen = true;
  let helpActive = false;
  let video;
  let mic;

  // preload()
  //
  // Preloads our video for the torus texture, as well as our start screen image
  function preload() {
    startTextImage = loadImage("assets/images/startTextImage.png");
    video = createVideo(["assets/images/video.mp4"]);
    video.elt.muted = true;
    video.loop();
    video.hide();
  }

  // setup()
  //
  // Sets up the canvas, initializes annyang, creates the mic object
  function setup() {
    createCanvas(windowWidth,windowHeight, WEBGL);
    // Create an Audio input
    mic = new p5.AudioIn();
    // Start the Audio Input.
    mic.start();

    if (annyang) {
      // Defines voice commands: pretty self explanatory, the long and short
      // story commands pass "long" and "short" as arguments to determine story length
      var commands = {
        'tell me a story': story,
        'tell me a :long story': story,
        'tell me a :short story': story,
        'stop (talking)': function() {
          responsiveVoice.pause();
        },
        'keep talking': function() {
          responsiveVoice.resume();
        },
        'what do i do': help
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    }
  }

  // draw()
  //
  // starts with the start screen (necessary user interaction to make audio play)
  function draw() {
    background(0);
    if (startScreen) {
      startText ();
      if (mouseIsPressed){
        helpActive = true;
        startScreen = false;
      }
    }
    // plays the help message once when activated
    else if (helpActive) {
      help();
    }
    // Displays the torus
    else {
      videoTorus();
    }
  }

  // startText()
  //
  // Displays the start text image on a plane (because we are using 3d)
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
  function story(length) {
    console.log('working');
    // If the user just asked for a story without specifying length, it's selected randomly
    if (length != 'short' || length != 'long'){
      if (random <= 0.5) {
        length = short;
      }
      else {
        length = long;
      }
    }

    // Generates a trace, aka a possible output of a tracery grammar
    let grammar = tracery.createGrammar(length);
    let trace = grammar.flatten('#origin#');

    // Has our responsiveVoice speak the trace out loud
    responsiveVoice.speak(trace,'UK English Female');
  }

  // help()
  //
  // Speaks a list of the voice commands a user can use to interact
  function help() {
    // responsiveVoice reads out the instructions
    responsiveVoice.speak("say 'what do i do' for help. say 'tell me a story' for a story. You can also ask for a long or short story. Say 'Stop talking' or 'keep talking' to pause or resume the story.",'UK English Female');
    // Disables help to prevent it from looping
    helpActive = false;
  }

  // videoTorus()
  //
  // Displays a spinning torus with a weird kids video texture, which expands based on noise
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
