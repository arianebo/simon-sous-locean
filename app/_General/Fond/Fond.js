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
define(["require", "exports", "../../ObjetVisible"], function (require, exports, ObjetVisible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fond = void 0;
    var Fond = /** @class */ (function (_super) {
        __extends(Fond, _super);
        function Fond(laScene, posX, posY) {
            return _super.call(this, laScene, posX, posY) || this;
        }
        Fond.prototype.dessiner = function () {
            window.lib.ClipFond.call(this);
            this.frameBounds = window.lib.ClipFond.prototype.frameBounds;
        };
        Fond.prototype.arreterFond = function () {
            this.arreterObjVisible();
        };
        return Fond;
    }(ObjetVisible_1.ObjetVisible));
    exports.Fond = Fond;
});
//# sourceMappingURL=Fond.js.map