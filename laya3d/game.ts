///<reference path="gamesce.ts" />
/// <reference path="shape/cylinder.ts" />
/// <reference path="character.ts" />


var Vec3 = Laya.Vector3;
class GameTest{
    sceRoot:Laya.Scene=null;
    gameScene:GameScene=null;
    currCam:FreeCamera=null;
    player1:Laya.Sprite3D=null;
    npcs:Laya.Sprite3D[]=[];
    constructor(){
        this.initEngine();
        this.sceRoot = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
    }

    initEngine(){
        Laya3D.init(0, 0,true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        Laya.stage.on(Laya.Event.KEY_DOWN,this,this.handlKeyEvent);
    }

    loadScene(){
        var defCam =this.currCam=  this.sceRoot.addChild(new FreeCamera(1,0.1,1000)) as FreeCamera;
        this.sceRoot.currentCamera = defCam;
        defCam.transform.translate(new Laya.Vector3(0,0.0,1.0));
        //defCam.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
        this.gameScene=new GameScene(this.sceRoot);
        this.sceRoot.addChild(this.gameScene);
        this.gameScene.load('laya3d/res/scene/scene.lh');
        //this.gameScene.transform.localScale= new Vec3(1.0/2.54,1.0/2.54,1.0/2.54);

        //var c1 = new _Cylinder(0.09,0.18,10,10);
        //this.sceRoot.addChild( new Laya.MeshSprite3D(c1));
        var s1 = new Laya.Sphere(1,10,10);
        var s1sp = this.sceRoot.addChild(new Laya.MeshSprite3D(s1)) as Laya.Sprite3D;
        s1sp.transform.translate(new Vec3(-2,-0.0,-16.9));
    }

    addNPC(x:number,y:number,z:number, dir:number){

    }

    addPlayer(x:number,y:number,z:number, dir:number):GameTest{
        var npc = new game_character(this.sceRoot);
        this.sceRoot.addChild(npc);
        this.npcs.push(npc);
        npc.transform.position=new Vec3(x,y,z);
        return this;
    }

    start(){
        this.loadScene();
        this.addPlayer(0,0,0,0)
            .addPlayer(1,0,0,0)
            .addPlayer(2,0,0,0)
            .addPlayer(-1,0,0,0);
        for(var i=0; i<20; i++){
            this.addPlayer(Math.random()*20-10,0,Math.random()*10-5,0);            
        }
    }
    
    handlKeyEvent(e:KeyboardEvent){
        console.log(e.keyCode);
        switch(e.keyCode){
            case 37://left
                this.currCam.rotl();
            break;
            case 39://right
                this.currCam.rotr();
            break;
        }
        //if(e.keyCode)
        //this.currCam.rotl();
    }
}

var game = new GameTest();
game.start();