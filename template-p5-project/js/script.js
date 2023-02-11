/**
"Can't Find its Mom"

Negar Roofigari 


This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";




/**
Description of preload
*/
function preload() {
 
  song = loadSound("assets/sounds/mall.mp3");
}


// turn up volume :)
// open in firefox


let mob = []; 
let mom = [];
let ball3 = [];
let t;


let start = 0;
let inc = 0.1; //increment
let incStart = 0.005; 
let magInc = 0.0005;
let scl = 10; //scale for the vector grid
let cols, rows;
let zoff = 0; 
let fps; //frames per second
let flowfield; // vectors
let flowcolorfield; // colors
let magOff = 0;
let showField = false;

let collision = false;
let song;

/**
Description of setup
*/

function setup() {
  createCanvas(500, 500);
 
 
  t = 0;


// floor gts rid of the decimal place
  cols = floor(width / scl); // scale the width and then round it to the lower bound to get the number of cols
  rows = floor(height / scl); // scale the height and then round it the lower bound to get the number of rows
  background(255);


for (let i = 0; i< 20; i++){ 
    mob[i] = new Particle(i); // crowd
}
for (let i = 0; i< 2; i++){
    mom[i] = new Particle(i); // mom
}
  for (let i = 0; i< 4; i++){
    ball3[i] = new Particle(i); // randos
}

flowfield = new Array(rows * cols);
flowcolorfield = new Array(rows * cols);

}


 class Particle { // do most of the work inside the particle

    constructor() {

      this.pos = createVector(random(width), random(height)); // create a vector at a position with random width and height
     
      this.vel = createVector(0, 0); // the vector has 0 velocity
      this.acc = createVector(0, 0); // the vector has 0 acceleration
      this.maxSpeed = random(1, 2); // the speed of each particle is a random number between 1 and 2
      this.mass = this.size; 
      
      this.prevPos = this.pos.copy(); // since the particle is a continious line, we track its previous position
  
      this.size = random(1, 2); // the size of each particle is a random number between 1 and 2

  
    
    }
    // draw a single particle
    drawMob() {
      strokeCap(SQUARE);
      strokeWeight(3);
 
      //circle(this.pos.x, this.pos.y, this.size);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }
    drawMom() {
    
      strokeCap(SQUARE);
      strokeWeight(10);
    //circle(this.pos.x, this.pos.y, this.size);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }
    draw3() {
      //stroke(0, 5);
      strokeCap(SQUARE);
      strokeWeight(3);
 
      //circle(this.pos.x, this.pos.y, this.size);
      //line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      //this.updatePrev();
    }

    update() {
      this.pos.add(this.vel); //add velocity to the x, y positions to make it move
      this.vel.add(this.acc); //add acceleration to the velocity to mimic physics
      this.detectEdges();

      this.vel.limit(this.maxSpeed);
      this.acc.mult(0);
    }

    updatePrev(){
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }  

    applyForce(force) {
      this.acc.add(force);
    }

    follow() {
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = flowfield[index]; // force is applied to the specific x, y position
      this.applyForce(force);


      let c = flowcolorfield[index];
      if (c) {
        stroke(color(c[0], c[1], c[2] * 255));
      }
    }

    follow2() {
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);
      let index = x + y * cols;
      let force = flowfield[index]; // force is applied to the specific x, y position
      this.applyForce(force);


      let c = flowcolorfield[index];
      if (c) { 
        stroke(color(125, 249, 255));
      }

  
    }

    follow3() {
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);
      let index = x + y * cols;
     //let force = flowfield[index];
     // this.applyForce(force);


      let c = flowcolorfield[index];
      if (c) {
       // stroke(color(this.color));
      }
    }

    detectEdges() {

      // If the Particle touches the left or right edges of the canvas,
      // it will reverse direction.
      if(this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1;
      }
  
      // If the Particle touches the top or bottom edges of the canvas,
      // it will reverse direction.
      if(this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
      }
    }

    attracted(mousePos) {
      let force = p5.Vector.sub(mousePos, this.pos); //the force on each particle moves in is the target position minus its current position (also its distance)
      let distSquared = force.magSq(); //the distance between current and target position squared (will be used to calculate gravity force enacted on particle)
      let grav = -20; //set the gravity enacted on the particle (based on universal gravitational constant)
      let magnitude = grav / distSquared; //the magnitude of the force enacted on each particle
      force.setMag(magnitude);
      this.acc = force;
    }

    effect() {
      let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
     // print(d);

      if ( d < 30) {
        collision = true;
     
      } else {
        collision = false;
      }
    }
}

