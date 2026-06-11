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
    exports.Poisson = void 0;
    var Poisson = /** @class */ (function (_super) {
        __extends(Poisson, _super);
        function Poisson(laScene, leProtagoniste, leJeu, posX, posY, lArbitre, leCompteur) {
            var _this = _super.call(this, laScene, leProtagoniste, leJeu, posX, posY, lArbitre) || this;
            _this.detecterCollisions_lier = null;
            _this.refCompteur = null;
            _this.nbPoints = null;
            _this.monPoint = null;
            _this.refCompteur = leCompteur;
            _this.detecterCollisions_lier = _this.detecterCollisions.bind(_this);
            _this.vitesse = 5;
            _this.nbPoints = 1;
            _this.monPoint = _this['clip_p1'];
            _this.addEventListener('tick', _this.detecterCollisions_lier);
            return _this;
        }
        Poisson.prototype.dessiner = function () {
            window.lib.ClipPoisson.call(this);
            this.frameBounds = window.lib.ClipPoisson.prototype.frameBounds;
        };
        Poisson.prototype.detecterCollisions = function () {
            this.refProjectile = this.refArbitre.donnerRefProjectile();
            var rectAntagoniste = this.getTransformedBounds();
            if (this.refProjectile != null) {
                var rectProjectile = this.refProjectile.getTransformedBounds();
                if (rectAntagoniste.intersects(rectProjectile) == true) {
                    this.gotoAndStop('touche');
                    this.addEventListener('tick', this.sortirEcran.bind(this));
                    this.refJeu.supprimerProjectile();
                    this.refCompteur.changerNbPoissons(this.nbPoints);
                }
            }
            // Vérifier la collision du point
            if (this.monPoint.parent != null) {
                var positionDeMonPointDansObstacle = this.monPoint.parent.localToLocal(this.monPoint.x, this.monPoint.y, this.refProtagoniste);
                var collision = this.refProtagoniste.hitTest(positionDeMonPointDansObstacle.x, positionDeMonPointDansObstacle.y);
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
        Poisson.prototype.arreterPoisson = function () {
            this.removeEventListener('tick', this.detecterCollisions_lier);
            this.supprimerAntagoniste();
        };
        return Poisson;
    }(Antagoniste_1.Antagoniste));
    exports.Poisson = Poisson;
});
//# sourceMappingURL=Poisson.js.map