"use strict";

/*****************

Youtube Storytime
Hazel Thexton

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
    "name": [
      "Aladdin",
      "Barbie",
      "Batman",
      "Captain America",
      "Donald Duck",
      "Hazel",
      "Jasmine",
      "Lion King",
      "Mickey Mouse",
      "Peppa Pig",
      "Robin",
      "Scrooge McDuck",
      "Smurfette",
      "Spiderman",
      "Superman",
      "Superwoman",
      "Goofy",
      "Joker",
      "Venom"],

      "adjective": [
        "3D",
        "bad",
        "best",
        "cute",
        "Disney",
        "educational",
        "for kids",
        "free",
        "fun",
        "funny",
        "good",
        "Kinder",
        "latest",
        "little",
        "Marvel",
        "mega",
        "newborn",
        "stolen",
        "super",
        "top",
        "viral",
        "scary"],

        "occupation": [
          "baby",
          "boss",
          "boy",
          "brother",
          "chef",
          "genie",
          "girl",
          "gymnast",
          "monster",
          "princess",
          "superhero",
          "troll",
          "animal",
          "child"],

          "verb": [
            "care",
            "color",
            "cook",
            "crash",
            "cry",
            "draw",
            "dress up",
            "eat",
            "feed",
            "fight",
            "get ready",
            "have fun",
            "learn",
            "love",
            "make",
            "paint",
            "count",
            "scream",
            "serve",
            "watch",
            "get buried"
          ],

          "location": [
            "beach",
            "competition",
            "movie theatre",
            "supermarket",
            "park",
            "castle",
            "dance",
            "party",
            "forest",
            "farm house",
            "preschool"
          ],

          "noun": [
            "balloon",
            "bath",
            "battle",
            "bottle",
            "brush",
            "cartoon",
            "collection",
            "color",
            "crown",
            "cup",
            "dc comic",
            "doll",
            "ear",
            "family",
            "finger",
            "finger family",
            "game",
            "habit",
            "ice",
            "joy",
            "leg",
            "makeover",
            "makeup",
            "mask",
            "movie",
            "number",
            "nursery rhyme",
            "pyjama",
            "rhyme",
            "school bag",
            "shower",
            "song",
            "tantrum",
            "toy",
            "tv",
            "video",
            "wrong head",
            "youtube"],

            "food": [
              "burger",
              "Cadbury",
              "cake",
              "candy",
              "chips",
              "Chocobar",
              "chocolate",
              "Coca Cola",
              "cream",
              "donuts",
              "fruit",
              "juice",
              "lollipop",
              "muffin",
              "pastry",
              "toffee"
            ],

            "setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"],
            "animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"],
            "mood": ["vexed","indignant","impassioned","wistful","astute","courteous"],

            "beginning": ["Once upon a time, there was #adjective.a# #occupation# whose name was #hero#. #heroThey.capitalize# went everywhere with #heroTheir# best friend #pet#."],
            "middle": ["One day, #heroThey# decided to go to the #heroLocation# to #verb# with #heroTheir# friends. The #heroLocation# was very #adjective# and #adjective#.",
            "One day, #hero# had to go buy #noun.s# at the store for #heroTheir# mother. 'If we hurry up, maybe she will make her special #adjective# #food# with #food# sauce for dinner!' said #pet#."],
            "end": ["#hero# and #heroTheir# friend #verb.ed# until the sun went down. 'It's getting late,' said #pet#. 'Let's go home, shall we?' So they made their way back, got into bed, and had a good night's sleep. The end!"],
            "story": ["#beginning# #middle# #end#"],
            "origin": ["#[#setPronouns#][hero:#name.capitalize#][pet:#name.capitalize# the #animal.capitalize#][heroLocation:#location#]story#"]
          }


          let grammar = tracery.createGrammar(source);
          let tale = grammar.flatten('#origin#');
          textAlign(CENTER, CENTER);
          textSize(20);
          text(tale,width/10,height/10,width/10*8,height/10*8);
        }
