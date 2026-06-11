var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Antagoniste"], function (require, exports, Antagoniste_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Requin = void 0;
    var Requin = /** @class */ (function (_super) {
        __extends(Requin, _super);
        function Requin(laScene, leProtagoniste, leJeu, posX, posY, lArbitre, leCompteur) {
            var _this = _super.call(this, laScene, leProtagoniste, leJeu, posX, posY, lArbitre) || this;
            _this.nbTouches = 0;
            _this.refMinuterie = null;
            _this.detecterCollisions_lier = null;
            _this.refCompteur = null;
            _this.nbPoints = null;
            _this.tPointsContact = null;
            _this.detecterCollisions_lier = _this.detecterCollisions.bind(_this);
            _this.vitesse = 3.5;
            _this.nbPoints = 3;
            _this.refCompteur = leCompteur;
            _this.tPointsContact = new Array();
            _this.tPointsContact[0] = _this['clip_p1'];
            _this.tPointsContact[1] = _this['clip_p2'];
            _this.tPointsContact[2] = _this['clip_p3'];
            _this.tPointsContact[3] = _this['clip_p4'];
            _this.tPointsContact[4] = _this['clip_p5'];
            _this.tPointsContact[5] = _this['clip_p6'];
            _this.addEventListener('tick', _this.detecterCollisions_lier);
            return _this;
        }
        Requin.prototype.dessiner = function () {
            window.lib.ClipRequin.call(this);
            this.frameBounds = window.lib.ClipRequin.prototype.frameBounds;
        };
        Requin.prototype.detecterCollisions = function () {
            this.refProjectile = this.refArbitre.donnerRefProjectile();
            var rectAntagoniste = this.getTransformedBounds();
            if (this.refProjectile != null) {
                var rectProjectile = this.refProjectile.getTransformedBounds();
                if (rectAntagoniste.intersects(rectProjectile) == true) {
                    this.refJeu.supprimerProjectile();
                    this.nbTouches++;
                    this.gotoAndStop('touche' + this.nbTouches);
                    window.clearInterval(this.refMinuterie);
                    this.refMinuterie = null;
                    if (this.nbTouches >= 3) {
                        this.refCompteur.changerNbPoissons(this.nbPoints);
                        this.addEventListener('tick', this.sortirEcran.bind(this));
                    }
                }
            }
            for (var i = 0; i < this.tPointsContact.length; i++) {
                var unPoint = this.tPointsContact[i];
                var positionDeMonPointDansProtagoniste = unPoint.parent.localToLocal(unPoint.x, unPoint.y, this.refProtagoniste);
                // Vérifier la collision du point
                var collision = this.refProtagoniste.hitTest(positionDeMonPointDansProtagoniste.x, positionDeMonPointDansProtagoniste.y);
                if (collision == true) {
                    if (this.refMinuterie2 == null) {
                        this.refMinuterie2 = window.setInterval(this.touche.bind(this), 1000);
                        this.refProtagoniste.touche();
                        this.nbVie = this.refArbitre.donnerVie();
                        this.refArbitre.garderVie(this.nbVie - 1);
                    }
                }
            }
        };
        Requin.prototype.arreterRequin = function () {
            this.removeEventListener('tick', this.detecterCollisions_lier);
            this.supprimerAntagoniste();
        };
        return Requin;
    }(Antagoniste_1.Antagoniste));
    exports.Requin = Requin;
});
//# sourceMappingURL=Requin.js.map