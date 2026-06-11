import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";
import { Arbitre } from "./Arbitre";

export class Vie extends ObjetVisible {
    private nbVie:number = 3;
    private refArbitre:Arbitre = null;
    private refJeu:Jeu = null;
    private changerVie_lier:any = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number, lArbitre:Arbitre, leJeu:Jeu) {
        super(laScene, posX, posY);
        this.refArbitre = lArbitre;
        this.refJeu = leJeu;
        this.changerVie_lier = this.changerVie.bind(this);

        this.refArbitre.garderVie(this.nbVie);

        this.addEventListener('tick', this.changerVie_lier);
    }

    protected dessiner():void {
        window.lib.ClipVie.call(this);
		this.frameBounds = window.lib.ClipVie.prototype.frameBounds;
    }
    
    private changerVie():void {
        this.nbVie = this.refArbitre.donnerVie();
        if(this.nbVie < 3) {
            this.gotoAndStop('touche'+this.nbVie);
        }

        if(this.nbVie == 0) {
            this.refJeu.animationMort();
        }
    }

    public arreterVie():void {
        this.removeEventListener('tick', this.changerVie_lier);
        this.arreterObjVisible();
    }
}