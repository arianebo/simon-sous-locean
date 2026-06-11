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
define(["require", "exports", "../ObjetVisible"], function (require, exports, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Obstacle = void 0;
    var Obstacle = /** @class */ (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle(laScene, posX, posY, num, leJeu, leProtagoniste, lArbitre) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.numObstacle = null;
            _this.assignerNumero_lier = null;
            _this.bouger_lier = null;
            _this.refJeu = null;
            _this.refProtagoniste = null;
            _this.refArbitre = null;
            _this.nbVie = null;
            _this.detecterCollision_lier = null;
            _this.refMinuterie = null;
            _this.numObstacle = num;
            _this.assignerNumero_lier = _this.assignerNumero.bind(_this);
            _this.bouger_lier = _this.bouger.bind(_this);
            _this.refJeu = leJeu;
            _this.refProtagoniste = leProtagoniste;
            _this.detecterCollision_lier = _this.detecterCollision.bind(_this);
            _this.refArbitre = lArbitre;
            _this.addEventListener('tick', _this.assignerNumero_lier);
            _this.addEventListener('tick', _this.bouger_lier);
            _this.addEventListener('tick', _this.detecterCollision_lier);
            return _this;
        }
        Obstacle.prototype.dessiner = function () {
            window.lib.ClipObstacle.call(this);
            this.frameBounds = window.lib.ClipObstacle.prototype.frameBounds;
        };
        Obstacle.prototype.assignerNumero = function () {
            this.gotoAndStop('obstacle' + this.numObstacle);
            this.removeEventListener('tick', this.assignerNumero_lier);
        };
        Obstacle.prototype.bouger = function () {
            this.x -= 3;
            if (this.x <= -100) {
                this.refJeu.supprimerObstacle(this);
                this.removeEventListener('tick', this.bouger_lier);
            }
        };
        Obstacle.prototype.detecterCollision = function () {
            var rectObstacle = this.getTransformedBounds();
            var rectProtagoniste = this.refProtagoniste.getTransformedBounds();
            if (rectObstacle.intersects(rectProtagoniste) == true) {
                if (this.refMinuterie == null) {
                    this.refMinuterie = window.setInterval(this.touche.bind(this), 1000);
                    this.refProtagoniste.touche();
                    this.nbVie = this.refArbitre.donnerVie();
                    this.refArbitre.garderVie(this.nbVie - 1);
                }
            }
        };
        Obstacle.prototype.touche = function () {
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
        };
        Obstacle.prototype.arreterObstacle = function () {
            this.removeEventListener('tick', this.bouger_lier);
            this.removeEventListener('tick', this.detecterCollision_lier);
            this.arreterObjVisible();
        };
        return Obstacle;
    }(ObjetVisible_1.ObjetVisible));
    exports.Obstacle = Obstacle;
});
//# sourceMappingURL=Obstacle.js.map