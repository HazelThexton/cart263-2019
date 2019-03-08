// OnscreenText
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.
//

class OnscreenText {

  // Text constructor
  //
  // Sets the properties with the provided arguments
  constructor(x,y,size,color) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = width/10*8;
    this.y2 = height/10*8;
    this.size = size;
    this.font = "Comic Sans MS";
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
