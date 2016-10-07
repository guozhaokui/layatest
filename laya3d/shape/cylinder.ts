
class _Cylinder extends Laya.PrimitiveMesh{
    private _radius:number;
    private _height:number;
    private _slices:number;
    private _stacks:number;

    /**
     * 返回半径
     * @return 半径
     */
    get radius():number {
        return this._radius;
    }
    
    /**
     * 设置半径（改变此属性会重新生成顶点和索引）
     * @param  value 半径
     */
    set radius(value:number) {
        this._radius = value;
        this.recreateResource();
    }
    
    /**
     * 获取宽度分段
     * @return 宽度分段
     */
    get slices() {
        return this._slices;
    }
    
    /**
     * 设置宽度分段（改变此属性会重新生成顶点和索引）
     * @param  value 宽度分段
     */
    set slices(value:number) {
        this._slices = value;
        this.recreateResource();
    }
    
    /**
     * 获取高度分段
     * @return 高度分段
     */
    get stacks() {
        return this._stacks;
    }
    
    /**
     * 设置高度分段（改变此属性会重新生成顶点和索引）
     * @param  value高度分段
     */
    set stacks(value:number) {
        this._stacks = value;
        this.recreateResource();
    }
    
    /**
     * 创建一个球体模型
     * @param radius 半径
     * @param stacks 水平层数
     * @param slices 垂直层数
     */
    constructor(radius:number , height:number, stacks:number , slices:number ) {
        super();
        this._radius = radius||10;
        this._height = height||10;
        this._stacks = stacks||8;
        this._slices = slices||8;
        this.recreateResource();
        this._loaded = true;
        
        var pos:Laya.Vector3[] = this.positions;
        this._boundingBox = new Laya.BoundBox(new Laya.Vector3(), new Laya.Vector3());
        Laya.BoundBox.createfromPoints(pos, this._boundingBox);
        this._boundingSphere = new Laya.BoundSphere(new Laya.Vector3(), 0);
        Laya.BoundSphere.createfromPoints(pos, this._boundingSphere);
    }
    
    protected recreateResource():void {
        //(this._released) || (dispose());//如果已存在，则释放资源
        this.startCreate();
        //debugger;
        this._numberVertices = (this._stacks + 1 + 2) * (this._slices + 1);	//结合的地方是有缝的，所以_slices+1
        this._numberIndices = (this._slices -1+this._stacks*this._slices)*2*3;
        
        var indices = new Uint16Array(this._numberIndices);
        var vertexDeclaration = Laya.VertexPositionNormalTexture.vertexDeclaration;
        var vertexFloatStride = vertexDeclaration.vertexStride / 4;
        var vertices = new Float32Array(this._numberVertices * vertexFloatStride); //TODO 多少
        
        var sliceAngle = (Math.PI * 2.0) / this._slices;
        
        var cAng = 0;
        var buttomUVCenterX = 0.5;
        var buttomUVCenterY = 0.5;
        var buttomUVR = 0.5;
        var capUVCenterX = 0.5;
        var capUVCenterY = 0.5;
        var wallUVLeft = 0;
        var wallUVTop = 0;
        var wallUVRight = 1;
        var wallUVBottom = 1;
        
        var indexCount = 0;
        var vertexIndex = 0;
        var vertexCount = 0;
        
        //底
        var cv = 0;
        for ( var slice = 0; slice < (this._slices +1); slice++) {
            var x = Math.cos(cAng);
            var y = Math.sin(cAng);
            cAng += sliceAngle;
            vertices[cv++] = this._radius *x; vertices[cv++] = this._radius * y; vertices[cv++] = 0;	//pos
            vertices[cv++] = 0; vertices[cv++] = 0; vertices[cv++] = -1;	//normal
            vertices[cv++] = buttomUVR * x + buttomUVCenterX; vertices[cv++] = buttomUVR * y + buttomUVCenterY; 	//uv
        }
        for ( slice = 2; slice < (this._slices + 1); slice++) {
            indices[indexCount++] = 0;
            indices[indexCount++] = slice;
            indices[indexCount++] = slice-1;
        }
        vertexCount += (this._slices+1);
        //壁
        var hdist = this._height / this._stacks;
        var cz = 0;
        for ( var h = 0; h < this._stacks + 1; h++) {
            for (slice = 0; slice < (this._slices+1);slice++){
                var tx = vertices[ slice*vertexFloatStride ];
                var ty = vertices[ slice*vertexFloatStride + 1];
                vertices[cv++] = tx; vertices[cv++] = ty; vertices[cv++] = cz;	//pos
                vertices[cv++] = tx; vertices[cv++] = ty; vertices[cv++] = 0;	//normal
                vertices[cv++] = wallUVLeft + slice * (wallUVRight - wallUVLeft) / this._slices; //u
                vertices[cv++] = wallUVBottom + h * (wallUVTop - wallUVBottom) / this._stacks; 	//v
                if (h > 0 && slice > 0) {
                    var v1 = vertexCount - 1;
                    var v2 = vertexCount;
                    var v3 = vertexCount - (this._slices + 1);
                    var v4 = vertexCount - (this._slices + 1) - 1;
                    indices[indexCount++] = v4; indices[indexCount++] = v1; indices[indexCount++] = v2;
                    indices[indexCount++] = v4; indices[indexCount++] = v2; indices[indexCount++] = v3;
                }
                vertexCount++;
            }
            cz += hdist;
        }
        //盖
        for ( slice = 0; slice < (this._slices + 1);slice++) {
            tx = vertices[ slice*vertexFloatStride ];
            ty = vertices[ slice*vertexFloatStride + 1];
            vertices[cv++] = tx; vertices[cv++] = ty; vertices[cv++] = this._height;	//pos
            vertices[cv++] = 0; vertices[cv++] = 0; vertices[cv++] = 1;	//normal
            vertices[cv++] = buttomUVR*tx/this._radius+capUVCenterX; vertices[cv++] = buttomUVR*ty/this._radius+capUVCenterY; 	//uv
        }
        for ( slice = 2; slice < (this._slices + 1); slice++) {
            indices[indexCount++] = vertexCount;
            indices[indexCount++] = vertexCount + slice;
            indices[indexCount++] = vertexCount + slice-1;
        }
        vertexCount += (this._slices + 1);
        
        this._vertexBuffer = new Laya.VertexBuffer3D(vertexDeclaration, this._numberVertices, WebGLRenderingContext.STATIC_DRAW, true);
        this._indexBuffer = new Laya.IndexBuffer3D(Laya.IndexBuffer3D.INDEXTYPE_USHORT, this._numberIndices, WebGLRenderingContext.STATIC_DRAW, true);
        this._vertexBuffer.setData(vertices);
        this._indexBuffer.setData(indices);
        this.memorySize = (this._vertexBuffer.byteLength + this._indexBuffer.byteLength) * 2;//修改占用内存,upload()到GPU后CPU中和GPU中各占一份内存
        this.completeCreate();
    }
}
