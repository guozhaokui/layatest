
class game_character extends Laya.MeshSprite3D{
    skinAnim:Laya.SkinAnimations;
    vVel = new Laya.Vector3();
    vTarget = new Laya.Vector3();
    constructor(sceRoot:Laya.Scene){
        super(Laya.Mesh.load("laya3d/res/skinModel/dude/dude-him.lm"));
        //this.transform.localRotationEuler = new Laya.Vector3(0, 3.14, 0);
        var skinAni = this.skinAnim = this.addComponent(Laya.SkinAnimations) as Laya.SkinAnimations;
        skinAni.url = "./laya3d/res/skinModel/dude/dude.ani";
        this.playAnim();
        //this.transform.localScale=new Laya.Vector3(1.0/2.54,1.0/2.54,1.0/2.54);
        this.action();
    }
    playAnim(){
        setTimeout(()=>{
            this.skinAnim.player.play();    
        }, Math.random()*1000);
    }

    stopAnim(){
        this.skinAnim.stop();
    }

    delay(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async action(){
        var vel = 0.03;
        var dx = 0;
        var dz = 0;
        var len = 0;
        var st = Date.now();
        while(true){
            if( Date.now()-st>5000){
                st=Date.now();
                this.vTarget.x=Math.random()*1-0.5;
                this.vTarget.z=Math.random()*1-0.5;
                dx = this.vTarget.x - this.transform.position.x;
                dz = this.vTarget.z - this.transform.position.z;
                len = Math.sqrt(dx*dx+dz*dz); 
                if(len<=0)len=1;
                //this.vVel.x = vel*dx/len;
                //this.vVel.z = vel*dz/len;
                this.vVel.x=0;
                this.vVel.z=-0.03;
                var ang = Math.atan2(dz,dx);
                this.transform.localRotationEuler=new Laya.Vector3(0,-ang-3.14/2,0);
            }
            dx = this.vTarget.x - this.transform.position.x;
            dz = this.vTarget.z - this.transform.position.z;
            len = Math.sqrt(dx*dx+dz*dz); 
            this.transform.translate(this.vVel);
            await this.delay(33);
        }
    }

    _update(rs:Laya.RenderState){
        //this.action();
        super._update(rs);
    }
}
