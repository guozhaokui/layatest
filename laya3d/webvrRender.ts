
//https://toji.github.io/webvr-samples/05-room-scale.html

class WebVRRender extends Laya.BaseScene {
    stageSizeW = 2.0;
    stageSizeH = 2.0;
    frameData: VRFrameData = null;
    vrDisplay: VRDisplay = null;
    canvas: HTMLCanvasElement = null;
    viewMat = new Float32Array(16);
    viewPortL:Laya.Viewport = null;
    viewPortR:Laya.Viewport = null;

    constructor(canvas: HTMLCanvasElement) {
        super();
        if(canvas)
            this.canvas = canvas;
        else 
            this.canvas = laya.renders.Render.canvas;
        this.init();
    }

    init() {
        if (navigator.getVRDisplays) {
            navigator.getVRDisplays().then(function (displays: VRDisplay[]) {
                console.log('support webvr!!');
                if (displays.length > 0) {
                    this.vrDisplay = displays[0];
                    this.vrDisplay.depthNear = 0.1;
                    this.vrDisplay.depthFar = 1024.0;
                    //init WebGL
                    var stageInfo = this.vrDisplay.stageParameters;
                    if (stageInfo && stageInfo.sizeX > 0 && stageInfo.sizeZ > 0) {
                        //可玩区域
                        this.stageSizeW = stageInfo.sizeX;
                        this.stageSizeH = stageInfo.sizeZ;
                    } else {
                        console.log('no stage size info!')
                    }
                    if(this.vrDisplay.capabilities.hasPosition){
                        console.log('support position');
                    }
                    //vrDisplay.resetPose(); 设置当前位置为原点
                    if (this.vrDisplay.capabilities.canPresent) {
                        console.log('vrDisplay.capabilities.canPresent=true');//这个什么意思呢
                    }

                    window.addEventListener('vrdisplaypresentchange', this.onVRPresentChange, false);
                    window.addEventListener('vrdisplayactivate', this.onVRRequestPresent, false);
                    window.addEventListener('vrdisplaydeactivate', this.onVRExitPresent, false);                    
                }
            });
        } else {
            console.log('not support webvr!');
        }

        //test
        this.onResize();
        if(!this.vrDisplay)
            this.startRender();
    }

    //请求提交到头显，而不是屏幕
    enterVRMode(){
        this.vrDisplay.requestPresent([{source:this.canvas}]).then(function(){
            this.start
        },function(err){
            console.log('cant present :'+err);
        });
    }

    startRender() {
        var reqLoop = window.requestAnimationFrame;
        if (this.vrDisplay) {
            //替换laya的循环
            reqLoop = this.vrDisplay.requestAnimationFrame;
        }
        function loop() {
            Laya.stage._loop();
            reqLoop(loop);
        }
        reqLoop(loop);
    }

    onVRPresentChange(){
        console.log('onVRPresentChange');
    }
    onVRRequestPresent(){
        console.log('onVRRequestPresent');
    }
    onVRExitPresent(){
        console.log('onVRExitPresent');
    }

    onResize() {
        var vrDisplay = this.vrDisplay;
        if (vrDisplay && vrDisplay.isPresenting) {
            var leftEye = vrDisplay.getEyeParameters('left');
            var rightEye = vrDisplay.getEyeParameters('right');
            this.canvas.width = leftEye.renderWidth * 2;
            this.canvas.height = leftEye.renderHeight;
            this.viewPortL = new Laya.Viewport(0,0,leftEye.renderWidth, leftEye.renderHeight);
            this.viewPortR = new Laya.Viewport(leftEye.renderWidth,0,rightEye.renderWidth, rightEye.renderHeight);
        } else {
            console.log('onResize ');
        }
    }

