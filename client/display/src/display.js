import '../css/style.css';
import { BACKGROUND, BODY } from './constants';
import { Rocket } from './rocket';
import { Stars } from './background';
import { AsteroidGroup } from './asteroid';
import { ScoreDisplay } from './scoreboard';
import { io } from 'socket.io-client';
import { SpaceObjectFactory } from './asteroid';


import arcadeFont from '../data/ARCADE.otf';
import song from '../data/quin kiu (quinton sung) - OK Computer 8-bit - 03 Subterranean Homesick Alien (8-bit).mp3';

//define variables
const socket = io('http://localhost:3001');
const BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
const lowerBound = window.innerHeight - BORDER - window.innerHeight / 20;

//global variables for accessibility
let rocket;
let stars;
let score;
let themeSong;
let font;
let asteroidGroup;
let screenState;
let gameEnd;
let displayAstronaut;
let maxTextSize = 0.15 * Math.min(window.innerWidth, window.innerHeight);
let textSizeDisplay = 0.1 * maxTextSize;
let IPAddress = "loading...";
let highscore;

socket.on('connect', (arg) => {
  socket.emit('getIP');
  socket.on('IP-address', (data) => { 
    IPAddress = data; 
  });
});

//get previous highscore from the server
socket.on('data', (data) => {
  console.log(data);
  highscore = (data) ? (data) : 0;
})

function preload(){
  themeSong = loadSound(song);
  font = loadFont(arcadeFont)
}

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  gameEnd = false;
  rocket = new Rocket(width / 2, lowerBound, width, height);
  stars = new Stars(width, height);
  asteroidGroup = new AsteroidGroup(width, height);
  score = new ScoreDisplay(font);
  displayAstronaut = SpaceObjectFactory.createAstronaut(width, height);
  displayAstronaut.velocity = 0;
  displayAstronaut.x = width / 2;
  displayAstronaut.y = 1.8 * height / 3;
  asteroidGroup.subscribeEveryone(rocket, score);
  themeSong.play();
  themeSong.loop();
  stars.generateStars();
  screenState = 0;
  socket.emit('load-score');
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
    if (IPAddress == 'loading..'){
      text(`${IPAddress}`, width / 2, height / 2);
    } else {
      text(`please go to ${IPAddress}:5500`, width / 2, (height / 2) - maxTextSize / 2);
      text(`and type '${IPAddress}'`, width / 2, height / 2);
    }

    textSize(maxTextSize / 2);
    text("press space", width / 2, 3 * height / 4);
    
    displayAstronaut.draw();
    displayAstronaut.move();
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
      if (!gameEnd) {
        socket.emit('save-score', score.getScore());
        gameEnd = true;
      }
    } else {
      textSize(maxTextSize / 2);
      fill(BODY);
      text(`highscore: ${(highscore)}`, width / 2, height / 2);
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
      gameEnd = false;
      rocket = new Rocket(width / 2, lowerBound, width, height);
      stars = new Stars(width, height);
      asteroidGroup = new AsteroidGroup(width, height);
      score = new ScoreDisplay(font);
      asteroidGroup.subscribeEveryone(rocket, score);
      stars.generateStars();
      screenState = 0;
      themeSong.stop();
      themeSong.play();
      socket.emit('load-score');
    }
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  stars.changeDimension(width, height);
  rocket.changeDimension(width, height);
  score.changeDimension(width, height);
  asteroidGroup.changeDimension(width, height);

  maxTextSize = 0.15 * Math.min(window.innerWidth, window.innerHeight);
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