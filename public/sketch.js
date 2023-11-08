/*
Adapted from Pitch Painting Sketch - Pitch Detection Painting
by AndreasRef
Built with pitchDetection model from ml5js and p5js
Created by Andreas Refsgaard 2020 and from https://editor.p5js.org/kchung/sketches/Hy9rk2-8X
*/

let vol = 5.0;
let mic;
let pitch;
let audioContext;
let song; //song for the pulsating circle
//preload the song
function preload() {
  song = loadSound('unchained.MP3'); 
}

let angle=0;// initialize angle variable
let scalarX;
let scalarY;
let startX;	// set the x-coordinate for the circle center
let startY;	// set the y-coordinate for the circle center

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let currentNote = '';

let colorArray = [];
let colors = [];

let colorSelect = [];
let scalar = 80; //set scalar for the size of ellipses

//central pulsating circle globals here
let radius = 100;
let maxRadius = 270;
let minRadius = 90;
let nextRadius = 8;
let growing = true;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 255);
    angleMode(DEGREES); // Change the angle mode from radians to degrees
  
// Create a button
  let button = createButton('Paint the Melody!');
  button.position(windowWidth/2 - button.width/2, windowHeight - 40);
  button.mousePressed(startMusic);
  button.style('background-color', '#333'); // Dark grey background
  button.style('color', '#CCC'); // Light grey text
  button.style('padding', '10px 20px');
  button.style('border', 'none');
  button.style('font-size', '16px');
  
  
  //assign user a random path direction and scale
  angle = random(300, 920);
  scalarX = random(270, 300);
  scalarY = scalarX; //because it's a circle
  
  //assign user a random alpha value for their path
  a = random(0, 150);
  
  // Create an amplitude object for the song
  songAmplitude = new p5.Amplitude();
  songAmplitude.setInput(song);
  
  //center of pulsating circle
  startX = windowWidth/2;
  startY = windowHeight/2;

 audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  //Array containing three arrays, user is assigned one color palette that corresponds to their changing pitches
colorArray = [
  [
    color(217, 245, 219, a),     // C light green
    color(123, 207, 105, a),      // C#/Db medium light green
    color(38, 145, 54, a),      // D medium green
    color(4, 99, 18, a),     // D#/Eb emerald green
    color(5, 179, 92, a),       // E - mermaid green
    color(113, 227, 193, a),       // F - aquamarine
    color(102, 250, 245, a),       // F#/Gb - sky blue
    color(173, 234, 240, a),      // G - baby blue
    color(173, 210, 240, a),       // G#/Ab - perriwinkle
    color(69, 172, 255, a),      // A - sports blue
    color(21, 108, 214, a),          // A#/Bb - deep blue
    color(5, 56, 166, a)           // B - cobalt
    ],
  
   [
    color(255, 221, 0, a),     // C sunshine yellow
    color(222, 205, 24, a),      // C#/Db chartreuse
    color(214, 211, 2, a),      // D dark chartreuse
    color(226, 245, 24, a),     // D#/Eb tennis ball
    color(221, 255, 3, a),       // E - key lime
    color(200, 255, 3, a),       // F - neon lightgreen
    color(149, 212, 2, a),       // F#/Gb - healthy young leaf
    color(130, 196, 37, a),      // G - dull lightgreen
    color(131, 237, 31, a),       // G#/Ab - rich lime
    color(131, 176, 7, a),      // A - toad
    color(122, 143, 3, a),          // A#/Bb - army
    color(176, 186, 69, a)           // B - pale chartreuse
    ],
  
  [
    color(212, 89, 203, a),     // C magenta
    color(245, 154, 238, a),      // C#/Db orchid
    color(255, 201, 234, a),      // D baby pink
    color(252, 146, 171, a),     // D#/Eb bubblegum
    color(217, 124, 134, a),       // E - dusty rose
    color(232, 77, 77, a),       // F - dark coral
    color(232, 103, 77, a),       // F#/Gb - salmon
    color(255, 51, 51, a),      // G - pale crimson
    color(227, 34, 34, a),       // G#/Ab - vermillion
    color(204, 6, 6, a),      // A - cardinal
    color(166, 2, 21, a),         // A#/Bb - cherry
    color(252, 30, 56, a)           // B - bright dark pink
  ]
  ];

  colors = getRandomColor();
  
  //make the ellipses that start appearing while the color-assigning code is still loading very light and not white
  noStroke();
  fill(185, 234, 205,5);
}

