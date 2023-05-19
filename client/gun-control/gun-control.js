//define variables
const BACKGROUND = "#393532";
const BUTTON_OFF = '#ae3737';
const BUTTON_ON = '#912626';
const BODY = "#89C06E";
const TEXT_OFF = "#7a1818";
const FONT = "Helvetica";
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const COOLDOWN = 2000;

let cooldownDone = true;

const socket = io('http://localhost:3001', {
  reconnection: false,
  autoConnect: false
});

// let socket = io();
const minAngle = Math.PI / 4;
const maxAngle = 2 * Math.PI - minAngle;

let color = BUTTON_OFF;
let textColor = BUTTON_ON;
let input;
let button;
let connect = false;

socket.on('connect', (arg) => {
  connect = true;
});

socket.on('disconnect', (arg) => {
  connect = false;
})

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  input = createInput().position(BORDER, BORDER);
  button = createButton('connect').position(input.x + input.width + BORDER / 2, BORDER).mousePressed(() => {
    socket.disconnect();
    socket.io.uri = `http://${input.value()}:3001`;
    socket.connect();
  })
}

function draw(){
  const textSizeDisp = height / 15;

  background(BACKGROUND);
  drawButton();

  if (connect) {
    fill(BODY);
    ellipse(input.x + input.width + (BORDER / 2) + button.width + (BORDER / 2),
            input.y + input.height / 2, input.height / 2);
  }

  textSize(textSizeDisp);
  textFont(FONT);
  textAlign(CENTER, CENTER);
  fill(textColor);
  text("fire", width / 2, height / 2);
};

function drawButton(){
  noStroke();
  fill(color);
  rectMode(CORNER);
  rect(BORDER, 2 * BORDER, width - 2 * BORDER, height - 3 * BORDER);
}

function touchStarted(){
  if (mouseX < width - BORDER && mouseX > BORDER && mouseY < height - BORDER && mouseY > 2 * BORDER && cooldownDone){
    cooldownDone = false;
    color = BUTTON_ON;
    textColor = TEXT_OFF;
    socket.emit('fire');
    setTimeout(() => {
      color = BUTTON_OFF;
      textColor = BUTTON_ON;
      cooldownDone = true
    }, COOLDOWN);
  }
}

function touchEnded(){
  if (cooldownDone){
    color = BUTTON_OFF;
    textColor = BUTTON_ON;
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};