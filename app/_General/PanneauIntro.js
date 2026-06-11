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
    exports.PanneauIntro = void 0;
    var PanneauIntro = /** @class */ (function (_super) {
        __extends(PanneauIntro, _super);
        function PanneauIntro(laScene, posX, posY) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            if (window.localStorage.getItem('meilleurScore') != null) {
                _this.champ_texte.text = window.localStorage.getItem('meilleurScore');
            }
            return _this;
        }
        PanneauIntro.prototype.dessiner = function () {
            window.lib.ClipPanneauIntro.call(this);
            this.frameBounds = window.lib.ClipPanneauIntro.prototype.frameBounds;
        };
        PanneauIntro.prototype.arreterPanneauIntro = function () {
            this.arreterObjVisible();
        };
        return PanneauIntro;
    }(ObjetVisible_1.ObjetVisible));
    exports.PanneauIntro = PanneauIntro;
});
//# sourceMappingURL=PanneauIntro.js.map