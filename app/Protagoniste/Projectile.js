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
    exports.Projectile = void 0;
    var Projectile = /** @class */ (function (_super) {
        __extends(Projectile, _super);
        function Projectile(laScene, posX, posY, lArbitre) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.bougerProjectile_lier = null;
            _this.refArbitre = null;
            _this.bougerProjectile_lier = _this.bougerProjectile.bind(_this);
            _this.refArbitre = lArbitre;
            _this.refArbitre.garderRefProjectile(_this);
            _this.addEventListener('tick', _this.bougerProjectile_lier);
            return _this;
        }
        Projectile.prototype.dessiner = function () {
            window.lib.ClipProjectile.call(this);
            this.frameBounds = window.lib.ClipProjectile.prototype.frameBounds;
        };
        Projectile.prototype.bougerProjectile = function () {
            this.x += 8;
        };
        Projectile.prototype.enleverEcouteurs = function () {
            this.removeEventListener('tick', this.bougerProjectile_lier);
        };
        Projectile.prototype.supprimerProjectile = function () {
            this.refArbitre.garderRefProjectile(null);
            this.arreterObjVisible();
        };
        return Projectile;
    }(ObjetVisible_1.ObjetVisible));
    exports.Projectile = Projectile;
});
//# sourceMappingURL=Projectile.js.map