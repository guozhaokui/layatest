'use strict';
///<reference path="../conchinclude.d.ts" />
import * as conchAsync from 'Async'
var canv = document.createElement('canvas');
var ctx = canv.getContext('2d');
var img1: HTMLImageElement = null;

class Vec3{
    x=0;
    y=0;
    z=0;
    constructor(x:number,y:number,z:number){
        this.x=x;this.y=y;this.z=z;
    }
}
var datas=new Array<Vec3>(10).fill(new Vec3(0,0,0));

//init
async function init() {
    /*
    img1 = await conchAsync.loadImage('');
    if (!img1)
        return;
    */
    ctx.fillStyle='#ffffff';
    datas.forEach((v,i,a)=>{
        v.z=i;
    });
    setInterval(loop,15);
}
//start loop
var tm = 0;
function loop(){
    var mid = canv.width/2;
    var scrh = canv.height;
    tm+=0.01;
    ctx.fillRect(mid-1,0,2,scrh)
    render(0,0,mid,scrh,true);
    render(mid,0,mid,scrh,false);
}

init();

function render(x:number,y:number,w:number,h:number,left:boolean){
    //ctx.fillRect(x,y,w,h);
    ctx.save();
    ctx.translate(x+w/2,h/2);
    for( var cy=-400; cy<400; cy+=50){
        for( var cx=-400; cx<400; cx+=50){
            ctx.fillRect(cx,cy,4,4);
        }
    }
    ctx.restore();
    ctx.save();
    ctx.translate(x,y);
    var off = Math.sin(tm)*10;
    ctx.translate(w/2-(left?off:(-off)),h/2);
    ctx.fillRect(0,0,10,10);
    ctx.restore();
}

