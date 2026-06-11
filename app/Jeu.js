define(["require", "exports", "./Protagoniste/Protagoniste", "./Antagonistes/Poisson", "./Antagonistes/Requin", "./Antagonistes/PoissonAnge", "./_General/Bouton", "./Protagoniste/Projectile", "./_General/Arbitre", "./_General/Vie", "./_General/Compteur", "./Obstacle/Obstacle", "./_General/Minuteur", "./_General/BarreProjectile", "./_General/Fond/Fond", "./_General/Fond/FondDefilant", "./_General/PanneauIntro", "./_General/PanneauFin"], function (require, exports, Protagoniste_1, Poisson_1, Requin_1, PoissonAnge_1, Bouton_1, Projectile_1, Arbitre_1, Vie_1, Compteur_1, Obstacle_1, Minuteur_1, BarreProjectile_1, Fond_1, FondDefilant_1, PanneauIntro_1, PanneauFin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Jeu = void 0;
    var Jeu = /** @class */ (function () {
        function Jeu(refScene) {
            this.leProtagoniste = null;
            this.refMinuterie = null;
            this.refMinuterie2 = null;
            this.refMinuterieProjectile = null;
            this.refMinuterieProjectile2 = null;
            this.refMinuterieFond = null;
            this.arrAntagonistes = null;
            this.laScene = null;
            this.leBouton = null;
            this.leProjectile = null;
            this.leJeu = null;
            this.lArbitre = null;
            this.laVie = null;
            this.leCompteur = null;
            this.arrObstacle = null;
            this.leMinuteur = null;
            this.laBarreProjectile = null;
            this.leFond = null;
            this.leFondDefilant = null;
            this.lePanneauIntro = null;
            this.minuterie_lier = null;
            this.refMinuterieMort = null;
            this.lePanneauFin = null;
            this.laScene = refScene;
            this.lePanneauIntro = new PanneauIntro_1.PanneauIntro(this.laScene, 0, 0);
            this.leBouton = new Bouton_1.Bouton(this.laScene, this, 400, 550, 'Débuter');
        }
        Jeu.prototype.demarrer = function () {
            createjs.Sound.play("SonMusique", { loop: -1 });
            createjs.Sound.play("SonAmbiance", { loop: -1 });
            this.leJeu = this;
            this.lArbitre = new Arbitre_1.Arbitre();
            this.leFond = new Fond_1.Fond(this.laScene, 0, 0);
            this.leFondDefilant = new FondDefilant_1.FondDefilant(this.laScene, 0, 0);
            this.arrAntagonistes = new Array;
            this.arrObstacle = new Array;
            this.leProtagoniste = new Protagoniste_1.Protagoniste(this.laScene, 100, 300, this.leJeu, this.lArbitre);
            this.leCompteur = new Compteur_1.Compteur(this.laScene, 730, 40);
            this.laVie = new Vie_1.Vie(this.laScene, 40, 40, this.lArbitre, this);
            this.leMinuteur = new Minuteur_1.Minuteur(this.laScene, window.lib.properties.width / 2, 40, this.leJeu);
            this.laBarreProjectile = new BarreProjectile_1.BarreProjectile(this.laScene, 100, 80);
            this.minuterie_lier = this.minuterie.bind(this);
            this.laScene.addEventListener('tick', this.minuterie_lier);
            this.creerAntagoniste();
            if (this.lePanneauIntro != null) {
                this.lePanneauIntro.arreterPanneauIntro();
                this.lePanneauIntro = null;
            }
            if (this.lePanneauFin != null) {
                this.lePanneauFin.arreterPanneauFin();
                this.lePanneauFin = null;
            }
        };
        Jeu.prototype.minuterie = function () {
            // Minuterie antagonistes
            if (this.refMinuterie == null) {
                var intCpt = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
                this.refMinuterie = window.setInterval(this.creerAntagoniste.bind(this), intCpt);
            }
            // Minuterie obstacles
            if (this.refMinuterie2 == null) {
                var intCpt = Math.floor(Math.random() * (10000 - 6000 + 1)) + 6000;
                this.refMinuterie2 = window.setInterval(this.creerObstacle.bind(this), intCpt);
            }
        };
        Jeu.prototype.creerAntagoniste = function () {
            var intCpt = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            var intPosY = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            if (intCpt == 1) {
                this.arrAntagonistes.push(new Poisson_1.Poisson(this.laScene, this.leProtagoniste, this, window.lib.properties.width, intPosY, this.lArbitre, this.leCompteur));
            }
            else if (intCpt == 2) {
                this.arrAntagonistes.push(new PoissonAnge_1.PoissonAnge(this.laScene, this.leProtagoniste, this, window.lib.properties.width, intPosY, this.lArbitre, this.leCompteur));
            }
            else if (intCpt == 3) {
                this.arrAntagonistes.push(new Requin_1.Requin(this.laScene, this.leProtagoniste, this, window.lib.properties.width + 100, intPosY, this.lArbitre, this.leCompteur));
            }
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
        };
        Jeu.prototype.supprimerAntagoniste = function (refAntagoniste) {
            // console.log(refAntagoniste)
            var intIndex = this.arrAntagonistes.indexOf[refAntagoniste];
            this.arrAntagonistes.splice(intIndex, 1);
            refAntagoniste.supprimerAntagoniste();
        };
        Jeu.prototype.creerObstacle = function () {
            var intCpt = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            this.arrObstacle.push(new Obstacle_1.Obstacle(this.laScene, window.lib.properties.width + 10, window.lib.properties.height, intCpt, this, this.leProtagoniste, this.lArbitre));
        };
        Jeu.prototype.supprimerObstacle = function (refObstacle) {
            var index = this.arrObstacle.indexOf[refObstacle];
            this.arrObstacle.splice(index, 1);
            refObstacle.arreterObstacle();
        };
        Jeu.prototype.creerProjectile = function (unX, unY) {
            if (this.refMinuterieProjectile == null) {
                createjs.Sound.play("SonProjectile");
                this.leProtagoniste.gotoAndPlay('tir');
                this.leProjectile = new Projectile_1.Projectile(this.laScene, unX, unY, this.lArbitre);
                this.laBarreProjectile.monterProgression();
                this.refMinuterieProjectile = window.setInterval(this.minuterieProjectile.bind(this), 1000);
                this.refMinuterieProjectile2 = window.setInterval(this.supprimerProjectile.bind(this), 1200);
            }
        };
        Jeu.prototype.minuterieProjectile = function () {
            if (this.leProjectile != null) {
                this.leProjectile.gotoAndStop('mort');
                this.leProjectile.enleverEcouteurs();
            }
        };
        Jeu.prototype.supprimerProjectile = function () {
            if (this.leProjectile != null) {
                this.leProjectile.supprimerProjectile();
                this.leProjectile = null;
            }
            window.clearInterval(this.refMinuterieProjectile);
            this.refMinuterieProjectile = null;
            window.clearInterval(this.refMinuterieProjectile2);
            this.refMinuterieProjectile2 = null;
        };
        Jeu.prototype.animationMort = function () {
            if (this.refMinuterieMort == null) {
                this.leProtagoniste.jouerAnimationMort();
                this.refMinuterieMort = window.setInterval(this.arreterJeu.bind(this), 1000);
            }
        };
        Jeu.prototype.arreterJeu = function (typePanneau) {
            var _this = this;
            createjs.Sound.stop();
            if (typePanneau == null) {
                typePanneau = 'mort';
            }
            this.lePanneauFin = new PanneauFin_1.PanneauFin(this.laScene, 0, 0, typePanneau);
            this.leBouton = new Bouton_1.Bouton(this.laScene, this.leJeu, 400, 530, 'Recommencer');
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
            this.arrAntagonistes.forEach(function (antagoniste) { return _this.supprimerAntagoniste(antagoniste); });
            this.arrObstacle.forEach(function (obstacle) { return _this.supprimerObstacle(obstacle); });
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
        };
        return Jeu;
    }());
    exports.Jeu = Jeu;
});
//# sourceMappingURL=Jeu.js.map