import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";

export class Minuteur extends ObjetVisible {
    private refMinuterie:number = null;
    private diminuerMinuteur_lier:any = null;
    private temps:number = null;
    private refJeu:Jeu = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number, leJeu:Jeu) {
        super(laScene, posX, posY);
        this.diminuerMinuteur_lier = this.diminuerMinuteur.bind(this);
        this.temps = 60;
        this.refJeu = leJeu;

        this.champ_texte.text = String(this.temps) + 's';
        this.refMinuterie = window.setInterval(this.diminuerMinuteur_lier, 1000);
    }

    protected dessiner(): void {
        window.lib.ClipMinuteur.call(this);
		this.frameBounds = window.lib.ClipMinuteur.prototype.frameBounds;
        this.champ_texte.font = '30px Carter One';
        this.champ_texte.color = 'white';
    }

    private diminuerMinuteur():void {
        this.temps = parseInt(this.champ_texte.text);
        this.temps--;
        this.champ_texte.text = this.temps + 's';
        if(this.temps == 0) {
            this.refJeu.arreterJeu('reussi');
        }
    }

    public arreterMinuteur():void {
        window.clearInterval(this.refMinuterie);
        this.refMinuterie = null;
        this.temps = null;
        this.arreterObjVisible();
    }
}