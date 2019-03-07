// OnscreenText
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.
//

class OnscreenText {

// Text constructor
//
// Sets the properties with the provided arguments
constructor(x1,y1,x2,y2,size,font,color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.size = size;
  this.font = font;
  this.color = color;
}

// display()
//
// Display the text onscreen
display (string) {
  this.format();
  text(string,this.x1,this.y1,this.x2,this.y2);
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
