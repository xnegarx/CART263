/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";



let weather;
function preload() {
 weather = loadJSON('https://api.open-meteo.com/v1/forecast?latitude=45.51&longitude=-73.59&hourly=temperature_2m,cloudcover,windspeed_10m,winddirection_10m&daily=sunrise,sunset&current_weather=true&timezone=America%2FChicago');
}
//'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m'

function setup() {
 createCanvas(500, 500);

print(weather);

print(weather.hourly.cloudcover);
background(weather.hourly.cloudcover);

let xPos = weather.latitude;

let yPos = weather.longitude;

print("Located at: "+ xPos +", "+ yPos);

ellipse(xPos, yPos+150, 30, 30);
// print("Current temp: "+ weather.current_weather.temperature);

text("Current wind speed: "+ weather.current_weather.windspeed, height/2, width/2);
text("Current wind direction: "+ weather.current_weather.winddirection, height/2, (width/2)-50);


print("The hourly temperature is (in C): ")

 for(let i = 0; i < 5; i++){
 print(weather.hourly.temperature_2m[i]+" C");
 fill(weather.hourly.temperature_2m[i])
 //circle(50, 50, i);
 
 }



}

// API : unique identifier 
