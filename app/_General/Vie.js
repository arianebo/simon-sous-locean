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
    exports.Vie = void 0;
    var Vie = /** @class */ (function (_super) {
        __extends(Vie, _super);
        function Vie(laScene, posX, posY, lArbitre, leJeu) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.nbVie = 3;
            _this.refArbitre = null;
            _this.refJeu = null;
            _this.changerVie_lier = null;
            _this.refArbitre = lArbitre;
            _this.refJeu = leJeu;
            _this.changerVie_lier = _this.changerVie.bind(_this);
            _this.refArbitre.garderVie(_this.nbVie);
            _this.addEventListener('tick', _this.changerVie_lier);
            return _this;
        }
        Vie.prototype.dessiner = function () {
            window.lib.ClipVie.call(this);
            this.frameBounds = window.lib.ClipVie.prototype.frameBounds;
        };
        Vie.prototype.changerVie = function () {
            this.nbVie = this.refArbitre.donnerVie();
            if (this.nbVie < 3) {
                this.gotoAndStop('touche' + this.nbVie);
            }
            if (this.nbVie == 0) {
                this.refJeu.animationMort();
            }
        };
        Vie.prototype.arreterVie = function () {
            this.removeEventListener('tick', this.changerVie_lier);
            this.arreterObjVisible();
        };
        return Vie;
    }(ObjetVisible_1.ObjetVisible));
    exports.Vie = Vie;
});
//# sourceMappingURL=Vie.js.map