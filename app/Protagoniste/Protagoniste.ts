import { Arbitre } from "../_General/Arbitre";
import { Jeu } from "../Jeu";
import { ObjetVisible } from "../ObjetVisible";

export class Protagoniste extends ObjetVisible {
    private tTouches:Array<boolean> = [false, false, false, false];
    private refMinuterie:number = null;
    private bougerProtagoniste_lier:any = null;
    private refJeu:Jeu = null;
    private refMinuterie2:number = null;
    private demarrer_lier:any = null;
    private refArbitre:Arbitre = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number, leJeu:Jeu, lArbitre:Arbitre) {
        super(laScene, posX, posY);
        this.bougerProtagoniste_lier = this.bougerProtagoniste.bind(this);
        this.refJeu = leJeu;
        this.refArbitre = lArbitre;

        window.onkeydown = this.toucheEnfoncee.bind(this);
        window.onkeyup = this.toucheRevelee.bind(this);
    }

    protected dessiner():void {
        window.lib.ClipChat.call(this);
		this.frameBounds = window.lib.ClipChat.prototype.frameBounds;
    }

    private bougerProtagoniste():void {
        // tTouches[droite, gauche, haut, bas]

        if(this.tTouches[0] == true) {
            if(this.x < window.lib.properties.width-55) {
                this.x += 5;
            }
        }
        if(this.tTouches[1] == true) {
            if(this.x > 85) {
                this.x -= 5;
            }
        }
        if(this.tTouches[2] == true) {
            if(this.y > 155) {
                this.y -= 5;
            }
        }
        if(this.tTouches[3] == true) {
            if(this.y < window.lib.properties.height-50) {
                this.y += 5;
            }
        }
    }

    private toucheEnfoncee(e):void {
         // onKeyDown
         e.preventDefault();

         switch(e.key) {
             case 'd':
                 this.tTouches[0] = true;
                 break;
 
             case 'a':
                 this.tTouches[1] = true;
                 break;
 
             case 'w':
                 this.tTouches[2] = true;
                 break;
 
             case 's':
                 this.tTouches[3] = true;
                 break;

            case ' ':
                this.refJeu.creerProjectile(this.x+70, this.y);
                break;
         }
         
         if(this.refMinuterie == null) {
             this.refMinuterie = window.setInterval(this.bougerProtagoniste_lier, 18);
         }
    }

    private toucheRevelee(e):void {
        // onKeyUp
        switch(e.key) {
            case 'd':
                this.tTouches[0] = false;
                break;

            case 'a':
                this.tTouches[1] = false;
                break;

            case 'w':
                this.tTouches[2] = false;
                break;

            case 's':
                this.tTouches[3] = false;
                break;
        }

        if(this.tTouches[0] == false && this.tTouches[1] == false && this.tTouches[2] == false && this.tTouches[3] == false) {
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
        }

    }

    public touche():void {
        this.gotoAndStop('touche');
        if(this.refMinuterie2 == null) {
            createjs.Sound.play("SonTouche");
            this.refMinuterie2 = window.setInterval(this.reset.bind(this), 1000);
        }
    }
    
    private reset():void {
        this.gotoAndPlay('nage');
        window.clearInterval(this.refMinuterie2);
        this.refMinuterie2 = null;
    }

    public jouerAnimationMort():void {
        this.gotoAndPlay('mort');
    }

    public arreterProtagoniste():void {
        window.onkeydown = null;
        window.onkeyup = null;

        window.clearInterval(this.refMinuterie);
        this.refMinuterie = null;
        window.clearInterval(this.refMinuterie2);
        this.refMinuterie2 = null;
        this.arreterObjVisible();
    }
}