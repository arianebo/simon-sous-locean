export abstract class ObjetVisible extends createjs.MovieClip {
    protected refScene:createjs.Stage = null;

    public constructor(laScene:createjs.Stage, posX:number, posY:number) {
        super();
        this.dessiner();
        this.refScene = laScene;
        this.refScene.addChild(this);

        this.x = posX;
        this.y = posY;
    }

    protected abstract dessiner():void;

    public arreterObjVisible():void {
        this.parent.removeChild(this);
    }
}