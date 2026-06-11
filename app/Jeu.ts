import { Protagoniste } from "./Protagoniste/Protagoniste";
import { Poisson } from "./Antagonistes/Poisson";
import { Antagoniste } from "./Antagonistes/Antagoniste";
import { Requin } from "./Antagonistes/Requin";
import { PoissonAnge } from "./Antagonistes/PoissonAnge"
import { Bouton } from "./_General/Bouton";
import { Projectile } from "./Protagoniste/Projectile";
import { Arbitre } from "./_General/Arbitre";
import { Vie } from "./_General/Vie";
import { Compteur } from "./_General/Compteur";
import { Obstacle } from "./Obstacle/Obstacle";
import { Minuteur } from "./_General/Minuteur";
import { BarreProjectile } from "./_General/BarreProjectile";
import { Fond } from "./_General/Fond/Fond";
import { FondDefilant } from "./_General/Fond/FondDefilant";
import { PanneauIntro } from "./_General/PanneauIntro";
import { PanneauFin } from "./_General/PanneauFin";

export class Jeu {
    private leProtagoniste:Protagoniste = null;
    private refMinuterie:number = null;
    private refMinuterie2:number = null;
    private refMinuterieProjectile:number = null;
    private refMinuterieProjectile2:number = null;
    private refMinuterieFond = null;
    private arrAntagonistes:Array<createjs.MovieClip> = null;
    private laScene:createjs.Stage = null;
    private leBouton:Bouton = null;
    private leProjectile:Projectile = null;
    private leJeu = null;
    private lArbitre:Arbitre = null;
    private laVie:Vie = null;
    private leCompteur:Compteur = null;
    private arrObstacle:Array<Obstacle> = null;
    private leMinuteur:Minuteur = null;
    private laBarreProjectile:BarreProjectile = null;
    private leFond:Fond = null;
    private leFondDefilant:FondDefilant = null;
    private lePanneauIntro:PanneauIntro = null;
    private minuterie_lier = null;
    private refMinuterieMort = null;
    private lePanneauFin:PanneauFin = null;

    constructor(refScene:createjs.Stage) {
        this.laScene = refScene;
        this.lePanneauIntro = new PanneauIntro(this.laScene, 0, 0);
        this.leBouton = new Bouton(this.laScene, this, 400, 550, 'Débuter');
    }

    public demarrer():void {
        createjs.Sound.play("SonMusique", {loop:-1});
        createjs.Sound.play("SonAmbiance", {loop:-1});
        this.leJeu = this;
        this.lArbitre = new Arbitre();
        this.leFond = new Fond(this.laScene, 0, 0);
        this.leFondDefilant = new FondDefilant(this.laScene, 0, 0);
        this.arrAntagonistes = new Array;
        this.arrObstacle = new Array;
        this.leProtagoniste = new Protagoniste(this.laScene, 100, 300, this.leJeu, this.lArbitre);
        this.leCompteur = new Compteur(this.laScene, 730, 40);
        this.laVie = new Vie(this.laScene, 40, 40, this.lArbitre, this);
        this.leMinuteur = new Minuteur(this.laScene, window.lib.properties.width/2, 40, this.leJeu);
        this.laBarreProjectile = new BarreProjectile(this.laScene, 100, 80);

        this.minuterie_lier = this.minuterie.bind(this);
        this.laScene.addEventListener('tick', this.minuterie_lier);
        this.creerAntagoniste();

        if(this.lePanneauIntro != null) {
            this.lePanneauIntro.arreterPanneauIntro();
            this.lePanneauIntro = null;
        }
        if(this.lePanneauFin != null) {
            this.lePanneauFin.arreterPanneauFin();
            this.lePanneauFin = null;
        }
    }
    
    private minuterie():void {
        // Minuterie antagonistes
        if(this.refMinuterie == null) {
            let intCpt:number = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
            this.refMinuterie = window.setInterval(this.creerAntagoniste.bind(this), intCpt);
        }

        // Minuterie obstacles
        if(this.refMinuterie2 == null) {
            let intCpt:number = Math.floor(Math.random() * (10000 - 6000 + 1)) + 6000;
            this.refMinuterie2 = window.setInterval(this.creerObstacle.bind(this), intCpt);
        }
    }

