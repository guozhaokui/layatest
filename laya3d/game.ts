///<reference path="gamesce.ts" />
/// <reference path="shape/cylinder.ts" />


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
        var defCam =this.currCam=  this.sceRoot.addChild(new FreeCamera(1,0.1,1000)) as Laya.Camera;
        this.sceRoot.currentCamera = defCam;
        defCam.transform.translate(new Laya.Vector3(0,0,0));
        this.gameScene=new GameScene(this.sceRoot);
        this.sceRoot.addChild(this.gameScene);
        this.gameScene.load('laya3d/res/scene/scene.lh');

        var c1 = new _Cylinder(1,1,10,10);
        this.sceRoot.addChild( new Laya.MeshSprite3D(c1));
    }

    start(){
        this.loadScene();
    }
    
}

var game = new GameTest();
game.start();