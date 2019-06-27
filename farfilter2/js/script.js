/******************************************************************************
Where's [INSERT ANIMAL HERE]?
by Hazel Thexton

An algorithmic version of a Where's Wally searching game where you
need to click on the animal you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/
var color;
var color1;
var color2;
var color3;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {

}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffffff");
  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();
}

function draw() {
    noStroke();
  color = map(mouseX,0,width, -100,100);
  if (mouseIsPressed) {

    var rangeUp = constrain(color+50, -100, 100);
    var rangeDown = constrain(color-50, -100, 100);

  color1 = int(random(rangeDown,rangeUp));
  var convertedColor = constrain(map(color1,-100, 100,0,255),0,255);



  color2 = int(random(rangeDown,rangeUp));
  var convertedColor2 = constrain(map(color2,-100, 100,0,255),0,255);

  color3 = color1 + color2;
  var convertedColor3 = constrain(map(color3,-100, 100,0,255),0,255);

  fill(convertedColor);
  rect(width/2,height/2,200,200);
  fill(convertedColor2);
  rect(width/2,height/2,150,150);
  fill(convertedColor3);
  rect(width/2,height/2,100,100);

  console.log(convertedColor,convertedColor2,convertedColor3);
}
}

function square() {
    noStroke();
  color = map(mouseX,0,width, -100,100);
  //if (keyIsDown(ENTER)) {

    var rangeUp = constrain(color+50, -100, 100);
    var rangeDown = constrain(color-50, -100, 100);

  color1 = int(random(rangeDown,rangeUp));
  var convertedColor = constrain(map(color1,-100, 100,0,255),0,255);



  color2 = int(random(rangeDown,rangeUp));
  var convertedColor2 = constrain(map(color2,-100, 100,0,255),0,255);

  color3 = color1 + color2;
  var convertedColor3 = constrain(map(color3,-100, 100,0,255),0,255);

  fill(convertedColor);
  rect(width/2,height/2,170,170);
  fill(convertedColor2);
  rect(width/2,height/2,140,140);
  fill(convertedColor3);
  rect(width/2,height/2,100,100);

  console.log(convertedColor,convertedColor2,convertedColor3);
//}
}
