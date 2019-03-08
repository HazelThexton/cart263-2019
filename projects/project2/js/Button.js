// Button
//
// A class to define the button behaves. The "button" is composed of the sidewalk
// area, but mainly individual segments that loop around much like the buildings.

class Button {

// Button constructor
//
// Sets the properties with the provided arguments
constructor(x,y,size,string) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.string = string;
  this.buttonText;
  this.width;
  this.height;
  this.font = "Comic Sans MS";
  this.color = 0;
}

// display()
//
// Draw the button segment and sidewalk as a rectangle on the screen
display() {
  push();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(5);
  fill(255);
  rect(this.x, this.y, this.width, this.height, 20);
  pop();
  push();
  this.format();
  stroke(0);
  strokeWeight(5);
  text(this.string,this.x,this.y);
  pop();
  this.width = textWidth(this.string) + 20;
  this.height = this.size + 20;
}

// clicked()
//
// Draw the button segment and sidewalk as a rectangle on the screen
clicked() {
  if (mouseIsPressed && mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2){
    return true;
  }
  else {
    return false;
  }
}
// textFormat()
//
// Text size, color, etc.
format () {
  textAlign(CENTER, CENTER);
  textFont(this.font);
  textSize(this.size);
  fill(this.color);
}

}
