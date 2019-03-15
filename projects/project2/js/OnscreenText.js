// OnscreenText
//
// A class to define how displayed text looks and changes. Taken from my
// Project 2.
//

class OnscreenText {

  // Text constructor
  //
  // Sets the properties with the provided arguments
  constructor(x,y,size,color,font) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = "Comic Sans MS";
    this.color = color;
    this.font = font;
  }

  // display()
  //
  // Display the text onscreen
  display (string) {
    this.format();
    text(string,this.x,this.y);
  }

  // textFormat()
  //
  // Text size, color, etc.
  format () {
    //textAlign(CENTER, CENTER);
    textFont(this.font);
    textSize(this.size);
    textLeading(20);
    fill(this.color);
  }
}
