import { ObjetVisible } from "../ObjetVisible";

export class PanneauIntro extends ObjetVisible {
    constructor(laScene:createjs.Stage, posX:number, posY:number){
        super(laScene, posX, posY);

        if(window.localStorage.getItem('meilleurScore') != null) {
            this.champ_texte.text = window.localStorage.getItem('meilleurScore');
        }
    }

    protected dessiner(): void {
        window.lib.ClipPanneauIntro.call(this);
		this.frameBounds = window.lib.ClipPanneauIntro.prototype.frameBounds;
    }

    public arreterPanneauIntro():void {
        this.arreterObjVisible();
    }
}