    /**
     * 把view矩阵转换一下，从坐姿空间转换成站立空间
     */
    getStandingViewMatrix(out, view) {
        //temp
        out=view;
        
        if (this.vrDisplay.stageParameters) {
            this.vrDisplay.stageParameters.sittingToStandingTransform;
            //mat4.invert(out, vrDisplay.stageParameters.sittingToStandingTransform);
            //mat4.multiply(out, view, out);
        } else {
            // Otherwise you'll want to translate the view to compensate for the
            // scene floor being at Y=0. Ideally this should match the user's
            // height (you may want to make it configurable). For this demo we'll
            // just assume all human beings are 1.65 meters (~5.4ft) tall.
            //mat4.identity(out);
            //mat4.translate(out, out, [0, PLAYER_HEIGHT, 0]);
            //mat4.invert(out, out);
            //mat4.multiply(out, view, out);
        }
    }

    renderSceneView(proj: Float32Array, view: Float32Array, pose: VRPose) {
        //draw scene
        //this._preRenderScene(gl, state);
        //this._renderScene(gl, state);

        //根据位置好朝向画调试信息。
        pose.orientation;
        pose.position;
    }

    //临时
    setRSCamMatrix(rs:Laya.RenderState, frameData:VRFrameData,left:boolean){
        if(left){
            var m = this.viewMat;
            this.getStandingViewMatrix(m, frameData.leftViewMatrix);
            var mat = new Laya.Matrix4x4(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15]);
            rs.viewMatrix = mat;

            m = frameData.leftProjectionMatrix;
            var matp = new Laya.Matrix4x4(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15]);
            rs.projectionMatrix = matp;
            var matvp = new Laya.Matrix4x4();
            Laya.Matrix4x4.multiply(mat,matp,matvp);
            rs.projectionViewMatrix = matvp;
        }else{
            var m = this.viewMat;
            this.getStandingViewMatrix(m, frameData.rightViewMatrix);
            var mat = new Laya.Matrix4x4(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15]);
            rs.viewMatrix = mat;

            m = frameData.rightProjectionMatrix;
            var matp = new Laya.Matrix4x4(m[0],m[1],m[2],m[3],m[4],m[5],m[6],m[7],m[8],m[9],m[10],m[11],m[12],m[13],m[14],m[15]);
            rs.projectionMatrix = matp;
            var matvp = new Laya.Matrix4x4();
            Laya.Matrix4x4.multiply(mat,matp,matvp);
            rs.projectionViewMatrix = matvp;
        }
    }

    renderSubmit(): number {
        var vrDisplay = this.vrDisplay;
        var frameData = this.frameData;
        var gl = Laya.WebGL.mainContext;
        var state = this._renderState;
        this._set3DRenderConfig(gl);//设置3D配置
        (this.currentCamera.clearColor) && (this._clearColor(gl));//清空场景
        this._prepareScene(gl, state);
        if(this.vrDisplay){
            state.shaderDefs.add(Laya.ShaderDefines3D.VR);            
        }
        this.beforeUpate(state);//更新之前
        this._updateScene(state);
        this.lateUpate(state);//更新之前
        this.beforeRender(state);//渲染之前

        if (vrDisplay) {
            vrDisplay.getFrameData(frameData);
            if (vrDisplay.isPresenting) {
                //左半屏
                state.viewport = this.viewPortL;
                this.setRSCamMatrix(state,frameData,true);
                this._preRenderScene(gl, state);
                this._renderScene(gl, state);
                //右半屏
                state.viewport = this.viewPortR;
                this.setRSCamMatrix(state,frameData,false);
                this._preRenderScene(gl, state);
                this._renderScene(gl, state);
                vrDisplay.submitFrame();//把VRLayer的内容提交到头显。完了会清理，除非 preserveDrawingBuffer
            }
        } else {
            //普通渲染
            var camera = this.currentCamera as Laya.Camera;
            state.viewMatrix = camera.viewMatrix;
            state.projectionMatrix = camera.projectionMatrix;
            state.projectionViewMatrix = camera.projectionViewMatrix;
            state.viewport = camera.viewport;
            this._preRenderScene(gl, state);
            this._renderScene(gl, state);
        }
        this.lateRender(state);//渲染之后
        this._set2DRenderConfig(gl);//设置2D配置
        return 1;
    }
}
