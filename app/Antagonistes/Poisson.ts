import { Arbitre } from "../_General/Arbitre";
import { Compteur } from "../_General/Compteur";
import { Jeu } from "../Jeu";
import { Protagoniste } from "../Protagoniste/Protagoniste";
import { Antagoniste } from "./Antagoniste";

export class Poisson extends Antagoniste {
    private detecterCollisions_lier:any = null;
    private refCompteur:Compteur = null;
    protected nbPoints:number = null;
    private monPoint:createjs.MovieClip = null;

    constructor(laScene:createjs.Stage, leProtagoniste:Protagoniste, leJeu:Jeu, posX:number, posY:number, lArbitre:Arbitre, leCompteur:Compteur) {
        super(laScene, leProtagoniste, leJeu, posX, posY, lArbitre);
        this.refCompteur = leCompteur;
        this.detecterCollisions_lier = this.detecterCollisions.bind(this);
        this.vitesse = 5;
        this.nbPoints = 1;
        this.monPoint = this['clip_p1'];

        this.addEventListener('tick', this.detecterCollisions_lier);
    }

    protected dessiner():void {
        window.lib.ClipPoisson.call(this);
		this.frameBounds = window.lib.ClipPoisson.prototype.frameBounds;
    }

    private detecterCollisions():void {
        this.refProjectile = this.refArbitre.donnerRefProjectile();
        let rectAntagoniste = this.getTransformedBounds();

        if(this.refProjectile != null) {
            let rectProjectile = this.refProjectile.getTransformedBounds();

            if(rectAntagoniste.intersects(rectProjectile) == true) {
                this.gotoAndStop('touche');
                this.addEventListener('tick', this.sortirEcran.bind(this));
                this.refJeu.supprimerProjectile();
                this.refCompteur.changerNbPoissons(this.nbPoints);
            }
        }

        // Vérifier la collision du point
        if(this.monPoint.parent != null) {
            let positionDeMonPointDansObstacle: createjs.Point = this.monPoint.parent.localToLocal(this.monPoint.x, this.monPoint.y, this.refProtagoniste);
             let collision = this.refProtagoniste.hitTest(positionDeMonPointDansObstacle.x, positionDeMonPointDansObstacle.y)
             if (collision == true){
                if(this.refMinuterie2 == null) {
                    this.refMinuterie2 = window.setInterval(this.touche.bind(this), 1000);
                    this.refProtagoniste.touche();
                    this.nbVie = this.refArbitre.donnerVie();
                    this.refArbitre.garderVie(this.nbVie-1);
                }
            }
        }
    }

    public arreterPoisson():void {
        this.removeEventListener('tick', this.detecterCollisions_lier);
        this.supprimerAntagoniste();
    }
}