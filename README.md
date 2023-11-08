* This app is an online choir website where users can sing along to the music 
* The coding train was an invaluable resource to figure out the puzzle in p5JS. The p5JS crashed a lot. 

-------------------------
/*
Adapted from Pitch Painting Sketch - Pitch Detection Painting
by AndreasRef
Built with pitchDetection model from ml5js and p5js
Created by Andreas Refsgaard 2020 and from https://editor.p5js.org/kchung/sketches/Hy9rk2-8X
*/

//newFile.js contains all socket interactions. 
//index.js sets up the connections and user management
//sketch.js contains client-side code

### SETUP
* Make sure you cd to the write folder
* Run `npm install` to load the necessary node packages
* run 'node index.js'
* Open two broswer windows both pointing to `localhost:3000`




###How it works
//Users use their microphone to sing along to the song. THe data of their voice is coverted (based on the pitch) into a visual representation to the beat, creating a visual choir.
