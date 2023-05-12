//define variables
const BACKGROUND = "#393532";
const BODY = "#89C06E";
const BODY_SHADOW = "#64925E";
const FONT = "Helvetica";

//const socket = io('http://192.168.0.3:3001');
const socket = io('http://143.248.199.209:3001');
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const upperBound = BORDER + window.innerHeight / 20;
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;
let position = lowerBound;

socket.on('connect', (arg) => {
  console.log('connected');
});

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
  const textSizeDisp = height / 15;
  const position = mouseY;
  background(BACKGROUND);

  noStroke();
  fill(BODY);
  rectMode(CENTER);
  rect(width / 2, position, width - BORDER, height / 10);

  textSize(textSizeDisp);
  textFont(FONT);
  textAlign(CENTER, CENTER);
  fill(BODY_SHADOW);
  text("trajectory control", width / 2, position);

  socket.emit('vertical', [position, height]);
};

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};


