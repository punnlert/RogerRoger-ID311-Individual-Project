import '../css/style.css';
import { BACKGROUND, BODY } from './constants';
import { Rocket } from './rocket';
import { Stars } from './background';
import { AsteroidGroup } from './asteroid';
import { ScoreDisplay } from './scoreboard';
import { io } from 'socket.io-client';


import arcadeFont from '../data/ARCADE.otf';
import song from '../data/quin kiu (quinton sung) - OK Computer 8-bit - 03 Subterranean Homesick Alien (8-bit).mp3';

//define variables
//const socket = io('http://192.168.0.3:3001');
const socket = io('http://localhost:3001');
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;
let rocket;
let stars;
let score;
let themeSong;
let font;
let asteroidGroup;
let screenState;
let maxTextSize = 0.15 * Math.min(window.innerWidth, window.innerHeight);
let textSizeDisplay = 0.1 * maxTextSize;
let IPAddress = "loading..";
let highscore;

socket.on('connect', (arg) => {
  socket.emit('getIP');
  socket.on('IP-address', (data) => { 
    IPAddress = data; 
  });
});

function preload(){
  themeSong = loadSound(song);
  font = loadFont(arcadeFont)
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  rocket = new Rocket(width / 2, lowerBound, width, height);
  stars = new Stars(width, height);
  asteroidGroup = new AsteroidGroup(width, height);
  score = new ScoreDisplay(font);
  asteroidGroup.subscribeEveryone(rocket, score);
  // themeSong.play();
  // themeSong.loop();
  stars.generateStars();
  screenState = 0;
  socket.emit('load-score', (data) => {
    try {
      highscore = data.score;
    } catch (error) {
      highscore = 0;
    }
  });
}

function draw(){
  background(BACKGROUND);
  stars.drawStars();

  if (screenState == 0){
    textFont(font);
    textSize(maxTextSize);
    textAlign(CENTER, CENTER);
    fill(BODY);
    text("ROGER, ROGER", width / 2, height / 4);

    textSize(maxTextSize / 3);
    text(`${IPAddress}`, width / 2, height / 2);

    textSize(maxTextSize / 2);
    text("press space", width / 2, 3 * height / 4);
  }
  if (screenState == 1){
    rocket.draw();
    asteroidGroup.draw();
    score.draw();
    if (score.getLive() == 0){
      screenState = 2;
    }
  }
  if (screenState == 2){
    textFont(font);
    textSize(textSizeDisplay);
    textAlign(CENTER, CENTER);
    fill(BODY);
    text("GAME OVER", width / 2, height / 4);
    animateTextSize();

    if (score.getScore() > highscore){
      textSize(maxTextSize / 2);
      fill(BODY);
      text(`score: ${score.getScore()}`, width / 2, height / 2);
      text(`new highscore!`, width / 2, 3 * height / 4);
      socket.emit('save-score', {score: score.getScore()});
    } else {
      textSize(maxTextSize / 2);
      fill(BODY);
      text(`highscore: ${highscore}`, width / 2, height / 2);
      text(`score: ${score.getScore()}`, width / 2, 3 * height / 4);
    }

  }
}

//debugging purposes
function keyPressed(){
  if (screenState == 0){
    if (key == ' '){
      screenState = 1;
    }
  }

  if (screenState == 2){
    if (key == ' '){
      rocket = new Rocket(width / 2, lowerBound, width, height);
      stars = new Stars(width, height);
      asteroidGroup = new AsteroidGroup(width, height);
      score = new ScoreDisplay(font);
      asteroidGroup.subscribeEveryone(rocket, score);
      stars.generateStars();
      screenState = 0;
    }
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  stars.changeDimension(width, height);
  rocket.changeDimension(width, height);
  score.changeDimension(width, height);
  asteroidGroup.changeDimension(width, height);
}

function animateTextSize(){
  textSizeDisplay = (1.1 * textSizeDisplay < maxTextSize) ? (1.1 * textSizeDisplay) : maxTextSize;
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
  rocket.fire();
})

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.keyPressed = keyPressed;