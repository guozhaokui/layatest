///<reference path="../libs/LayaAir.d.ts" />
Laya3D.init(0, 0,true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();

var scene = Laya.stage.addChild(new Laya.Scene());

scene.currentCamera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
scene.currentCamera.transform.translate(new Laya.Vector3(0, 0.8, 1.0));
scene.currentCamera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
scene.currentCamera.clearColor = null;

var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.direction = new Laya.Vector3(0, -0.8, -1);
directionLight.ambientColor = new Laya.Vector3(0.7, 0.6, 0.6);
directionLight.specularColor = new Laya.Vector3(2.0, 2.0, 1.6);
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
scene.shadingMode = Laya.BaseScene.PIXEL_SHADING;

var skinMesh = scene.addChild(new Laya.MeshSprite3D(Laya.Mesh.load("./laya3d/res/skinModel/dude/dude-him.lm")));
skinMesh.transform.localRotationEuler = new Laya.Vector3(0, 3.14, 0);
var skinAni = skinMesh.addComponent(Laya.SkinAnimations);
skinAni.url = "./laya3d/res/skinModel/dude/dude.ani";
skinAni.play();