///<reference path="gamesce.ts" />

class GameTest{
    sceRoot:Laya.Scene=null;
    gameScene:GameScene=null;
    currCam:Laya.Camera=null;
    constructor(){
        this.initEngine();
        this.sceRoot = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
    }

    initEngine(){
        Laya3D.init(0, 0,true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
    }

    loadScene(){
        var defCam = this.sceRoot.addChild(new Laya.Camera(1,0.1,1000)) as Laya.Camera;
        this.currCam=defCam;
        this.sceRoot.currentCamera = defCam;
        defCam.transform.translate(new Laya.Vector3(0,0,0));
        this.gameScene=new GameScene(this.sceRoot);
        this.gameScene.load('laya3d/res/scene/scene.lh');
    }

    start(){
        this.loadScene();
    }
    
}

var game = new GameTest();
game.start();