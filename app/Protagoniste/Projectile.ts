import { Arbitre } from "../_General/Arbitre";
import { ObjetVisible } from "../ObjetVisible";

export class Projectile extends ObjetVisible {
    private bougerProjectile_lier:any = null;
    private refArbitre:Arbitre = null;

    constructor(laScene:createjs.Stage, posX:number, posY:number, lArbitre:Arbitre) {
        super(laScene, posX, posY);
        this.bougerProjectile_lier = this.bougerProjectile.bind(this);
        this.refArbitre = lArbitre;

        this.refArbitre.garderRefProjectile(this);
        this.addEventListener('tick', this.bougerProjectile_lier);
    }

    protected dessiner():void {
        window.lib.ClipProjectile.call(this);
		this.frameBounds = window.lib.ClipProjectile.prototype.frameBounds;
    }

    private bougerProjectile():void {
        this.x += 8;
    }

    public enleverEcouteurs():void {
        this.removeEventListener('tick', this.bougerProjectile_lier);
    }

    public supprimerProjectile():void {
        this.refArbitre.garderRefProjectile(null);
        this.arreterObjVisible();
    }
}