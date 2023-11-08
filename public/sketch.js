let socket = io.connect(window.location.origin);

//Globals pulsating circle
let radius = 100;
let maxRadius = 300;
let minRadius = 100;
let nextRadius = 8;
let growing = true;
let users = [];

// can use FOR AUDIO FILE PRELOAD
//function preload() {
//   source = loadImage('puzzle1.JPG');
// }


//Globals color paths

let vol = 0.0;
let mic;
let pitch;
let audioContext;

let angle=0;// initialize angle variable
let scalarX;
let scalarY;
let startX = 200;	// set the x-coordinate for the circle center
let startY = 200;	// set the y-coordinate for the circle center

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let currentNote = '';

let colorArray = [];
let colors = [];

let colorSelect = [];
let scalar = 80; //set scalar for the size of ellipses


///////////////////////////////SET UP OF THE CHOIR PAGe////////////////////


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 100);
  angleMode(DEGREES); // Change the angle mode from radians to degrees
  
  angle = random(300, 920);
  scalarX = random(150, 350);
  scalarY = scalarX;
  a = random(0, 150);

 audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  // Define the color palette according to the provided color associations -- a mixture of primary colors, secondary colors -- and tertiary (with some )
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

  // colors = getRandomColor();
  console.log(colors);
  
  noStroke();
  fill(185, 234, 205,5);
  // let colorSelect = [];
  //  colorSelect = colorArrayrandom(colorArray);
}


//functions section
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

//Load the model and get the pitch
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
      fill(colors[midiNum % 12]);
      // let colorSelect = random(colorArray);
      //fill(colorSelect[midiNum % 12]); 
      //i want to select which array im referring to before i get to this fill, when setup hits
      //the getPitch function is called 
      select('#noteAndVolume').html('Note: ' + currentNote + " - volume " + nf(vol,1,2));
    }
    getPitch();
  })

}
//Draw Loop
function draw() {
  //Pulsating Central Circle
    //background(0, random(0, 30));
//   fill(random(60, 160), random(200, 235), random(25, 85), random(5, 20));
//   noStroke();
//   ellipse(windowWidth / 2, windowHeight / 2, radius);

//   fill(random(180, 210), random(60, 160), random(40, 65), random(0, 10));
//   noStroke();
//   ellipse(windowWidth / 2, windowHeight / 2, radius - 70);

//   fill(random(120, 160), random(210, 240), random(140, 165), random(0, 15));
//   noStroke();
//   ellipse(windowWidth / 2, windowHeight / 2, radius - 100);
  
fill(255, random(0, 15)); //write a function for the fills or else all white
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2, radius);

  if (growing) {
    radius += nextRadius;
  } else {
    radius -= nextRadius;
  }

  if (radius <= minRadius || radius >= maxRadius) {
    growing = !growing;
  }
  minRadius = random(100, 115);
  maxRadius = random(285, 300);

users.forEach((user, index) =>{
  let  vol = mic.getLevel();
  let angleOffset = index * 10; // Just an example offset for each user to separate ellipses
  let currentAngle = angle + angleOffset;
  let x = width / 2 + cos(currentAngle) * scalarX * vol * 5;
  let y = height / 2 + sin(currentAngle) * scalarY * vol * 5;
  fill(user.color); // Use the user's color
    ellipse(x, y, vol * 500); // Draw the ellipse with size based on volume
  });
//Color Path
  //Use the volume from the microphone to control the size
 // The angle for each note will be updated when a new pitch is detected
  // let x = width / 2 + cos(angle) * scalar * vol * 5;
  // let y = height / 2 + sin(angle) * scalar * vol * 5;
  
    var x = (width/2+random(3,10)) + (scalarX * sin(angle));
  var y = (width/2+random(3,10)) + (scalarY * cos(angle));

  // Draw the ellipse at the calculated position
  ellipse(x+(vol*100), y+(vol*100), vol*500); // The size can be adjusted or mapped to volume as well

  angle++;	// increment angle for the next frame
  
}
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