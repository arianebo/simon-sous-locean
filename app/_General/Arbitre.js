define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Arbitre = void 0;
    var Arbitre = /** @class */ (function () {
        function Arbitre() {
            this.refProjectile = null;
            this.nbVie = null;
        }
        Arbitre.prototype.garderRefProjectile = function (leProjectile) {
            this.refProjectile = leProjectile;
        };
        Arbitre.prototype.donnerRefProjectile = function () {
            return this.refProjectile;
        };
        Arbitre.prototype.garderVie = function (laVie) {
            this.nbVie = laVie;
        };
        Arbitre.prototype.donnerVie = function () {
            return this.nbVie;
        };
        Arbitre.prototype.arreterArbitre = function () {
            this.refProjectile = null;
            this.nbVie = null;
        };
        return Arbitre;
    }());
    exports.Arbitre = Arbitre;
});
//# sourceMappingURL=Arbitre.js.map