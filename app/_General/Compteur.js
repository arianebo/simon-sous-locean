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
    exports.Compteur = void 0;
    var Compteur = /** @class */ (function (_super) {
        __extends(Compteur, _super);
        function Compteur(laScene, posX, posY) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.nbPoissons = null;
            if (window.localStorage.getItem('meilleurScore') == null) {
                window.localStorage.setItem('meilleurScore', '0');
            }
            return _this;
        }
        Compteur.prototype.dessiner = function () {
            window.lib.ClipCompteur.call(this);
            this.frameBounds = window.lib.ClipCompteur.prototype.frameBounds;
            this.champ_texte.font = '30px Carter One';
            this.champ_texte.color = 'white';
        };
        Compteur.prototype.changerNbPoissons = function (nbPoints) {
            this.nbPoissons = parseInt(this.champ_texte.text) + nbPoints;
            this.champ_texte.text = String(this.nbPoissons);
        };
        Compteur.prototype.arreterCompteur = function () {
            var meilleurScore = parseInt(window.localStorage.getItem('meilleurScore'));
            window.localStorage.setItem('tonScore', String(this.nbPoissons));
            if (meilleurScore < this.nbPoissons) {
                window.localStorage.setItem('meilleurScore', String(this.nbPoissons));
            }
            this.arreterObjVisible();
        };
        return Compteur;
    }(ObjetVisible_1.ObjetVisible));
    exports.Compteur = Compteur;
});
//# sourceMappingURL=Compteur.js.map