/**
Description of draw()
*/

/*function loaded() {
  console.log('hello')
  song.play();
 // song.loop();
} */

function draw() {

  if (showField) {
    background(0); 

   // console.log('bark');
  } else {
    background(color(0, 0, 0, 20));  
  
  } 
    
  strokeWeight(2);
 
    push();
    drawingContext.filter = 'blur('+String(random(20))+'px)';
    fill(125, 249, 255);
    translate(mouseX,mouseY);
    beginShape();
    strokeWeight(0);
    vertex(0,-15);
    quadraticVertex(9, 0, 0, 3);
    quadraticVertex(-9,0, 0, -15);
    endShape(CLOSE);
    pop();
 
 var x = mouseX * noise(t);
 var y = mouseY * noise(t+5);
 var r = 255 * noise(t+10);
 var g = 255 * noise(t+15);
 var b = 255 * noise(t+20);
 
 if ( collision === true) {
  console.log('BOOM');
  noStroke();
  fill(r, g, b);
  translate(x,y);
  strokeWeight(0);
  vertex(0,-10);
 
 t = t + 0.01;
   
 } 

  let mousePos = createVector(mouseX,mouseY);
  
  noStroke();

for (let i = 0; i< mob.length; i++) {
  mob[i].update(); // to access that unique position
  mob[i].drawMob(); // to draw the mob particles
  mob[i].attracted(mousePos); 
  mob[i].follow();
      }

for (let i = 0; i< mom.length; i++) {
  mom[i].update(); // to access that unique position
  mom[i].drawMom(); // to draw the mom particles
  mom[i].attracted(mousePos);
  mom[i].follow2();
  mom[i].effect();
      }

for (let i = 0; i< ball3.length; i++) {
  ball3[i].update(); // to access that unique position
  ball3[i].draw3();
  ball3[i].attracted(mousePos);
  ball3[i].follow3();

      }
        
  var yoff = start;
   for (let y = 0; y < rows; y++) {
  let xoff = start; // restarting xoff for every row
   for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
  
      let r = noise(xoff, yoff, zoff) * 255;
      let g = noise(xoff + 100, yoff + 100, zoff) * 100;
      let b = noise(xoff + 200, yoff + 200, zoff) * 100;
  
      let angle = (xoff, yoff, zoff) * PI;
      let v = p5.Vector.fromAngle(angle); // vector from angle
      let m = map(noise(xoff, yoff, magOff), 0, 1, -5, 5); // mapping the noise value from 0 to 1 to a value between -5 and 5
      v.setMag(m);
  
      flowfield[index] = v; // every vector corresponds to an index in the array
      flowcolorfield[index] = [r, g, b];
      xoff += inc; 
    } 
    yoff += inc; 
  } 
  magOff += magInc;
  zoff += incStart;
  //zoff += inc;
  start -= magInc;
 // start += inc;
  
  
   if (random(10) > 5 && mob.length < 1500) {
       let rnd = floor(noise(zoff) * 20);
        for (let i = 0; i < rnd; i++) {
    mob.push(new Particle());
      } 
    } 
     else if (mob.length > 1000) {
     let rnd = floor(random(10));
     for (let i = 0; i < rnd; i++) {
      mob.shift();
      } 
    }



  }

  function mousePressed() {
song.play();
  }

