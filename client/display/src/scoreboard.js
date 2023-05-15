import { LIVES, FONT, BODY, LIVES_COLOR} from "./constants";

class ScoreDisplay{
    constructor(){
        this.live = LIVES;
        this.score = 0;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.BORDER = 0.05 * Math.min(window.innerWidth, window.innerHeight);
        this.fontSize = this.BORDER;
        this.livesDiameter = this.BORDER / 2;
    }

    draw(){
        noStroke();

        const display = `score: ${this.score}`
        textFont(FONT);
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

    update(src, ...other){
        if (src == 'hit'){
            this.reduceLive();
        }
    }
}

export {
    ScoreDisplay,
}