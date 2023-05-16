import { BODY, BACKGROUND, LIVES_COLOR } from "./constants";
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

        if (this.bulletIsFire()) {this.drawBullet();}

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
        if (!this.bulletIsFire()){
            this.bullet = {
                x: this.x,
                y: this.y,
                w: this.width * 0.1,
                h: this.height / 10,
                v: this.windowWidth / 10,
                wMax: this.width,
                maxRange: (this.windowWidth / 4) + Math.random() * this.windowWidth / 2
            };
        }
    }

    bulletIsFire(){
        if (this.bullet) {return true;}
        return false;
    }

    drawBullet(){
        if (this.bulletIsFire()){
            const {x, y, w, h} = this.bullet;
    
            //make bullet
            noStroke();
            fill(LIVES_COLOR);
            rect(x, y, w, h / 2);
            rect(x, y - h / 2, w, h / 2);
    
            this.notifySubscribers('bulletPosition', x, y, w, h);
            this.moveBullet();
        }
    }

    moveBullet(){
        if (this.bulletIsFire()){
            const bullet = this.bullet;
            if (bullet.x <  this.x + bullet.maxRange) {
                bullet.w = (bullet.w**2 <= bullet.wMax) ? (bullet.w**2) : (bullet.wMax);
                bullet.x += bullet.v;
            } else {
                this.bullet = null;
            }
        }
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
        if (src == 'bulletHit') {
            this.bullet = null;
        }
    }
}

export {
    Rocket
}