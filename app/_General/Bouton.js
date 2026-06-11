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
    exports.Bouton = void 0;
    var Bouton = /** @class */ (function (_super) {
        __extends(Bouton, _super);
        function Bouton(refScene, leJeu, posX, posY, typeBtn) {
            var _this = _super.call(this, refScene, posX, posY) || this;
            _this.refJeu = null;
            _this.refJeu = leJeu;
            _this.champ_texte.text = typeBtn;
            _this.addEventListener('click', _this.demarrerJeu.bind(_this));
            return _this;
        }
        Bouton.prototype.dessiner = function () {
            window.lib.ClipDebuter.call(this);
            this.frameBounds = window.lib.ClipDebuter.prototype.frameBounds;
            this.champ_texte.font = '26px Carter One';
        };
        Bouton.prototype.demarrerJeu = function () {
            this.refJeu.demarrer();
            this.supprimerBtn();
        };
        Bouton.prototype.supprimerBtn = function () {
            this.arreterObjVisible();
        };
        return Bouton;
    }(ObjetVisible_1.ObjetVisible));
    exports.Bouton = Bouton;
});
//# sourceMappingURL=Bouton.js.map