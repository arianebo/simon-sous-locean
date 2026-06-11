import { Arbitre } from "../_General/Arbitre";
import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";
import { Projectile } from "../Protagoniste/Projectile";
import { Protagoniste } from "../Protagoniste/Protagoniste";

export abstract class Antagoniste extends ObjetVisible {
    protected refProtagoniste:Protagoniste = null;
    protected refJeu:Jeu = null;
    protected refArbitre:Arbitre = null;
    protected refProjectile:Projectile = null;
    protected vitesse:number = null;
    private bouger_lier:any = null;
    protected nbVie:number = null;
    protected refMinuterie2:number = null;
    private refAntagoniste:Antagoniste = null;

    constructor(laScene:createjs.Stage, leProtagoniste:Protagoniste, leJeu:Jeu, posX:number, posY:number, lArbitre:Arbitre) {
        super(laScene, posX, posY);
        this.refProtagoniste = leProtagoniste;
        this.refJeu = leJeu;
        this.refArbitre = lArbitre;
        this.bouger_lier = this.bouger.bind(this);
        this.refAntagoniste = this;

        this.addEventListener('tick', this.bouger_lier);
    }

    private bouger():void {
        this.x -= this.vitesse;

        if(this.x <= -200) {
            this.refJeu.supprimerAntagoniste(this);
        }
    }

    protected touche():void {
        window.clearInterval(this.refMinuterie2);
        this.refMinuterie2 = null;
    }

    protected sortirEcran():void {
        this.y -= 10;
        if(this.y <= -100) {
            this.arreterAntagoniste();
        }
        this.retirerEcouteurs();
    }

    protected arreterAntagoniste():void {
        this.refJeu.supprimerAntagoniste(this.refAntagoniste);
    }

    protected retirerEcouteurs():void {
        this.removeEventListener('tick', this.bouger_lier);
    }

    public supprimerAntagoniste():void {
        this.retirerEcouteurs();
        this.arreterObjVisible();
    }
}