import Matter from './matter.js';
import settings from './settings.js';
import audio from './audio.js';

export default class Power {

    constructor(id, x, y) {
        this.body = Matter.Bodies.circle(x, y, 30, settings.POW_OPTIONS);
        this.body.power = this;
        this.options = settings.POWERS[id];
        this.body.render.sprite.texture = this.getTexture(this.options.icon);
        this.body.render.sprite.xScale = this.body.render.sprite.yScale = 0.5;
        Matter.Body.setAngularVelocity(this.body, ((Math.random()) * 2 - 1) * 0.05);
    }

    hit() {
        if(this.active) {
            audio.play('pop');
            this.action(); 
        }
        else {
            audio.play('beep');
            this.body.render.sprite.texture = this.getTexture(this.options.icon, 'green');
            this.active = true;
        }
    }

    action() {
        this.active = false;
        this.deathCount = 10;
    }

    getTexture(string, ringColor) {
        let tex = document.createElement('canvas');
        let size = 150;
        tex.width = tex.height = size;
        let ctx = tex.getContext('2d');
        ctx.fillStyle = 'lightblue';
        ctx.globalAlpha  = 0.5;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, 60, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = ringColor || 'white';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, 60, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.font = '50px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(string, size / 2, size / 2 + 5);
        return tex.toDataURL('image/png');
    }
}