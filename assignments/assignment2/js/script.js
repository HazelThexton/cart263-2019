"use strict";

/*****************

Exercise 2
Hazel Thexton

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Multiple circles represent food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.

******************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 0.5;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;
const FOOD_MAX_SPEED = 10;

// Variables to store the two key objects
let avatar;
let food = [];


// preload()
//
// Not needed
function preload() {

}


// setup()
//
// Create the canvas, avatar, and food, disable the cursor
function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME);
  // Creates 5 foods and adds them to the food array
  for (let i=0; i < 5; i++){
    food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE,FOOD_MAX_SPEED));
  }
  noCursor();
}

// draw()
//
// Clear the background
// Update the avatar and check for eating
// Display the avatar and food
function draw() {
  background(0);

  avatar.update();

  // Checks for collisions with each element of the array and "eats" it if true
  for (let i = 0; i < food.length; i++) {
    if (avatar.collide(food[i])) {
      avatar.eat(food[i]);
    }
  }

  avatar.display();

  // Calls the update and display functions for each food object in the array
  food.forEach(function (food) {
    food.update();
    food.display();
  });
}
