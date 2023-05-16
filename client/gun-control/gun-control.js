//define variables
const BACKGROUND = "#393532";
const BUTTON_OFF = '#ae3737';
const BUTTON_ON = '#912626';
const TEXT_OFF = "#7a1818";
const FONT = "Helvetica";
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);

//const socket = io('http://192.168.0.3:3001');
const socket = io('http://143.248.199.54:3001');
const minAngle = Math.PI / 4;
const maxAngle = 2 * Math.PI - minAngle;

let color = BUTTON_OFF;
let textColor = BUTTON_ON;

socket.on('connect', (arg) => {
  console.log('connected');
});

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){

  const textSizeDisp = height / 15;

  background(BACKGROUND);
  drawButton();

  textSize(textSizeDisp);
  textFont(FONT);
  textAlign(CENTER, CENTER);
  fill(textColor);
  text("fire", width / 2, height / 2);
};

function drawButton(){
  noStroke();
  fill(color);
  rectMode(CENTER);
  rect(width / 2, height / 2, width - 2 * BORDER, height - 2 * BORDER);
}

function touchStarted(){
  color = BUTTON_ON;
  textColor = TEXT_OFF;
  socket.emit('fire');
}

function touchEnded(){
  color = BUTTON_OFF;
  textColor = BUTTON_ON;
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};