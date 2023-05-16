import { LIVES, BODY, LIVES_COLOR} from "./constants";
import { Subject } from "./Subject";

class ScoreDisplay extends Subject{
    constructor(font){
        super();
        this.live = LIVES;
        this.score = 0;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
        this.fontSize = 2 * this.BORDER;
        this.font = font;
        this.livesDiameter = this.BORDER / 2;
        this.stage = 0;
    }

    draw(){
        noStroke();

        const display = `${this.score}`
        textFont(this.font);
        textSize(this.fontSize);
        textAlign(LEFT, TOP);
        fill(BODY);
        text(display, 0 + this.BORDER, 0 + this.BORDER);

        
        for (let live = 0; live < this.live; live ++){
            fill(LIVES_COLOR);
            ellipse(this.windowWidth - (this.BORDER + (this.livesDiameter / 2) + live * (3 / 2) * this.livesDiameter),
                    0 + this.BORDER + this.livesDiameter,
                    this.livesDiameter)
        }
    }

    reduceLive(){
        this.live = (this.live > 0) ? (this.live - 1) : 0; 
    }

    getLive(){
        return this.live;
    }

    addScore(score){
        this.score += Math.floor(score);
        if (Math.floor(this.score / 100) > this.stage){
            this.stage++;
            this.notifySubscribers('stateChange', this.stage);
        }
    }

    getScore(){
        return this.score;
    }

    update(src, ...other){
        if (src == 'hit'){
            this.reduceLive();
        }
        if (src == 'bulletHit'){
            const [ score ] = other;
            this.addScore(Math.floor(score));
        }
    }

    changeDimension(w, h){
        this.windowWidth = w;
        this.windowHeight = h;
    }
}

export {
    ScoreDisplay,
}