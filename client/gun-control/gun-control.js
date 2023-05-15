//define variables
const BACKGROUND = "#393532";
const BODY = "#89C06E";
const BODY_SHADOW = "#64925E";
const FONT = "Helvetica";
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);

//const socket = io('http://192.168.0.3:3001');
const socket = io('http://143.248.199.209:3001');
const minAngle = Math.PI / 4;
const maxAngle = 2 * Math.PI - minAngle;

let color = BODY;

socket.on('connect', (arg) => {
  console.log('connected');
});

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
  background(BACKGROUND);
  drawButton();
};

function drawButton(){
  noStroke();
  fill(color);
  rectMode(CENTER);
  rect(width / 2, height / 2, width - 2 * BORDER, height - 2 * BORDER);
}

function touchStarted(){
  color = BODY_SHADOW;
  socket.emit('fire');
}

function touchEnded(){
  color = BODY;
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};