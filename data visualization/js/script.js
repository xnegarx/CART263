/**
Know Your Iris
Negar Roofigari
*/

"use strict";


let table;
let data = [];


// view buttons
let button;

// boolean for the view options controlled by the bottons
let one = true;

let centerX;
let centerY;


let scale_global; 

// slider variables
let scaleSlider;
let offset_SetosaSlider;
let offset_VersicolorSlider;
let offset_VirginicaSlider;

// size of circles
let size_Setosa = 10;
let size_Versicolor = 15;
let size_Virginica = 15;

// number of repeats
let repeats_Setosa = 20;
let repeats_Versicolor = 30;
let repeats_Virginica =35;

// the radial offset
// it is used to minimize, or maximize the petal lengths to stretch in or stretch out the flowers.
// these specific numbers are based on the minimum petal length of each flower species (Setosa: 1cm Versicolor: 3cm Virginica: 4.5cm)
let offset_Setosa = -1;
let offset_Versicolor = -3;
let offset_Virginica = -4.5;

function preload() {
table = loadTable("iris.csv", "csv", "header")
}


function setup() {

  // hue, saturation, and brightness, alpha
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // create view botton at position (50, 200)
  button = createButton('Overlaid');
  button.position(50, 200); 
  button.mousePressed(overlaid);

  // create view botton at position (50, 230)
  button = createButton('Individual');
  button.position(50, 230);
  button.mousePressed(individual);

  // create canvas the size of the window 
  createCanvas(windowWidth, windowHeight);

  // scale slider at position (50, 600) for the range from 1 to 80, default 45, step size 1 
  scaleSlider = createSlider(1, 80, 45, 1);
  scaleSlider.position(50, 600);

  // offset Setosa slider at position (50, 400) for the range from 0 to 1, default 0, step size 0.1 
  offset_SetosaSlider = createSlider(-1, 0, 0, 0.1);
  offset_SetosaSlider.position(50, 400);

  // offset Versicolor slider at position (50, 450) for the range from 0 to 3, default 0, step size 0.1 
  offset_VersicolorSlider = createSlider(-3, 0, 0, 0.1);
  offset_VersicolorSlider.position(50, 450);

  // offset Virginica slider at position (50, 500) for the range from 0 to 4.5, default 0, step size 0.1 
  offset_VirginicaSlider = createSlider(-4.5, 0, 0, 0.1);
  offset_VirginicaSlider.position(50, 500);

// the parseFloat() function is used to convert the string values from the table to floating-point numbers like x & y 
  for (var r = 0; r < table.getRowCount(); r++) { // cycle through each row of the table in the first 5 columns
    data[r] = new DataPoint(
      table.getString(r, 0),
      parseFloat(table.getString(r, 1)),
      parseFloat(table.getString(r, 2)),
      parseFloat(table.getString(r, 3)),
      parseFloat(table.getString(r, 4)),
      table.getString(r, 5)
    );
  }
}


function draw() {
  background(0); // black background
  fill(0, 0, 100); // white 

  // set the sliders and add their names and positions below them
  scale_global = scaleSlider.value();
  text("scale:" + scale_global, 60, 650);

  offset_Setosa = offset_SetosaSlider.value();
  text("radial offset Setosa:" + offset_Setosa, 60, 440);

  offset_Versicolor = offset_VersicolorSlider.value();
  text("radial offset Versicolor:" + offset_Versicolor, 60, 490);

  offset_Virginica = offset_VirginicaSlider.value();
  text("radial offset Virginica:" + offset_Virginica, 60, 540);

  // call the methods of the class
  for(let i = 0; i < data.length; i++) {
    data[i].drawSetosa()
    data[i].drawVersicolor()
    data[i].drawVirginica()
  }
}

class DataPoint {
  constructor(Id, SepalLength, SepalWidth, PetalLength, PetalWidth, Species) {

    // add each data point to the object
    this.SepalLength = SepalLength;
    this.SepalWidth = SepalWidth;
    this.PetalWidth = PetalWidth;
    this.Id = Id;
    this.PetalLength = PetalLength;
    this.Species = Species;

    this.x;
    this.y;

  }

  drawSetosa() {

    // when one = true which is the default, draw the datapoints from center (width*1.5/8, height/2)
    if (one) {
      centerX = width*1.5/8;
      centerY = height/2;
    // when one = false draw the datapoints from the center of the window
    } else {
      centerX = width/2;
      centerY = height/2;
    } 
    // performs the following steps on the Iris_Setosa data
    if (this.Species === 'Iris-setosa') {
      // the scaled petal lengths determine the radius
      let radius = this.PetalLength * scale_global
      // repeats_Satosa is basically the number of copies made from the data
      // the value of number of repeats is used to determine the angular rotations
      for (let i = 0; i < repeats_Setosa; i++) {
        // calculate the angle for each datapoint based on the number of copies
        let angle = i * TWO_PI / repeats_Setosa;
        // trigonometry formulas to calculate the x & y of the datapoint: x = r*cos(angle) y = r*sin(angle)
        this.x = centerX + (radius+scale_global*offset_Setosa) * cos(angle);
        this.y = centerY + (radius+scale_global*offset_Setosa) * sin(angle);
        // fill(400, 100, 100, 10);
        /* radial gradient has two circular gradients 
        inner circle starts at center (this.x, this.y) with radius 0 and color(140, 100, 100, 5)
        outer circle starts at center (this.x, this.y) with radius 9 and color(310, 100, 100, 5) */
        radialGradient(this.x, this.y, 0, this.x, this.y, 9, color(140, 100, 100, 5), color(310, 100, 100, 5));
        // distance between mouse and each datapoint
        let dis = dist(mouseX, mouseY,this.x, this.y);
        /* draw a circle with the radialGradient color and size_Setosa diameter at each datapoint (this.x, this.y) 
        when distance between mouse and datapoint is less than 3 make the circle white 
        and write the flower type and petal length used to generate that datapoint */
        if (dis < 3) {
          fill(255); // white 
          noStroke();
          circle(this.x, this.y, size_Setosa);
          text('Setosa', this.x + 5, this.y)
          text(this.PetalLength, this.x + 7, this.y-10)
        } else {
          circle(this.x, this.y, size_Setosa);
        }
      }    
    }
  }
  
