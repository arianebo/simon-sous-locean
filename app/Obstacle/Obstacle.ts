import { Arbitre } from "../_General/Arbitre";
import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";
import { Protagoniste } from "../Protagoniste/Protagoniste";

export class Obstacle extends ObjetVisible {
    private numObstacle:number = null;
    private assignerNumero_lier:any = null;
    private bouger_lier:any = null;
    private refJeu:Jeu = null;
    private refProtagoniste:Protagoniste = null;
    private refArbitre:Arbitre = null;
    private nbVie:number = null;
    private detecterCollision_lier:any = null;
    private refMinuterie:number = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number, num:number, leJeu:Jeu, leProtagoniste:Protagoniste, lArbitre:Arbitre){
        super(laScene, posX, posY);
        this.numObstacle = num;
        this.assignerNumero_lier = this.assignerNumero.bind(this);
        this.bouger_lier = this.bouger.bind(this);
        this.refJeu = leJeu;
        this.refProtagoniste = leProtagoniste;
        this.detecterCollision_lier = this.detecterCollision.bind(this);
        this.refArbitre = lArbitre;

        this.addEventListener('tick', this.assignerNumero_lier);
        this.addEventListener('tick', this.bouger_lier);
        this.addEventListener('tick', this.detecterCollision_lier);
    }

    protected dessiner():void {
        window.lib.ClipObstacle.call(this);
		this.frameBounds = window.lib.ClipObstacle.prototype.frameBounds;
    }
    
    private assignerNumero():void {
        this.gotoAndStop('obstacle'+this.numObstacle);
        this.removeEventListener('tick', this.assignerNumero_lier);
    }

    private bouger():void {
        this.x -= 3;

        if(this.x <= -100) {
            this.refJeu.supprimerObstacle(this);
            this.removeEventListener('tick', this.bouger_lier);
        }
    }

    private detecterCollision():void {
        let rectObstacle = this.getTransformedBounds();
        let rectProtagoniste = this.refProtagoniste.getTransformedBounds();
        if (rectObstacle.intersects(rectProtagoniste) == true) {
            if(this.refMinuterie == null) {
                this.refMinuterie = window.setInterval(this.touche.bind(this), 1000);
                this.refProtagoniste.touche();
                this.nbVie = this.refArbitre.donnerVie();
                this.refArbitre.garderVie(this.nbVie-1);
            }
        }
    }

    private touche():void {
        window.clearInterval(this.refMinuterie);
        this.refMinuterie = null;
    }

    public arreterObstacle():void {
        this.removeEventListener('tick', this.bouger_lier);
        this.removeEventListener('tick', this.detecterCollision_lier);
        this.arreterObjVisible();
    }
}