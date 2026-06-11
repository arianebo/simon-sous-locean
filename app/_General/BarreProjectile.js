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
    exports.BarreProjectile = void 0;
    var BarreProjectile = /** @class */ (function (_super) {
        __extends(BarreProjectile, _super);
        function BarreProjectile(laScene, posX, posY) {
            return _super.call(this, laScene, posX, posY) || this;
        }
        BarreProjectile.prototype.dessiner = function () {
            window.lib.ClipBarreProjectile.call(this);
            this.frameBounds = window.lib.ClipBarreProjectile.prototype.frameBounds;
            this.gotoAndStop('initial');
        };
        BarreProjectile.prototype.monterProgression = function () {
            this.gotoAndPlay('progression');
        };
        BarreProjectile.prototype.arreterBarreProjectile = function () {
            this.arreterObjVisible();
        };
        return BarreProjectile;
    }(ObjetVisible_1.ObjetVisible));
    exports.BarreProjectile = BarreProjectile;
});
//# sourceMappingURL=BarreProjectile.js.map