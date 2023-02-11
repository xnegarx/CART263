/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {

}

let ball = [];
let ball2 = [];


/**
Description of setup
*/

function setup() {
createCanvas(400,400);

for (let i = 0; i< 70; i++){
    ball[i] = new Particle(i);
}
for (let i = 0; i< 70; i++){
    ball2[i] = new Particle(i);
}

}


/**
Description of draw()
*/


function draw() {
background(230, 230, 230);
noStroke();
for (let i = 0; i< ball.length; i++) {
ball[i].moveDisplay(); // to access that unique position
    }

for (let i = 0; i< ball2.length; i++) {
ball2[i].moveDisplay2(); // to access that unique position
    }
}



class Particle { // do most of th work inside the particle
    constructor() {
        this.x = random(height);
        this.y = random(width);
        this.diameter = random(10, 30);
    }
    moveDisplay() { 
        this.speed = mouseX/100;
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

      
        if (this.x < 20 || this.x > 380 ) {
            this.speed *= -1;
        } else if (this.y < 20 || this.y > 380 ) {
            this.speed *= -1;
        } else if ( this.x < 130) {
            fill(250, 0, 0);
            ellipse(this.x, this.y, this.diameter);
        } else if ( this.x > 130 && this.x < 260) {
            fill(0, 100, 200);
            ellipse(this.x, this.y, this.diameter);
        } else {
            fill(0, 200, 50);
            ellipse(this.x, this.y, this.diameter);
        }

    }

    moveDisplay2() { 
        this.speed = mouseX/100;
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

        
        if (this.x < 20 || this.x > 380 ) {
            this.speed *= -1;
        } else if (this.y < 20 || this.y > 380 ) {
            this.speed *= -1;
        } else if ( this.x < 130) {
            fill(250, 100, 100);
            ellipse(this.x, this.y, this.diameter);
        } else if ( this.x > 130 && this.x < 260) {
            fill(100, 100, 200);
            ellipse(this.x, this.y, this.diameter);
        } else {
            fill(100, 200, 100);
            ellipse(this.x, this.y, this.diameter);
        }


    }


}

function mousePressed() {

 if ( this.ball2 == true ) {
      fill(0, 100, 200, 0);
        console.log("disappear");
   }
    
}