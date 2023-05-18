import { Subject } from "./Subject";
import { NUM_ASTEROID, ASTEROID_COLOR, BACKGROUND, MAX_VELOCITY, LIVES_COLOR } from "./constants";
import explosion from '../data/mixkit-arcade-game-explosion-2759.wav';
import astronaut from "../data/jsconfig.png";
import scream from "../data/Tom and Jerry scream sound effect [TubeRipper.com].mp3"

class Asteroid extends Subject{
    constructor(x, y, w, h){
        super();
        this.x = x;
        this.y = y;
        this.windowWidth = w;
        this.windowHeight = h;
        this.diameter = Math.max(w, h) / (NUM_ASTEROID) + (Math.random() * Math.max(w, h) / (NUM_ASTEROID));
        this.score =  (this.diameter / (Math.max(w, h) / (NUM_ASTEROID))) * 10;
        this.maxVelocity = this.windowWidth * 0.005;
        this.velocity = (this.maxVelocity / 2) + (Math.random() * this.maxVelocity / 2);
        this.color = ASTEROID_COLOR;
        this.hit = false;
        loadSound(explosion, (sound) => {
            this.explosionSound = sound;
        });
    }

    draw(){
        stroke(BACKGROUND);
        strokeWeight(10);
        fill(this.color);
        ellipse(this.x, this.y, this.diameter);
    }

    move(){
        if (this.x + this.diameter / 2 < 0) {
            this.restartPosition();
        } else { this.x -= this.velocity; }
    }

    changeVelocity(delta){
        this.maxVelocity = this.maxVelocity * ( 1 + delta / 5);
    }

    restartPosition(){
        const partitionY = this.windowHeight / NUM_ASTEROID;
        const partitionX = this.windowWidth / NUM_ASTEROID;
        const posX = this.windowWidth + this.diameter + (Math.random() * NUM_ASTEROID) * partitionX;
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;

        this.diameter = Math.max(this.windowWidth, this.windowHeight) / (NUM_ASTEROID) + (Math.random() * Math.max(this.windowWidth, this.windowHeight) / (NUM_ASTEROID));
        this.velocity = (this.maxVelocity / 2) + (Math.random() * this.maxVelocity / 2);
        this.score =  (this.diameter / (Math.max(this.windowWidth, this.windowHeight) / (NUM_ASTEROID))) * 10;
        this.x = posX;
        this.y = posY;
    }

    isHit(x, y, w, h){
        return (x + w / 2 > this.x - this.diameter / 2
                && x - w / 2 < this.x + this.diameter / 2
                && y + h / 2 > this.y - this.diameter / 2
                && y - h / 2 < this.y + this.diameter / 2);
    }

    changeDimension(w, h){
        this.windowWidth = w;
        this.windowHeight = h;
    }

    update(src, ...other){
        if (src == "rocketPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.explosionSound.play();
                this.restartPosition();
                this.notifySubscribers('hit');
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
        if (src == "bulletPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.explosionSound.play();
                this.notifySubscribers('bulletHit', this.score);
                this.restartPosition();
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
    }
}

class Lives extends Asteroid {
    constructor(x, y, w, h){
        super(x, y, w, h);
        this.diameter = this.windowWidth * 0.02;
        this.color = LIVES_COLOR;
    }

    restartPosition(){
        const partitionY = this.windowHeight / NUM_ASTEROID;
        const posX = this.windowWidth + (Math.random() * 3 * this.windowWidth);
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;

        this.velocity = (this.maxVelocity / 2) + (Math.random() * this.maxVelocity / 2);
        this.x = posX;
        this.y = posY;
    }

    update(src, ...other){
        if (src == "rocketPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.restartPosition();
                this.notifySubscribers('getLive');
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
        if (src == "bulletPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.restartPosition();
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
    }
}

class Astronauts extends Asteroid{
    constructor(x, y, w, h){
        super(x, y, w, h)
        this.width = this.windowWidth * 0.08;
        this.img = loadImage(astronaut, (img) => {
            this.img = img
            this.height = (this.img.height / this.img.width) * this.width
        });
        loadSound(scream, (sound) => {
            this.scream = sound;
        })

        this.score = 100;
    }

    draw(){
        image(this.img, this.x, this.y, this.width, this.height);
    }

    isHit(x, y, w, h){
        return (x + w / 2 > this.x
                && x - w / 2 < this.x + this.width
                && y + h / 2 > this.y
                && y - h / 2 < this.y + this.height);
    }

    restartPosition(){
        const partitionY = this.windowHeight / NUM_ASTEROID;
        const posX = this.windowWidth + (Math.random() * 5 * this.windowWidth);
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;

        this.velocity = (this.maxVelocity / 2) + (Math.random() * this.maxVelocity / 2);
        this.x = posX;
        this.y = posY;
    }

    update(src, ...other){
        if (src == "rocketPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.restartPosition();
                this.notifySubscribers('bulletHit', this.score / 2);
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
        if (src == "bulletPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h)){
                this.scream.play();
                this.x += this.width;
                this.notifySubscribers('bulletHit', -this.score);
            }
        }
    }
}

class SpaceObjectFactory {
    static createAsteroid(w, h){
        const partitionY = h / NUM_ASTEROID;
        const partitionX = w / NUM_ASTEROID;
        const posX = w + (Math.random() * NUM_ASTEROID) * partitionX;
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;
        return new Asteroid(posX, posY, w, h);
    }

    static createLive(w, h){
        const partitionY = h / NUM_ASTEROID;
        const posX = w + (Math.random() * 4 * w);
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;
        return new Lives(posX, posY, w, h);
    }

    static createAstronaut(w, h){
        const partitionY = h / NUM_ASTEROID;
        const posX = w + (Math.random() * 4 * w);
        const posY = (Math.random() * NUM_ASTEROID) * partitionY;
        return new Astronauts(posX, posY, w, h);
    }
}

class AsteroidGroup{
    constructor(w, h){
        this.asteroid = [];
        this.windowWidth = w;
        this.windowHeight = h;

        //make asteroid
        for (let i = 0; i < NUM_ASTEROID; i++){
            const newAsteroid = SpaceObjectFactory.createAsteroid(w, h);
            this.asteroid.push(newAsteroid);
        }

        //make live
        const newLive = SpaceObjectFactory.createLive(w, h);
        this.asteroid.push(newLive);

        //make astronauts
        const newAstronaut = SpaceObjectFactory.createAstronaut(w, h);
        this.asteroid.push(newAstronaut);
    }

    draw(){
        this.asteroid.forEach((elem) => {
            elem.draw();
            elem.move();
        });
    }

    changeVelocity(delta){
        this.asteroid.forEach((elem) => {
            elem.changeVelocity(delta);
        })
    }

    subscribeEveryone(rocket, scoreboard){
        this.asteroid.forEach((elem) => {
            rocket.subscribe(elem);
            elem.subscribe(rocket);
            elem.subscribe(scoreboard);
        })
        scoreboard.subscribe(this);
    }

    changeDimension(w, h){
        this.asteroid.forEach((elem) => {
            elem.changeDimension(w, h);
        })
    }

    update(src, ...other){
        if (src == 'stateChange') {
            const [deltaVel] = other; 
            this.changeVelocity(0.5);
        } 
    }
}

export {
    AsteroidGroup
}