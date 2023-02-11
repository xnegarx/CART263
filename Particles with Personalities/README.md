# **Can't Find its Mom**


## Initially, I wanted to focus on the following elements:

1. Showing a cluster of particles moving around a single particle, to represent being lost in a mall as a kid.
2. The "kid" particle should be visually distinct from the other particles, with a different shape, color, and movement.
3. The "mom" particle should be wandering aimlessly within the crowd.
4. Adding sound to increase tension.

## My main challenges were visualizing the particles and creating proper interactions between them.

### For the visualization:

"mob" particles move quickly and erratically in a semi-circle pattern, appearing chaotic but uniform. They are purple in color.
"mom" particle moves similarly to the "mob" particles but is thicker and the same color as the "kid".
The "kid" particle is controlled by the viewer and has a teardrop shape that leaves a trail as it moves. Its design was inspired by fantasy creatures.

### For the interactions:

Viewer can press the mouse to play music.
At first, I had two types of "mob" particles with different movements, but I later decided to simplify it to only one type of "mob" and convert the other particle into the "mom" for clearer representation of the theme.
To make the particle system resemble real life, I introduced a repulsion force that makes the particles change direction when they touch each other or the "kid" (mouse). They also deflect when they touch the canvas border.
I wanted the "mom" and "kid" particles to have a unique interaction. taking the theme literal, I designed them to always stay separated by using the "effect" function which moves the particles relative to the kid (mouse) and prevents them from getting too close to each other, 
by keeping the distance between all the particles the same. This adds to the confusion, panic, and dizziness that I wanted to convey and makes it seem like time has skipped in the instance of the "mom" and "kid" finding each other.


## Remarks:

I found the most important part of the process to be adding the final touches to the code after I had the basic particle system working. The biggest challenge for me was making the particles represent my theme, which was more about their appearance than their behavior. 
I believe that if I had more time to work on these aspects, it would greatly improve my work.

I am proud of learning new concepts like perlin noise and flow fields. At first, I struggled to understand the parameters I had to use, but by experimenting with the values and watching some videos on the topic, I was able to understand how noise works and make the particles do what I wanted.



(https://genekogan.com/code/p5js-perlin-noise/ for info on perlin noise)
(https://www.youtube.com/watch?v=wB1pcXtEwIs) for info on the physic engine (pos, vel, acc, speed, force)  
(https://www.youtube.com/watch?v=BjoM9oKOAKY) for info on 3d perlin noise

song: 
(https://www.youtube.com/watch?v=cAXNX5WaykA)
