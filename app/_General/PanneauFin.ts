import { ObjetVisible } from "../ObjetVisible";

export class PanneauFin extends ObjetVisible {
    constructor(laScene:createjs.Stage, posX:number, posY:number, typePanneau:string) {
        super(laScene, posX, posY);

        this.gotoAndStop(typePanneau);
        if(typePanneau == 'reussi') {
            this.texte_tonScore.text = window.localStorage.getItem('tonScore');
            this.texte_meilleurScore.text = window.localStorage.getItem('meilleurScore');
        }
    }

    protected dessiner(): void {
        window.lib.ClipPanneauFin.call(this);
		this.frameBounds = window.lib.ClipPanneauFin.prototype.frameBounds;
    }

    public arreterPanneauFin():void {
        this.arreterObjVisible();
    }
}