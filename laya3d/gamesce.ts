

class GameScene extends Laya.Sprite3D{
    sceRoot:Laya.Scene=null;
    constructor(sceRoot:Laya.Scene){
        super();
        this.sceRoot = sceRoot;
    }
    load(src:string):boolean{
        this.loadHierarchy(src);
        this.scene.once(Laya.Event.HIERARCHY_LOADED,this,function(){
            
        })
        return true;
    }
}