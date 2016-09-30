
//https://toji.github.io/webvr-samples/05-room-scale.html

var stageRectWidth = 2;
var stageREctLength = 2;
var frameData: VRFrameData = null;
var vrDisplay: VRDisplay = null;
var webglCanvas: HTMLCanvasElement = null;
var viewMat = new Float32Array(16);

if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(function (displays: VRDisplay[]) {
        if (displays.length > 0) {
            vrDisplay = displays[0];
            vrDisplay.depthNear = 0.1;
            vrDisplay.depthFar = 1024.0;
            //init WebGL
            var stageInfo = vrDisplay.stageParameters;
            if (stageInfo && stageInfo.sizeX > 0 && stageInfo.sizeZ > 0) {
                //可玩区域
            } else {

            }
            //vrDisplay.resetPose(); 设置当前位置为原点
            if (vrDisplay.capabilities.canPresent) {
                console.log('vrDisplay.capabilities.canPresent=true');//这个什么意思呢
            }
        }
    });
} else {
    alert('not support');
}

function onResize() {
    if (vrDisplay && vrDisplay.isPresenting) {
        var leftEye = vrDisplay.getEyeParameters('left');
        var rightEye = vrDisplay.getEyeParameters('right');
        webglCanvas.width = leftEye.renderWidth * 2;
        webglCanvas.height = leftEye.renderHeight;
    } else {
        console.log('onResize ');
    }
}

/**
 * 把view矩阵转换一下，从坐姿空间转换成站立空间
 */
function getStandingViewMatrix(out, view) {
    if (vrDisplay.stageParameters) {
        vrDisplay.stageParameters.sittingToStandingTransform;
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

function renderSceneView(proj:Float32Array, view:Float32Array, pose:VRPose){
    //draw scene
    
    //根据位置好朝向画调试信息。
    pose.orientation;
    pose.position;
}

function onAnimFrm() {
    //stat.begin();
    //gl.clear
    if(vrDisplay){
        vrDisplay.requestAnimationFrame(onAnimFrm); //这个帧数更高
        vrDisplay.getFrameData(frameData);
        if( vrDisplay.isPresenting){
            //左半屏
            //glViewPort(0,0,webglCanvas.width/2,webglCanvas.height);
            getStandingViewMatrix(viewMat,frameData.leftViewMatrix);
            renderSceneView(frameData.leftProjectionMatrix,viewMat,frameData.pose);
            //右半屏
            //gl.viewport(webglCanvas.width * 0.5, 0, webglCanvas.width * 0.5, webglCanvas.height);
            getStandingViewMatrix(viewMat, frameData.rightViewMatrix);
            renderSceneView(frameData.rightProjectionMatrix, viewMat, frameData.pose);
            vrDisplay.submitFrame();//把VRLayer的内容提交到头显。完了会清理，除非 preserveDrawingBuffer
        }
    }else{
        window.requestAnimationFrame(onAnimFrm);
        //do nothing
    }
    //stat.end();
}