// Function to handle button press and start music
function startMusic() {
  if (!song.isPlaying()) {
    song.play();}
}

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

//Load the model and get the pitch
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

//Draw on the canvas
function draw() {
  background(0, 0);
  //Use the volume from the microphone to control the size
  vol = mic.getLevel();
 
  //x position of ellipse, slight variation to create digital brush effect
    let x = (startX+random(3,10)) + (scalarX * sin(angle));
  //y position of ellipse
  let y = (startY+random(3,10)) + (scalarY * cos(angle));

  // Draw the ellipse at the calculated position, size corresponds to user's volume
  ellipse(x+(vol*100), y+(vol*100), vol*500);

  angle++;	// increment angle for the next frame
  
   // Use the song's amplitude for the pulsating circle
  let songVol = songAmplitude.getLevel();
  
  //central pulsating circle, made of many ellipses
    drawEllipse(60, 160, 200, 235, 25, 85, 0, 40, windowWidth / 2, windowHeight / 2, radius);

  drawEllipse(120, 160, 100, 210, 50, 95, 50, 80, windowWidth / 2, windowHeight / 2, radius - 50);
  
  drawEllipse(80, 110, 90, 180, 40, 65, 50, 100, windowWidth / 2, windowHeight / 2, radius - 90);
   
  drawEllipse(120, 160, 210, 240, 140, 165, 100, 180,windowWidth / 2, windowHeight / 2, radius - 100);
  
    drawEllipse(120, 160, 210, 240, 140, 165, 100, 250,windowWidth / 2, windowHeight / 2, radius - 170);
  
  //black ellipse to erase underneath color layers
  drawEllipse(0, 0, 0, 0, 0, 0, 100, 255, windowWidth / 2, windowHeight / 2, radius);

  //make them expand and contract rhythmically
  if (growing) {
    radius += nextRadius;
  } else {
    radius -= nextRadius;
  }

  if (radius <= minRadius || radius >= maxRadius) {
    growing = !growing;
  }
  
  //randomize a bit more, can delete this, only slight aesthetic difference
  minRadius = random(90, 105);
  maxRadius = random(235, 260);
}
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
      fill(colors[midiNum % 12]); //mapping color of each ellipse, from specific palette assigned in setup, to pitch
      select('#noteAndVolume').html('Note: ' + currentNote + " - volume " + nf(vol,1,2));
    }
    getPitch();
  })
}

//function to pick a color palette to assign to the user, assigned once at the start in setup function
function getRandomColor() {
  return random(colorArray);
}

//function to draw central pulsating ellipses
function drawEllipse(r1, r2, g1, g2, b1, b2, a1, a2, x, y, rad) {
  fill(random(r1, r2), random(g1, g2), random(b1, b2), random(a1, a2));
  noStroke();
  ellipse(x, y, rad);}
  //////////////////SOCKET FOR SERVER SIDE ///////////////////////
// Emit the move to the server

('#instructions-link').on('click', function (e) {
  e.preventDefault(); // Prevents the default action of the link
  $('#instructions-popup').fadeIn();
});

$('#hide-instructions').on('click', function () {
  $('#instructions-popup').fadeOut();
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    let newUser = {
      id:socket.id, 
      // color:getRandomColor(), 
      path:[]
    };
    users.push(newUser);
    //emit the new user's data to all clients
    io.emit('newUser', newUser);

});