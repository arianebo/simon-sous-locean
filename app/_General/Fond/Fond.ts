import { ObjetVisible } from "../../ObjetVisible";

export class Fond extends ObjetVisible {
    constructor(laScene:createjs.Stage, posX:number, posY:number){
        super(laScene, posX, posY);
    }

    protected dessiner(): void {
        window.lib.ClipFond.call(this);
		this.frameBounds = window.lib.ClipFond.prototype.frameBounds;
    }

    public arreterFond():void {
        this.arreterObjVisible();
    }
}