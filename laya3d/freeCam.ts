
class FreeCamera extends Laya.Camera{
    vTrans = new Laya.Vector3();
    vRot = new Laya.Vector3(0,0.1,0);
    constructor(aspR:number, n:number,f:number){
        super(aspR,n,f);
    }

    _update(rs:Laya.RenderState){
        super._update(rs);
        //this.vTrans.z=0.1;
        this.transform.translate(this.vTrans);
    }
    rotl(){
        this.vRot.y=0.1;
        this.transform.rotate(this.vRot);
    }
    rotr(){
        this.vRot.y=-0.1;
        this.transform.rotate(this.vRot);
    }
}