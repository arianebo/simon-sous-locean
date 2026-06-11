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
define(["require", "exports", "./Fond"], function (require, exports, Fond_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FondDefilant = void 0;
    var FondDefilant = /** @class */ (function (_super) {
        __extends(FondDefilant, _super);
        function FondDefilant(laScene, posX, posY) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.defilerFond_lier = null;
            _this.defilerFond_lier = _this.defilerFond.bind(_this);
            _this.addEventListener('tick', _this.defilerFond_lier);
            return _this;
        }
        FondDefilant.prototype.dessiner = function () {
            window.lib.ClipFondDefilant.call(this);
            this.frameBounds = window.lib.ClipFondDefilant.prototype.frameBounds;
        };
        FondDefilant.prototype.defilerFond = function () {
            this.clipFond1.x -= 1.5;
            this.clipFond2.x -= 1.5;
            if (this.clipFond1.x <= -1600) {
                this.clipFond1.x = 1599;
            }
            if (this.clipFond2.x <= -1600) {
                this.clipFond2.x = 1599;
            }
        };
        FondDefilant.prototype.arreterFondDefilant = function () {
            this.removeEventListener('tick', this.defilerFond_lier);
            this.arreterObjVisible();
        };
        return FondDefilant;
    }(Fond_1.Fond));
    exports.FondDefilant = FondDefilant;
});
//# sourceMappingURL=FondDefilant.js.map