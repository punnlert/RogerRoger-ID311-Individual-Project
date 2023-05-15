import { BODY_SHADOW } from "./constants";

class Stars{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.numStars = 100;
        this.maxRadius = (Math.max(this.width, this.height) / this.numStars) * 0.5;
        this.stars = [];
        this.velocity = 4;
        this.relativeVelocity = this.velocity / this.maxRadius;
    }

    generateStars(){
        for (let i = 0; i < this.numStars; i++){
            const positionX = (Math.random() * this.width);
            const positionY = (Math.random() * (this.height + 2 * this.maxRadius)) - this.maxRadius;
            const radius = (this.maxRadius / 2) + Math.random() * (this.maxRadius / 2);
            const velocity = radius * this.relativeVelocity;
            const star = {
                x: positionX,
                y: positionY,
                r: radius,
                v: velocity
            }
            this.stars.push(star);
        }
    }

    moveStars(){
        this.stars.forEach((element) => {
            if (element.x > (- this.maxRadius)) {element.x -= element.v;} 
            else {
                element.x = this.maxRadius + this.width;
                element.y = (Math.random() * (this.height - 2 * this.maxRadius)) + this.maxRadius;
                element.r = (this.maxRadius / 2) + Math.random() * (this.maxRadius / 2);
                element.v = element.r * this.relativeVelocity;
            }
        });
    }

    drawStars(){
        noStroke();
        fill(BODY_SHADOW);
        this.stars.forEach((element) => {
            const { x, y, r} = element;
            ellipse(x, y, r);
        });
        this.moveStars();
    }

    changeDimension(width, height){
        this.width = width;
        this.height = height;
        this.maxRadius = (Math.max(this.width, this.height) / this.numStars) * 0.2;
    }

    changeVelocity(velocity){
        this.velocity = velocity;
    }
}

export {
    Stars
}