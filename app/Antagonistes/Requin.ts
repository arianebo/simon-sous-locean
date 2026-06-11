import { Arbitre } from "../_General/Arbitre";
import { Compteur } from "../_General/Compteur";
import { Jeu } from "../Jeu";
import { Protagoniste } from "../Protagoniste/Protagoniste";
import { Antagoniste } from "./Antagoniste";

export class Requin extends Antagoniste {
    private nbTouches:number = 0;
    private refMinuterie:number = null;
    private detecterCollisions_lier:any = null;
    private refCompteur:Compteur = null;
    private nbPoints:number = null;
    private tPointsContact: Array<createjs.MovieClip> = null;

    constructor(laScene:createjs.Stage, leProtagoniste:Protagoniste, leJeu:Jeu, posX:number, posY:number, lArbitre:Arbitre, leCompteur:Compteur) {
        super(laScene, leProtagoniste, leJeu, posX, posY, lArbitre);
        this.detecterCollisions_lier = this.detecterCollisions.bind(this);
        this.vitesse = 3.5;
        this.nbPoints = 3;
        this.refCompteur = leCompteur;

        this.tPointsContact = new Array();
        this.tPointsContact[0] = this['clip_p1'];
        this.tPointsContact[1] = this['clip_p2'];
        this.tPointsContact[2] = this['clip_p3'];
        this.tPointsContact[3] = this['clip_p4'];
        this.tPointsContact[4] = this['clip_p5'];
        this.tPointsContact[5] = this['clip_p6'];

        this.addEventListener('tick', this.detecterCollisions_lier);
    }
    
    protected dessiner():void {
        window.lib.ClipRequin.call(this);
        this.frameBounds = window.lib.ClipRequin.prototype.frameBounds;
    }

    private detecterCollisions():void {
        this.refProjectile = this.refArbitre.donnerRefProjectile();
        let rectAntagoniste = this.getTransformedBounds();

        if(this.refProjectile != null) {
            let rectProjectile = this.refProjectile.getTransformedBounds();

            if(rectAntagoniste.intersects(rectProjectile) == true) {
                this.refJeu.supprimerProjectile();
                this.nbTouches ++;
                this.gotoAndStop('touche'+this.nbTouches);
                window.clearInterval(this.refMinuterie);
                this.refMinuterie = null;
                
                if(this.nbTouches >= 3) {
                    this.refCompteur.changerNbPoissons(this.nbPoints);
                    this.addEventListener('tick', this.sortirEcran.bind(this));
                }
            }
        }

        for(let i=0; i < this.tPointsContact.length; i++){
            let unPoint = this.tPointsContact[i];
            let positionDeMonPointDansProtagoniste: createjs.Point = unPoint.parent.localToLocal(unPoint.x, unPoint.y, this.refProtagoniste);
            // Vérifier la collision du point
            let collision = this.refProtagoniste.hitTest(positionDeMonPointDansProtagoniste.x, positionDeMonPointDansProtagoniste.y)
            if (collision == true) {
                if(this.refMinuterie2 == null) {
                    this.refMinuterie2 = window.setInterval(this.touche.bind(this), 1000);
                    this.refProtagoniste.touche();
                    this.nbVie = this.refArbitre.donnerVie();
                    this.refArbitre.garderVie(this.nbVie-1);
                }
            }
        }
    }

    public arreterRequin():void {
        this.removeEventListener('tick', this.detecterCollisions_lier);
        this.supprimerAntagoniste();
    }
}