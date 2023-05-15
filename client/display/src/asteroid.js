import { Subject } from "./Subject";

class Asteroid extends Subject{
    constructor(x, y, d){
        super();
        this.x = x;
        this.y = y;
        this.diameter = d;
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
        this.x -= this.velocity;
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
            if (!this.isHit(x, y, w, h)) {this.hit =false}
            //make it disappear
            }
        }
    }
}

class AsteroidGroup{
    constructor(w, h){
        this.asteroid = [];
        this.numAsteroid = 10;
        this.windowWidth = w;
        this.windowHeight = h;
        this.maxAsteroidDiameter = Math.max(w, h) / this.numAsteroid;

        for (let i = 0; i < this.numAsteroid; i++){
            const partitionY = this.windowHeight / this.numAsteroid;
            const partitionX = this.windowWidth / this.numAsteroid;
            const posX = this.windowWidth + (Math.random() * this.numAsteroid) * partitionX;
            const posY = (Math.random() * this.numAsteroid) * partitionY;
            const newAsteroid = new Asteroid(posX, posY, this.maxAsteroidDiameter);
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