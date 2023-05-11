import { BODY, BACKGROUND, FONT } from "./constants";
class Button{
    constructor(x, y, w, h, text){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = BODY;
        this.text = text;
        this.textSize = Math.min(this.height, this.width) / 10;
    }

    draw() {
        const textX = this.x + (this.width / 2);
        const textY = this.y + (this.height / 2);

        rectMode(CORNER);
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        textSize(this.textSize);
        textFont(FONT);
        textAlign(CENTER, CENTER);
        textFont(FONT);
        fill(BACKGROUND);
        text(this.text, textX, textY);
    }

    isInside(x, y){
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }
}

export {
    Button,
}