    private creerAntagoniste():void {
        let intCpt:number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let intPosY:number = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

        if(intCpt == 1) {
            this.arrAntagonistes.push(new Poisson(this.laScene, this.leProtagoniste, this, window.lib.properties.width, intPosY, this.lArbitre, this.leCompteur));
        } else if(intCpt == 2) {
            this.arrAntagonistes.push(new PoissonAnge(this.laScene, this.leProtagoniste, this, window.lib.properties.width, intPosY, this.lArbitre, this.leCompteur));
        } else if(intCpt == 3) {
            this.arrAntagonistes.push(new Requin(this.laScene, this.leProtagoniste, this, window.lib.properties.width+100, intPosY, this.lArbitre, this.leCompteur));
        }

        window.clearInterval(this.refMinuterie);
        this.refMinuterie = null;
    }

    public supprimerAntagoniste(refAntagoniste:any):void {
        // console.log(refAntagoniste)
        let intIndex:number = this.arrAntagonistes.indexOf[refAntagoniste];
        this.arrAntagonistes.splice(intIndex, 1);
        refAntagoniste.supprimerAntagoniste();
    }

    private creerObstacle():void {
        let intCpt:number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        this.arrObstacle.push(new Obstacle(this.laScene, window.lib.properties.width+10, window.lib.properties.height, intCpt, this, this.leProtagoniste, this.lArbitre));
    }

    public supprimerObstacle(refObstacle:any):void {
        let index:number = this.arrObstacle.indexOf[refObstacle];
        this.arrObstacle.splice(index, 1);
        refObstacle.arreterObstacle();
    }

    public creerProjectile(unX:number, unY:number):void {
        if(this.refMinuterieProjectile == null) {
            createjs.Sound.play("SonProjectile");
            this.leProtagoniste.gotoAndPlay('tir');
            this.leProjectile = new Projectile(this.laScene, unX, unY, this.lArbitre);
            this.laBarreProjectile.monterProgression();
            this.refMinuterieProjectile = window.setInterval(this.minuterieProjectile.bind(this), 1000);
            this.refMinuterieProjectile2 = window.setInterval(this.supprimerProjectile.bind(this), 1200);
        }
    }

    public minuterieProjectile():void {
        if(this.leProjectile != null) {
            this.leProjectile.gotoAndStop('mort');
            this.leProjectile.enleverEcouteurs();
        }
    }

    public supprimerProjectile():void {
        if(this.leProjectile != null) {
            this.leProjectile.supprimerProjectile();
            this.leProjectile = null;
        }
        window.clearInterval(this.refMinuterieProjectile);
        this.refMinuterieProjectile = null;
        window.clearInterval(this.refMinuterieProjectile2);
        this.refMinuterieProjectile2 = null;
    }

    public animationMort():void {
        if(this.refMinuterieMort == null) {
            this.leProtagoniste.jouerAnimationMort();
            this.refMinuterieMort = window.setInterval(this.arreterJeu.bind(this), 1000);
        }
    }

    public arreterJeu(typePanneau:string):void {
        createjs.Sound.stop();

        if(typePanneau == null) {
            typePanneau = 'mort';
        }

        this.lePanneauFin = new PanneauFin(this.laScene, 0, 0, typePanneau);
        this.leBouton = new Bouton(this.laScene, this.leJeu, 400, 530, 'Recommencer');

        window.clearInterval(this.refMinuterieMort);
        window.clearInterval(this.refMinuterieProjectile);
        window.clearInterval(this.refMinuterieProjectile2);
        window.clearInterval(this.refMinuterie);
        window.clearInterval(this.refMinuterie2);
        window.clearInterval(this.refMinuterieFond);
        this.refMinuterieMort = null;
        this.refMinuterieProjectile = null;
        this.refMinuterieProjectile2 = null;
        this.refMinuterie = null;
        this.refMinuterie2 = null;
        this.refMinuterieFond = null;

        this.leProtagoniste.arreterProtagoniste();
        this.laScene.removeEventListener('tick', this.minuterie_lier);
        this.arrAntagonistes.forEach((antagoniste) => this.supprimerAntagoniste(antagoniste));
        this.arrObstacle.forEach((obstacle) => this.supprimerObstacle(obstacle));
        this.lArbitre.arreterArbitre();
        this.laBarreProjectile.arreterBarreProjectile();
        this.leCompteur.arreterCompteur();
        this.leMinuteur.arreterMinuteur();
        this.laVie.arreterVie();
        this.leFondDefilant.arreterFondDefilant();
        this.leFond.arreterFond();

        this.leProtagoniste = null;
        this.leProjectile = null;
        this.laBarreProjectile = null;
        this.lArbitre = null;
        this.leCompteur = null;
        this.leMinuteur = null;
        this.laVie = null;
        this.leFondDefilant = null;
        this.leFond = null;
    }
}