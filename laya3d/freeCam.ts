
class FreeCamera extends Laya.Camera{
    v3Trans = new Laya.Vector3();
    constructor(aspR:number, n:number,f:number){
        super(aspR,n,f);
    }

    _update(rs:Laya.RenderState){
        super._update(rs);
        this.v3Trans.z=0.1;
        this.transform.translate(this.v3Trans);
    }
}