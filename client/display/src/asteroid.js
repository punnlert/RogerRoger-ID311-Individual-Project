import { Subject } from "./Subject";
import { NUM_ASTEROID } from "./constants";

class Asteroid extends Subject{
    constructor(x, y, w, h){
        super();
        this.x = x;
        this.y = y;
        this.windowWidth = w;
        this.windowHeight = h;
        this.diameter = Math.max(w, h) / NUM_ASTEROID;;
        this.velocity = 6;
        this.color = '#ae3737';
        this.hit = false;
    }

    draw(){
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.diameter);
    }

    move(){
        if (this.x + this.diameter / 2 < 0) {
            const partitionY = this.windowHeight / NUM_ASTEROID;
            const partitionX = this.windowWidth / NUM_ASTEROID;
            const posX = this.windowWidth + (Math.random() * NUM_ASTEROID) * partitionX;
            const posY = (Math.random() * NUM_ASTEROID) * partitionY;
            this.x = posX;
            this.y = posY;
            console.log(posX, posY);
        } else { this.x -= this.velocity; }
    }

    isHit(x, y, w, h){
        return (x + w / 2 > this.x - this.diameter / 2
                && x - w / 2 < this.x + this.diameter / 2
                && y + h / 2 > this.y - this.diameter / 2
                && y - h / 2 < this.y + this.diameter / 2);
    }

    update(src, ...other){
        if (src == "rocketPosition"){
            const [x, y, w, h] = other;

            if (this.isHit(x, y, w, h) && !this.hit){
                this.notifySubscribers('hit');
                this.hit = true;
            if (!this.isHit(x, y, w, h)) {this.hit = false}
            //make it disappear
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

    subscribeRocket(rocket){
        this.asteroid.forEach((elem) => {
            rocket.subscribe(elem);
            elem.subscribe(rocket);
        })
    }
}

export {
    AsteroidGroup
}