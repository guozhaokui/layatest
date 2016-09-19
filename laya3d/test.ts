
function navData(dt: ArrayBuffer, pos: number): void {
    var st = pos ;
    if (st < 0) st = 0;
    var ed = st + 32;
    if (ed >= dt.byteLength) ed = dt.byteLength - 1;
    var res = '';
    var u8arr = new Uint8Array(dt);
    var ci = 0;
    for (var i = st; i < ed; i++ , ci++) {
        var cv = u8arr[i].toString(16);
        if(cv.length<2)cv='0'+cv;
        res += cv;
        if(ci > 0 && (ci+1) % 16 == 0) res += '\n';
        else res += ' ';
    }
    console.log(res);
}
