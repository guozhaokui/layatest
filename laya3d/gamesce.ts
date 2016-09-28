

class GameScene{
    scene:Laya.Sprite3D=null;
    sceRoot:Laya.Scene=null;
    constructor(sceRoot:Laya.Scene){
        this.sceRoot = sceRoot;
        this.scene = this.sceRoot.addChild(new Laya.Sprite3D()) as Laya.Sprite3D;
    }
    load(src:string):boolean{
        this.scene.loadHierarchy(src);
        /*
        this.scene.once(Laya.Event.HIERARCHY_LOADED,this,function(){
            
        })
        */
        return true;
    }
}