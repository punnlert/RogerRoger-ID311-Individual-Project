import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { BACKGROUND } from './constants';
import { Rocket } from './rocket';
import { io } from 'socket.io-client';


//define variables
const socket = io('http://192.168.0.3:3001');
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const upperBound = BORDER + window.innerHeight / 20;
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;
let rocket;

socket.on('connect', (arg) => {
  console.log('connected');
});

sketch.setup = function(){
  createCanvas(window.innerWidth, window.innerHeight);
  rocket = new Rocket(width / 2, lowerBound, width, height);
}

sketch.draw= function(){
  background(BACKGROUND);
  rocket.draw();
}


sketch.windowResized = function(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

socket.on('vertical-display', function(data) {
  const y = data[0];
  const srcHeight = data[1];
  const yScaled = (y / srcHeight) * height;
  rocket.changeY(yScaled);
});

socket.on('horizontal-display', function(data) {
  const x = data[0];
  const srcWidth = data[1];
  const xScaled = (x / srcWidth) * (width - rocket.getWidth() - 2 * BORDER);
  rocket.changeX(xScaled + BORDER + rocket.getWidth() / 2);
})