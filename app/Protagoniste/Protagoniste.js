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
    exports.Protagoniste = void 0;
    var Protagoniste = /** @class */ (function (_super) {
        __extends(Protagoniste, _super);
        function Protagoniste(laScene, posX, posY, leJeu, lArbitre) {
            var _this = _super.call(this, laScene, posX, posY) || this;
            _this.tTouches = [false, false, false, false];
            _this.refMinuterie = null;
            _this.bougerProtagoniste_lier = null;
            _this.refJeu = null;
            _this.refMinuterie2 = null;
            _this.demarrer_lier = null;
            _this.refArbitre = null;
            _this.bougerProtagoniste_lier = _this.bougerProtagoniste.bind(_this);
            _this.refJeu = leJeu;
            _this.refArbitre = lArbitre;
            window.onkeydown = _this.toucheEnfoncee.bind(_this);
            window.onkeyup = _this.toucheRevelee.bind(_this);
            return _this;
        }
        Protagoniste.prototype.dessiner = function () {
            window.lib.ClipChat.call(this);
            this.frameBounds = window.lib.ClipChat.prototype.frameBounds;
        };
        Protagoniste.prototype.bougerProtagoniste = function () {
            // tTouches[droite, gauche, haut, bas]
            if (this.tTouches[0] == true) {
                if (this.x < window.lib.properties.width - 55) {
                    this.x += 5;
                }
            }
            if (this.tTouches[1] == true) {
                if (this.x > 85) {
                    this.x -= 5;
                }
            }
            if (this.tTouches[2] == true) {
                if (this.y > 155) {
                    this.y -= 5;
                }
            }
            if (this.tTouches[3] == true) {
                if (this.y < window.lib.properties.height - 50) {
                    this.y += 5;
                }
            }
        };
        Protagoniste.prototype.toucheEnfoncee = function (e) {
            // onKeyDown
            e.preventDefault();
            switch (e.key) {
                case 'd':
                    this.tTouches[0] = true;
                    break;
                case 'a':
                    this.tTouches[1] = true;
                    break;
                case 'w':
                    this.tTouches[2] = true;
                    break;
                case 's':
                    this.tTouches[3] = true;
                    break;
                case ' ':
                    this.refJeu.creerProjectile(this.x + 70, this.y);
                    break;
            }
            if (this.refMinuterie == null) {
                this.refMinuterie = window.setInterval(this.bougerProtagoniste_lier, 18);
            }
        };
        Protagoniste.prototype.toucheRevelee = function (e) {
            // onKeyUp
            switch (e.key) {
                case 'd':
                    this.tTouches[0] = false;
                    break;
                case 'a':
                    this.tTouches[1] = false;
                    break;
                case 'w':
                    this.tTouches[2] = false;
                    break;
                case 's':
                    this.tTouches[3] = false;
                    break;
            }
            if (this.tTouches[0] == false && this.tTouches[1] == false && this.tTouches[2] == false && this.tTouches[3] == false) {
                window.clearInterval(this.refMinuterie);
                this.refMinuterie = null;
            }
        };
        Protagoniste.prototype.touche = function () {
            this.gotoAndStop('touche');
            if (this.refMinuterie2 == null) {
                createjs.Sound.play("SonTouche");
                this.refMinuterie2 = window.setInterval(this.reset.bind(this), 1000);
            }
        };
        Protagoniste.prototype.reset = function () {
            this.gotoAndPlay('nage');
            window.clearInterval(this.refMinuterie2);
            this.refMinuterie2 = null;
        };
        Protagoniste.prototype.jouerAnimationMort = function () {
            this.gotoAndPlay('mort');
        };
        Protagoniste.prototype.arreterProtagoniste = function () {
            window.onkeydown = null;
            window.onkeyup = null;
            window.clearInterval(this.refMinuterie);
            this.refMinuterie = null;
            window.clearInterval(this.refMinuterie2);
            this.refMinuterie2 = null;
            this.arreterObjVisible();
        };
        return Protagoniste;
    }(ObjetVisible_1.ObjetVisible));
    exports.Protagoniste = Protagoniste;
});
//# sourceMappingURL=Protagoniste.js.map