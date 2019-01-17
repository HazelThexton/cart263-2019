"use strict";

/*****************

Project 1
Hazel Thexton

Sisyphus

******************/

// Variable tracking which screen you are on
let currentScreen = 0;

window.addEventListener('deviceorientation', function(event) {
  console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});
