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
    exports.Minuteur = void 0;
    var Minuteur = /** @class */ (function (_super) {
        __extends(Minuteur, _super);
        function Minuteur(laScene, posX, posY, leJeu) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.refMinuterie = null;
            _this.diminuerMinuteur_lier = null;
            _this.temps = null;
            _this.refJeu = null;
            _this.diminuerMinuteur_lier = _this.diminuerMinuteur.bind(_this);
            _this.temps = 60;
            _this.refJeu = leJeu;
            _this.champ_texte.text = String(_this.temps) + 's';
            _this.refMinuterie = window.setInterval(_this.diminuerMinuteur_lier, 1000);
            return _this;
        }
        Minuteur.prototype.dessiner = function () {
            window.lib.ClipMinuteur.call(this);
            this.frameBounds = window.lib.ClipMinuteur.prototype.frameBounds;
            this.champ_texte.font = '30px Carter One';
            this.champ_texte.color = 'white';
        };
        Minuteur.prototype.diminuerMinuteur = function () {
            this.temps = parseInt(this.champ_texte.text);
            this.temps--;
            this.champ_texte.text = this.temps + 's';
            if (this.temps == 0) {
                this.refJeu.arreterJeu('reussi');
            }
        };
        Minuteur.prototype.arreterMinuteur = function () {
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
            this.temps = null;
            this.arreterObjVisible();
        };
        return Minuteur;
    }(ObjetVisible_1.ObjetVisible));
    exports.Minuteur = Minuteur;
});
//# sourceMappingURL=Minuteur.js.map