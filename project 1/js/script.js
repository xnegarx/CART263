/**
"Can't Find its Mom"

Negar Roofigari 


This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


// turn up volume and press the mouse to start the music


function preload() {
 
  // credit to Alix Simatos: https://www.youtube.com/watch?v=cAXNX5WaykA
  song = loadSound("assets/sounds/mall.mp3"); // preload the sound
}

let mob = []; 
let mom = [];

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
let t;


function setup() {

  createCanvas(500, 500);
  t = 0;

// floor gts rid of the decimal place
  cols = floor(width / scl); // scale the width and then round it to the lower bound to get the number of cols
  rows = floor(height / scl); // scale the height and then round it the lower bound to get the number of rows
  background(255);


for (let i = 0; i< 20; i++){ 
    mob[i] = new Particle(i); 
}
for (let i = 0; i< 2; i++){
    mom[i] = new Particle(i); 
}

flowfield = new Array(rows * cols);
flowcolorfield = new Array(rows * cols);

}

// https://genekogan.com/code/p5js-perlin-noise/ for info on perlin noise
// https://www.youtube.com/watch?v=wB1pcXtEwIs for info on the physic engine (pos, vel, acc, speed, force)  

 class Particle {

    constructor() {

      this.pos = createVector(random(width), random(height)); // a vector is created at each position with random height and width
     
      this.vel = createVector(0, 0); // the vector has 0 velocity
      this.acc = createVector(0, 0); // the vector has 0 acceleration
      this.maxSpeed = random(1, 2); // the speed of each particle is a random number between 1 and 2
      this.mass = this.size; 
      
      this.prevPos = this.pos.copy(); // since the particle is a continious line, we track its previous position.
  
      this.size = random(1, 2); // the size of each particle is a random number between 1 and 2
  
    }

    // draw a single "mob" particle
    drawMob() {
      strokeCap(SQUARE);
      strokeWeight(3);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }
    // draw a single "mom" particle
    drawMom() {
      strokeCap(SQUARE);
      strokeWeight(10);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    // define the movement of the particles 
    update() {
      this.pos.add(this.vel); // add velocity to the x, y positions to make it move
      this.vel.add(this.acc); // add acceleration to the velocity to mimic physics
      this.detectEdges(); // detect the edge of the canvas

      this.vel.limit(this.maxSpeed); // maxSpeed value is the max velocity
      this.acc.mult(0);
    }

    // tracking the x and y position of the particle everytime it moves
    updatePrev(){
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }  

    // add force to the acceleration ( force = m * acc )
    applyForce(force) {
      this.acc.add(force);
    }

    // assigning vector (force) and color to the particles
    followMob() { 
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);

      let index = x + y * cols; // calculating the index based on the position of the particle

      let force = flowfield[index]; // force is applied to each particle with a specific index
      this.applyForce(force);

      let c = flowcolorfield[index]; // color is applied to each particle with a specific index
      if (c) {
        stroke(color(c[0], c[1], c[2] * 255)); // the purplish color of the "mob" particles
      }
    }
   // assigning vector (force) and color to the particles
    followMom() {
      let x = floor(this.pos.x / scl);
      let y = floor(this.pos.y / scl);

      let index = x + y * cols; // calculating the index based on the position of the particle

      let force = flowfield[index]; // force is applied to each particle with a specific index
      this.applyForce(force);

      let c = flowcolorfield[index]; // color is applied to each particle with a specific index
      if (c) { 
        stroke(color(125, 249, 255)); // the aqua color of the "mom" particle
      }
    }

    // detecting the edge of the canvas
    detectEdges() {

      // if the Particle touches the left or right edges of the canvas it will reverse direction
      if(this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1;
      }
  
      // if the Particle touches the top or bottom edges of the canvas it will reverse direction 
      if(this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
      }
    }

    // the repulsion force between all the particles 
    attracted(mousePos) {

      // calculate the The difference between the mouse position and the position of all the particles (mom and mob) 
      let force = p5.Vector.sub(mousePos, this.pos); 

      // calculate the square of the magnitude (or length) of the force vector
      let distSquared = force.magSq(); 

      //set the gravity enacted on the particle (based on universal gravitational constant)
      let grav = -20; 

      /* The magnitude of the gravitational force is calculated as the ratio of the gravitational 
      force constant and the square of the distance between the objects */
      let magnitude = grav / distSquared; 

      // resets the force based on the magnitude
      force.setMag(magnitude);

      this.acc = force;
    }

    // the trippy effect that happens once the "kid" particle (mouse) gets close to the "mom" particle
    effect() {

     // calculate the distance between "kid" and "mom"
      let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
     // print(d);

     // let the collision happen only when the distance is less than 0
      if ( d < 30) {
        collision = true;
      } else {
        collision = false;
      }
    }
}


