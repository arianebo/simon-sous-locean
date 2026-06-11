import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";

export class Bouton extends ObjetVisible {
    private refJeu:Jeu = null;

    public constructor(refScene:createjs.Stage, leJeu:Jeu, posX:number, posY:number, typeBtn:string) {
        super(refScene, posX, posY);
        this.refJeu = leJeu;

        this.champ_texte.text = typeBtn;

        this.addEventListener('click', this.demarrerJeu.bind(this));
    }

    protected dessiner():void {
        window.lib.ClipDebuter.call(this);
		this.frameBounds = window.lib.ClipDebuter.prototype.frameBounds;

        this.champ_texte.font = '26px Carter One';
    }

    private demarrerJeu():void {
        this.refJeu.demarrer();
        this.supprimerBtn();
    }

    private supprimerBtn():void {
        this.arreterObjVisible();
    }
}