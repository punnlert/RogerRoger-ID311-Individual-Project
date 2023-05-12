class Bullet{
    constructor(width, height){
        this.bullets = [];
        this.bulletLength = width / 10;
        this.bulletHeight = height / 20;
        this.bulletSpeed = 10;
        this.color = "#e55d4d";
    }

    fire(posX, posY){
        const bulletLength = width / 20;
        const bullet = {
            x: posX,
            y: posY,
            l: bulletLength,
            h: this.bulletHeight
        }
        this.bullets.push(bullet);
    }

    moveBullet(){
        this.bullets.forEach((elem) => {
            
        })
    }
}