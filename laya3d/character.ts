
class game_character extends Laya.MeshSprite3D{
    skinAnim:Laya.SkinAnimations;
    vVel = new Laya.Vector3();
    vTarget = new Laya.Vector3();
    //vgPos = new Float32Array([0,0,0]);
    vgPos = new Laya.Vector3();
    vgStPos = new Float32Array([0,0,0]);
    startActTm=0;
    vfVel = 0.03;
    bStartAct = false;
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
        var vel = 1;
        var dx = 0;
        var dz = 0;
        var len = 0;
        var st = Date.now();
        var state = 0;
        var acttm = Math.random()*5000+2000;
        await this.delay(33);
        while(true){
            if( Date.now()-st>acttm){
                st=Date.now();
                this.startActTm = st;
                acttm = Math.random()*5000+2000;
                this.vgStPos[0]=this.transform.position.x;
                this.vgStPos[1]=this.transform.position.y;
                this.vgStPos[2]=this.transform.position.z;
                this.vTarget.x=Math.random()*1-0.5;
                this.vTarget.z=Math.random()*1-0.5;
                dx = this.vTarget.x - this.transform.position.x;
                dz = this.vTarget.z - this.transform.position.z;
                len = Math.sqrt(dx*dx+dz*dz); 
                if(len<=0)len=1;
                state++;
                if(state%2==0){
                    this.vVel.x=0;
                    this.vVel.z=0;
                    this.stopAnim();
                }else{
                    this.vVel.x = vel*dx/len;
                    this.vVel.z = vel*dz/len;
                    this.playAnim();
                }
                var ang = Math.atan2(dz,dx);
                this.transform.localRotationEuler=new Laya.Vector3(0,-ang-3.14/2,0);
                this.bStartAct = true;
            }
            dx = this.vTarget.x - this.transform.position.x;
            dz = this.vTarget.z - this.transform.position.z;
            len = Math.sqrt(dx*dx+dz*dz); 
            await this.delay(33);
        }
    }

    _update(rs:Laya.RenderState){
        if(this.bStartAct){
            var dt = Date.now()-this.startActTm;
            this.vgPos.x = this.vVel.x*dt/1000+this.vgStPos[0];
            this.vgPos.z = this.vVel.z*dt/1000+this.vgStPos[2];
            //this.action();
            this.transform.position = this.vgPos;// .translate(this.vVel,false);
        }
        super._update(rs);
    }
}
