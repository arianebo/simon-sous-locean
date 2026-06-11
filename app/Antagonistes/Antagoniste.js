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
    exports.Antagoniste = void 0;
    var Antagoniste = /** @class */ (function (_super) {
        __extends(Antagoniste, _super);
        function Antagoniste(laScene, leProtagoniste, leJeu, posX, posY, lArbitre) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.refProtagoniste = null;
            _this.refJeu = null;
            _this.refArbitre = null;
            _this.refProjectile = null;
            _this.vitesse = null;
            _this.bouger_lier = null;
            _this.nbVie = null;
            _this.refMinuterie2 = null;
            _this.refAntagoniste = null;
            _this.refProtagoniste = leProtagoniste;
            _this.refJeu = leJeu;
            _this.refArbitre = lArbitre;
            _this.bouger_lier = _this.bouger.bind(_this);
            _this.refAntagoniste = _this;
            _this.addEventListener('tick', _this.bouger_lier);
            return _this;
        }
        Antagoniste.prototype.bouger = function () {
            this.x -= this.vitesse;
            if (this.x <= -200) {
                this.refJeu.supprimerAntagoniste(this);
            }
        };
        Antagoniste.prototype.touche = function () {
            window.clearInterval(this.refMinuterie2);
            this.refMinuterie2 = null;
        };
        Antagoniste.prototype.sortirEcran = function () {
            this.y -= 10;
            if (this.y <= -100) {
                this.arreterAntagoniste();
            }
            this.retirerEcouteurs();
        };
        Antagoniste.prototype.arreterAntagoniste = function () {
            this.refJeu.supprimerAntagoniste(this.refAntagoniste);
        };
        Antagoniste.prototype.retirerEcouteurs = function () {
            this.removeEventListener('tick', this.bouger_lier);
        };
        Antagoniste.prototype.supprimerAntagoniste = function () {
            this.retirerEcouteurs();
            this.arreterObjVisible();
        };
        return Antagoniste;
    }(ObjetVisible_1.ObjetVisible));
    exports.Antagoniste = Antagoniste;
});
//# sourceMappingURL=Antagoniste.js.map