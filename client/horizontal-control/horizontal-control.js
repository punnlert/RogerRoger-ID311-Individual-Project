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

const minAngle = Math.PI / 4;
const maxAngle = 2 * Math.PI - minAngle;
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
  button = createButton('submit').position(input.x + input.width + BORDER / 2, BORDER).mousePressed(() => {
    socket.disconnect();
    socket.io.uri = `http://${input.value()}:3001`;
    socket.connect();
  })
}

function draw(){
  const textSizeDisp = height / 25;
  const radius = Math.min(height, width) / 1.5;
  const smallRadius = radius * 0.2;
  const positionRadius = (radius / 2) - (smallRadius / 1.5);

  background(BACKGROUND);

  if (connect) {
    fill(BODY);
    ellipse(input.x + input.width + (BORDER / 2) + button.width + (BORDER / 2),
            input.y + input.height / 2, input.height / 2);
  }

  textSize(textSizeDisp);
  textFont(FONT);
  textAlign(CENTER, CENTER);
  fill(BODY_SHADOW);
  text("acceleration", width / 2, (height / 2) - (radius / 2) - (textSizeDisp));

  noStroke();
  fill(BODY);
  ellipse(width / 2, height / 2, radius, radius);

  fill(BODY_SHADOW);
  push();
  angleMode(RADIANS);
  translate(width / 2, height / 2);
  const offsetMouseY = - mouseX + width / 2;
  const offsetMouseX = mouseY - height / 2;
  const xtan = Math.abs(offsetMouseX);
  const ytan = Math.abs(offsetMouseY);
  const arctan = Math.atan(ytan / xtan)
  const angle = (offsetMouseX < 0 && offsetMouseY > 0) ? (PI - arctan)
                : (offsetMouseX < 0 && offsetMouseY < 0) ? (PI + arctan)
                : (offsetMouseX > 0 && offsetMouseY < 0) ? (2 * PI - arctan)
                : (arctan);

  const limitAngle = (angle <= minAngle) ? (minAngle)
              :(angle >= maxAngle) ? (maxAngle)
              :(angle);
  
  ellipse(positionRadius * Math.sin(-limitAngle), positionRadius * Math.cos(-limitAngle), smallRadius, smallRadius);
  pop();

  const distance = ((limitAngle - minAngle) * positionRadius).toFixed(2);
  const distanceRange = ((maxAngle - minAngle) * positionRadius).toFixed(2);
  socket.emit('horizontal', [distance, distanceRange]);
};

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
};