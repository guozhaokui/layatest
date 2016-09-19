class SkinAnimation_MultiSubMeshSample {
    constructor() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        var scene = Laya.stage.addChild(new Laya.Scene());
        scene.currentCamera = (scene.addChild(new Laya.Camera(0, 0.1, 1000)));
        scene.currentCamera.transform.translate(new Laya.Vector3(0, 0.0, 320.0));
        scene.currentCamera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        scene.currentCamera.clearColor = null;
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.direction = new Laya.Vector3(0, -0.8, -1);
        directionLight.ambientColor = new Laya.Vector3(0.7, 0.6, 0.6);
        directionLight.specularColor = new Laya.Vector3(2.0, 2.0, 1.6);
        directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
        scene.shadingMode = Laya.BaseScene.PIXEL_SHADING;
        var staticMesh = scene.addChild(new Laya.Sprite3D());
        staticMesh.once(Laya.Event.HIERARCHY_LOADED, this, function (sender, sprite3D) {
            //setMeshParams(effectSprite, Laya.Material.RENDERMODE_ADDTIVEDOUBLEFACE);
            var rootAnimations = sprite3D.addComponent(Laya.RigidAnimations);
            rootAnimations.url = "./laya3d/res/cube/cube.lani";
            rootAnimations.player.play(0);
        });
        staticMesh.loadHierarchy("./laya3d/res/cube/cube.lh");
        //this.skinMesh = scene.addChild(new Laya.MeshSprite3D(Laya.Mesh.load("./laya3d/res/cube/cube-Box001.lm")))as Laya.MeshSprite3D;
        //this.skinMesh.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
        // this.skinAni = this.skinMesh.addComponent(Laya.SkinAnimations) as Laya.SkinAnimations;
        // this.skinAni.url = "../../res/threeDimen/skinModel/dude/dude.ani";
        // this.skinAni.play();
    }
}
new SkinAnimation_MultiSubMeshSample();
