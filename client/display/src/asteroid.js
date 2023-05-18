import { Subject } from "./Subject";
import { NUM_ASTEROID, ASTEROID_COLOR, BACKGROUND, MAX_VELOCITY } from "./constants";

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
                this.restartPosition();
                this.notifySubscribers('hit');
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
        if (src == "bulletPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.notifySubscribers('bulletHit', this.score);
                this.restartPosition();
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            }
        }
    }
}

class AsteroidGroup{
    constructor(w, h){
        this.asteroid = [];
        this.windowWidth = w;
        this.windowHeight = h;

        for (let i = 0; i < NUM_ASTEROID; i++){
            const partitionY = this.windowHeight / NUM_ASTEROID;
            const partitionX = this.windowWidth / NUM_ASTEROID;
            const posX = this.windowWidth + (Math.random() * NUM_ASTEROID) * partitionX;
            const posY = (Math.random() * NUM_ASTEROID) * partitionY;
            const newAsteroid = new Asteroid(posX, posY, w, h);
            this.asteroid.push(newAsteroid);
        }
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