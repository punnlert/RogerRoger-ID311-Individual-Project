import { BODY_SHADOW } from "./constants";

const velocity = 3;
let maxRadius;

class Stars{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.numStars = 30;
        this.maxRadius = (Math.max(this.width, this.height) / this.numStars) * 0.3;
        this.stars = [];
        this.velocity = 3;
    }

    generateStars(){
        for (let i = 0; i < this.numStars; i++){
            const positionX = (Math.random() * this.width);
            const positionY = (Math.random() * (this.height - 2 * this.maxRadius)) + this.maxRadius;
            const radius = Math.random() * this.maxRadius;
            const star = {
                x: positionX,
                y: positionY,
                r: radius
            }
            this.stars.push(star);
        }
    }

    moveStars(){
        this.stars.forEach((element) => {
            if (element.x > (- this.maxRadius)) {element.x -= this.velocity;} 
            else {
                element.x = this.maxRadius + this.width;
                element.y = (Math.random() * (this.height - 2 * this.maxRadius)) + this.maxRadius;
                element.r = Math.random() * this.maxRadius;
            }
        });
    }

    drawStars(){
        fill(BODY_SHADOW);
        this.stars.forEach((element) => {
            const { x, y, r} = element;
            ellipse(x, y, r, r);
        });
        this.moveStars();
    }

    changeWidth(width){
        this.width = width;
    }

    changeHeight(height){
        this.height = height;
    }

    changeVelocity(velocity){
        this.velocity = velocity;
    }
}

export {
    Stars
}