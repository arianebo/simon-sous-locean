import { Arbitre } from "../_General/Arbitre";
import { Compteur } from "../_General/Compteur";
import { Jeu } from "../Jeu";
import { Protagoniste } from "../Protagoniste/Protagoniste";
import { Poisson } from "./Poisson";

export class PoissonAnge extends Poisson {
    constructor(laScene:createjs.Stage, leProtagoniste:Protagoniste, leJeu:Jeu, posX:number, posY:number, lArbitre:Arbitre, leCompteur:Compteur) {
        super(laScene, leProtagoniste, leJeu, posX, posY, lArbitre, leCompteur);

        this.nbPoints = 2;
        this.vitesse = 15;
    }

    protected dessiner():void {
        window.lib.ClipPoissonAnge.call(this);
        this.frameBounds = window.lib.ClipPoissonAnge.prototype.frameBounds;
    }

    public arreterPoissonAnge():void {
        this.arreterPoisson();
    }
}