  drawVersicolor() {

    // when one = true which is the default, draw the datapoints from center (width*3.5/8, height/2)
    if (one) {
      one = true;
      centerX = width*3.5/8;
      centerY = height/2;
    // when one = false draw the datapoints from the center of the window
    } else {
      centerX = width/2;
      centerY = height/2;
    } 
    // performs the following steps on the Iris_Versicolor data
    if (this.Species === 'Iris-versicolor') {
      // the scaled petal lengths determine the radius
      let radius = this.PetalLength * scale_global
      // repeats_Versicolor is basically the number of copies made from the data
      // the value of number of repeats is used to determine the angular rotations
     for (let i = 0; i < repeats_Versicolor; i++) {
        // calculate the angle for each datapoint based on the number of copies
        let angle = i * TWO_PI / repeats_Versicolor;
        // trigonometry formulas to calculate the x & y of the datapoint: x = r*cos(angle) y = r*sin(angle)
        this.x = centerX + (radius+scale_global*offset_Versicolor) * cos(angle);
        this.y = centerY + (radius+scale_global*offset_Versicolor) * sin(angle);
        // fill(73, 73, 244, 40);
        /* radial gradient has two circular gradients 
        inner circle starts at center (this.x, this.y) with radius 0 and color(140, 100, 100, 5)
        outer circle starts at center (this.x, this.y) with radius 9 and color(310, 100, 100, 5) */
        radialGradient(this.x, this.y, 0, this.x, this.y, 9, color(140, 100, 100, 5), color(310, 100, 100, 5));
        // distance between mouse and each datapoint
        let dis = dist(mouseX, mouseY,this.x, this.y);
        /* draw a circle with the radialGradient color and size_Versicolor diameter at each datapoint (this.x, this.y) 
        when distance between mouse and datapoint is less than 3 make the circle white 
        and write the flower type and petal length used to generate that datapoint */
        if (dis < 3) {
          fill(255); // white
          noStroke();
          circle(this.x, this.y, size_Versicolor);
          text('Versicolor', this.x + 7, this.y+25)
          text(this.PetalLength, this.x+10, this.y+15)
          
        } else {
          circle(this.x, this.y, size_Versicolor);
        }
      }
    }
  }

  drawVirginica() {
    // when one = true which is the default, draw the datapoints from center (width*6.5/8, height/2)
    if (one) {
      one = true;
      centerX = width*6.5 / 8;
      centerY = height / 2;
    // when one = false draw the datapoints from the center of the window
    } else {
      centerX = width/2;
      centerY = height/2;
    } 
    // performs the following steps on the Iris_Virginica data
    if (this.Species === 'Iris-virginica') {
      // the scaled petal lengths determine the radius
      let radius = this.PetalLength * scale_global
      // repeats_Virginica is basically the number of copies made from the data
      // the value of number of repeats is used to determine the angular rotations
      for (let i = 0; i < repeats_Virginica; i++) {
        // calculate the angle for each datapoint based on the number of copies
        let angle = i * TWO_PI / repeats_Virginica; 
        // trigonometry formulas to calculate the x & y of the datapoint: x = r*cos(angle) y = r*sin(angle)
        this.x = centerX +  (radius+scale_global*offset_Virginica) * cos(angle);
        this.y = centerY +  (radius+scale_global*offset_Virginica) * sin(angle);
        // fill(red, green, blue, 30);
        /* radial gradient has two circular gradients 
        inner circle starts at center (this.x-1, this.y-5) (gradient shift) with radius 0 and color(140, 100, 100, 5)
        outer circle starts at center (this.x-1, this.y-5) (gradient shift) with radius 9 and color(310, 100, 100, 5) */
        radialGradient(this.x-1, this.y-5, 0, this.x-1, this.y-5, 9, color(140, 100, 100, 5), color(310, 100, 100, 5));
        // distance between mouse and each datapoint
        let dis = dist(mouseX, mouseY,this.x, this.y);
        /* draw a circle with the radialGradient color and size_Virginica diameter at each datapoint (this.x, this.y) 
        when distance between mouse and datapoint is less than 3 make the circle white 
        and write the flower type and petal length used to generate that datapoint */
        if (dis < 3) {
          fill(255); // white
          noStroke();
          circle(this.x, this.y, size_Virginica);
          text('Virginica', this.x - 40, this.y+20)
          text(this.PetalLength, this.x-35, this.y+10)
          
        } else {
          circle(this.x, this.y, size_Virginica);
        }
      } 
    }
  }
}

// when "overlaid" button is pressed this fucntion is called and one becomes false
function overlaid() {
  one = false;
} 

// when "individual" button is pressed this fucntion is called and one becomes true
function individual() {
  one = true;
} 

// gradient parameters
function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.fillStyle = gradient;
}