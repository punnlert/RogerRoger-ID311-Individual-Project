//define variables
const BACKGROUND = "#393532";
const BODY = "#89C06E";
const BODY_SHADOW = "#64925E";
const FONT = "Helvetica";
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);

const socket = io('http://localhost:3001', {
  reconnection: false,
  autoConnect: false
});

const upperBound = BORDER + window.innerHeight / 20;
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;
let position = lowerBound;
let connect = false;
let input;
let button;

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
  const position = (mouseY < (2 * BORDER) + height / 20) ? (2 * BORDER) + height / 20 : 
                   (mouseY > height - (BORDER) - (height / 20)) ? (height - (BORDER) - (height / 20)) : 
                   mouseY;
  background(BACKGROUND);

  if (connect) {
    fill(BODY);
    ellipse(input.x + input.width + (BORDER / 2) + button.width + (BORDER / 2),
            input.y + input.height / 2, input.height / 2);
  }

  noStroke();
  fill(BODY);
  rectMode(CENTER);
  rect(width / 2, position, width - BORDER, height / 10);

  textSize(textSizeDisp);
  textFont(FONT);
  textAlign(CENTER, CENTER);
  fill(BODY_SHADOW);
  text("trajectory control", width / 2, position);
  
  socket.emit('vertical', [position - (2 * BORDER) - height / 20, height - (height / 10) - 3 * BORDER]);
};

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};