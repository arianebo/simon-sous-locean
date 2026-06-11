import { ObjetVisible } from "../ObjetVisible";

export class Compteur extends ObjetVisible {
    private nbPoissons:number = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number) {
        super(laScene, posX, posY);

        if(window.localStorage.getItem('meilleurScore') == null) {
            window.localStorage.setItem('meilleurScore', '0');
        }
    }

    protected dessiner(): void {
        window.lib.ClipCompteur.call(this);
		this.frameBounds = window.lib.ClipCompteur.prototype.frameBounds;

        this.champ_texte.font = '30px Carter One';
        this.champ_texte.color = 'white';
    }

    public changerNbPoissons(nbPoints:number):void {
        this.nbPoissons = parseInt(this.champ_texte.text) + nbPoints;
        this.champ_texte.text = String(this.nbPoissons);
    }

    public arreterCompteur():void {
        let meilleurScore:number = parseInt(window.localStorage.getItem('meilleurScore'));
        window.localStorage.setItem('tonScore', String(this.nbPoissons))
        if(meilleurScore < this.nbPoissons) {
            window.localStorage.setItem('meilleurScore', String(this.nbPoissons));
        }
        this.arreterObjVisible();
    }
}