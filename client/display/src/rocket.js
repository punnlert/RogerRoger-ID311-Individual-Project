import { BODY, BACKGROUND } from "./constants";
import { Subject } from "./Subject";

class Rocket extends Subject{
    constructor(x, y, w, h){
        super();
        this.x = x;
        this.y = y;
        this.windowWidth = w;
        this.windowHeight = h;
        this.width = w / 10;
        this.height = h / 15;
        this.bullet = null;
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

    fire(){
        this.bullet = {
            x: this.x,
            y: this.y,
            w: this.width,
            h: this.height / 5,
            v: this.windowWidth / 10
        };
    }

    drawBullet(){
        const bullet = this.bullet;
        const x = bullet.x;
        const y = bullet.y;
        const w = bullet.w;
        const h = bullet.h;

        //make bullet

    }

    changeDimension(w, h){
        this.width = w / 10;
        this.height = h / 15;
        this.x = w / 2;
    }

    update(src, ...other){
        if (src == 'hit'){
            const BORDER = 0.05 * Math.min(this.windowWidth, this.windowHeight);
            this.x = (this.x - this.width > BORDER) ? (this.x - this.width) : (BORDER + this.width / 2);
        }
    }
}

export {
    Rocket
}