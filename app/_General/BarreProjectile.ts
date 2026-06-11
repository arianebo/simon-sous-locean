import { ObjetVisible } from "../ObjetVisible";

export class BarreProjectile extends ObjetVisible {
    constructor(laScene:createjs.Stage, posX:number, posY:number){
        super(laScene, posX, posY);
    }

    protected dessiner(): void {
        window.lib.ClipBarreProjectile.call(this);
		this.frameBounds = window.lib.ClipBarreProjectile.prototype.frameBounds;
        this.gotoAndStop('initial');
    }

    public monterProgression():void {
        this.gotoAndPlay('progression');
    }

    public arreterBarreProjectile():void {
        this.arreterObjVisible();
    }
}