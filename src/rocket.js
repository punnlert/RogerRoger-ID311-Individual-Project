import { BODY, BACKGROUND } from "./constants";

class Rocket {
    constructor(x, y, w, h){
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
}

export {
    Rocket
}