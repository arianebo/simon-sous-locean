import { Fond } from "./Fond";

export class FondDefilant extends Fond {
    private defilerFond_lier:any = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number) {
        super(laScene, posX, posY);
        this.defilerFond_lier = this.defilerFond.bind(this);

        this.addEventListener('tick', this.defilerFond_lier);
    }

    protected dessiner(): void {
        window.lib.ClipFondDefilant.call(this);
		this.frameBounds = window.lib.ClipFondDefilant.prototype.frameBounds;
    }

    private defilerFond():void {
        this.clipFond1.x -= 1.5;
        this.clipFond2.x -= 1.5;

        if(this.clipFond1.x <= -1600) {
            this.clipFond1.x = 1599;
        }

        if(this.clipFond2.x <= -1600) {
            this.clipFond2.x = 1599;
        }
    }

    public arreterFondDefilant():void {
        this.removeEventListener('tick', this.defilerFond_lier);
        this.arreterObjVisible();
    }
}