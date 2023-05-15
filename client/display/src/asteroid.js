class Asteroid{
    constructor(x, y, d){
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.velocity = 2;
        this.color = '#ae3737';
    }

    draw(){
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    move(){
        this.x -= this.velocity;
    }

    hitBox(x, y, w, h){
        return (this.x <= x + w / 2 
            || this.x + this.diameter >= x - w / 2
            || this.y <= y + h / 2
            || this.y + this.diameter <= y - h / 2);
    }

    update(src, ...other){
        if (src == "rocketPosition"){
            const [x, y, w, h] = other;
            // console.log(x, y, w, h);
            if (this.hitBox(x, y, w, h)){
                console.log('game over');
            }
            //make it disappear
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
        })
    }
}

export {
    AsteroidGroup
}