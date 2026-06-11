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
    exports.PanneauFin = void 0;
    var PanneauFin = /** @class */ (function (_super) {
        __extends(PanneauFin, _super);
        function PanneauFin(laScene, posX, posY, typePanneau) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.gotoAndStop(typePanneau);
            if (typePanneau == 'reussi') {
                _this.texte_tonScore.text = window.localStorage.getItem('tonScore');
                _this.texte_meilleurScore.text = window.localStorage.getItem('meilleurScore');
            }
            return _this;
        }
        PanneauFin.prototype.dessiner = function () {
            window.lib.ClipPanneauFin.call(this);
            this.frameBounds = window.lib.ClipPanneauFin.prototype.frameBounds;
        };
        PanneauFin.prototype.arreterPanneauFin = function () {
            this.arreterObjVisible();
        };
        return PanneauFin;
    }(ObjetVisible_1.ObjetVisible));
    exports.PanneauFin = PanneauFin;
});
//# sourceMappingURL=PanneauFin.js.map