import { Projectile } from "../Protagoniste/Projectile";

export class Arbitre {
    private refProjectile:Projectile = null;
    private nbVie:number = null;

    constructor() {

    }

    public garderRefProjectile(leProjectile:Projectile):void {
        this.refProjectile = leProjectile;
    }

    public donnerRefProjectile():Projectile {
        return this.refProjectile;
    }

    public garderVie(laVie:number):void {
        this.nbVie = laVie;
    }

    public donnerVie():number {
        return this.nbVie;
    }

    public arreterArbitre():void {
        this.refProjectile = null;
        this.nbVie = null;
    }
}