function draw() {

  if (showField) {
    background(0); 
  } else {
    // use alpha to make the particles fade into the background 
    background(color(0, 0, 0, 20));  
  } 
    
  // draw the "kid" particle
  strokeWeight(2);

    push();
    drawingContext.filter = 'blur('+String(random(20))+'px)'; // glow
    fill(125, 249, 255);
    translate(mouseX,mouseY); // follow the mouse
   // tear drop shape
    beginShape();
    strokeWeight(0);
    vertex(0,-15);
    quadraticVertex(9, 0, 0, 3);
    quadraticVertex(-9,0, 0, -15);
    endShape(CLOSE);

    pop();
 
 var x = mouseX * noise(t); // make the particle wiggle to left and right 
 var y = mouseY * noise(t+5); // make the particle wiggle to up and down 

 if ( collision === true) {
  //console.log('BOOM');
  noStroke();
  translate(x,y); // all the particles move relative to the "kid" particle
  strokeWeight(0);

 t = t + 0.01;
 } 

  let mousePos = createVector(mouseX,mouseY);
  noStroke();

// https://www.youtube.com/watch?v=BjoM9oKOAKY for info on 3d perlin noise

  var yoff = start;
   for (let y = 0; y < rows; y++) {
  let xoff = start; // restart xoff for every row
   for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
  
    // assigning r, g, b values according to the noise
      let r = noise(xoff, yoff, zoff) * 255; 
      let g = noise(xoff + 100, yoff + 100, zoff) * 100;
      let b = noise(xoff + 200, yoff + 200, zoff) * 100;
  
      let angle = (xoff, yoff, zoff) * PI; // the particles move in half a circle (180 deg angle) based on their position in the 3d space
      let v = p5.Vector.fromAngle(angle); // vector starts from from angle
      // noise is calculated in 3 dimensional space. (xoff and yoff are the positions, and zoff is treated as time which means that each noise value is calculated based on a slice of the perlin noise space.
      let m = map(noise(xoff, yoff, magOff), 0, 1, -5, 5); // mapping the noise value which is from 0 to 1 to a value between -5 and 5

      v.setMag(m);
  
      flowfield[index] = v; // every vector corresponds to an index in the flowfield array
      flowcolorfield[index] = [r, g, b]; // every color corrsponds to an index in the flowcolorfield array
      xoff += inc; 
    } 
    yoff += inc; 
  } 
  // shifting the value of the noise
  magOff += magInc;
  zoff += incStart;
  //zoff += inc;
  start -= magInc;
  //start += inc;
  
// if a random number less than 10 is bigger than 5 (1/2 chance) and the number of "mob" particles is less than 1000 push new particles
  if (random(10) > 5 && mob.length < 1000) { 
      let rnd = floor(noise(zoff) * 20); // the rnd variable represents the number of new particles that will be added to the "mob" 
      for (let i = 0; i < rnd; i++) {
  mob.push(new Particle());
    } 
  } 
  // if the number of "mob" particles is more than 500 remove particles
    else if (mob.length > 500) {
    let rnd = floor(random(10)); // the rnd variable represents the number of particles that will be removed from the "mob" 
    for (let i = 0; i < rnd; i++) {
      mob.shift();
      } 
    }

  // call the methods for "mob" particles
  for (let i = 0; i< mob.length; i++) {
    mob[i].update(); 
    mob[i].drawMob(); 
    mob[i].attracted(mousePos); 
    mob[i].followMob();
        }

  // call the methods for the "mom" particle
  for (let i = 0; i< mom.length; i++) {
    mom[i].update(); 
    mom[i].drawMom(); 
    mom[i].attracted(mousePos);
    mom[i].followMom();
    mom[i].effect();
        }
}

  // play song when mouse is pressed
  function mousePressed() {
  song.play();
  }

