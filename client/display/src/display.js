import '../css/style.css';
import { BACKGROUND } from './constants';
import { Rocket } from './rocket';
import { Stars } from './background';
import { AsteroidGroup } from './asteroid';
import { ScoreDisplay } from './scoreboard';
import { io } from 'socket.io-client';

import song from '../data/quin kiu (quinton sung) - OK Computer 8-bit - 03 Subterranean Homesick Alien (8-bit).mp3';

//define variables
//const socket = io('http://192.168.0.3:3001');
const socket = io('http://143.248.199.54:3001');
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;
let rocket;
let stars;
let score;
let themeSong;
let asteroidGroup;

socket.on('connect', (arg) => {
  console.log('connected');
});

function preload(){
  themeSong = loadSound(song);
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  rocket = new Rocket(width / 2, lowerBound, width, height);
  stars = new Stars(width, height);
  asteroidGroup = new AsteroidGroup(width, height);
  score = new ScoreDisplay();
  asteroidGroup.subscribeEveryone(rocket, score);
  // themeSong.play();
  // themeSong.loop();
  stars.generateStars();
}

function draw(){
  background(BACKGROUND);
  stars.drawStars();
  rocket.draw();
  asteroidGroup.draw();
  score.draw();
}

//debugging purposes
function keyPressed(){
  if (key == ' '){
    noLoop();
  }
  if (key == 'p'){
    loop();
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  stars.changeDimension(width, height)
  rocket.changeDimension(width, height);
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

socket.on('shotFired', (data) => {
  console.log('fired');
})

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.keyPressed = keyPressed;