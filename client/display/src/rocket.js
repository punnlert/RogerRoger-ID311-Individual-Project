import { BODY, BACKGROUND } from "./constants";
import { Subject } from "./Subject";

class Rocket extends Subject{
    constructor(x, y, w, h){
        super();
        this.x = x;
        this.y = y;
        this.width = w / 10;
        this.height = h / 15;
    }

    draw(){
        noStroke();
        fill(BODY);
        beginShape();
        vertex(this.x - this.width / 2, this.y - this.height / 2);
        vertex(this.x - this.width / 3, this.y - this.height / 4);
        vertex(this.x + this.width / 5, this.y - this.height / 4);
        vertex(this.x + this.width / 2, this.y);
        vertex(this.x + this.width / 5, this.y + this.height / 4);
        vertex(this.x - this.width / 3, this.y + this.height / 4);
        vertex(this.x - this.width / 2, this.y + this.height / 2);
        endShape();

        this.notifySubscribers('rocketPosition', this.x, this.y, this.width, this.height);
    }

    changeY(y){
        this.y = y;
    }

    changeX(x){
        this.x = x;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }

    getLives(){
        return this.lives;
    }

    changeDimension(w, h){
        this.width = w / 10;
        this.height = h / 15;
        this.x = w / 2;
        console.log('change');
    }

    update(src, ...other){
        if (src == 'hit'){
            console.log('hit');
        }
    }
}

export {
    Rocket
}