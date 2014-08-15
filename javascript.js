window.onload = function() {
    init();
}

var coding;
window.onkeydown = function(e) {
    if (e.ctrlKey) {
        if (e.keyCode == 13) {
            autoFormat();
            compilar();
        }
    }
    if (e.keyCode == 9) {
       var val = coding.value.toString(),
       start = coding.selectionStart,
       end = coding.selectionEnd;
       selec = spaceTab + val.substring(start, end).replace(/(\r\n|\n|\r)/g,"\n"+spaceTab);
       var cant = (selec.length - val.substring(start, end).length)/spaceTab.length;
       coding.value = val.substring(0, start) + selec + val.substring(end);
       coding.selectionStart = start + spaceTab.length;
       coding.selectionEnd = end + spaceTab.length*cant;
       return false;
   }
}

function init() {
    coding = document.getElementById("coding");
    canvas = document.getElementById("canvis");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    spaceTab = "  ";
    //generar();
    autoFormat();

    frameCount = -1;
    mainLoop = setInterval(function(){
        if(width != window.innerWidth || height != window.innerHeight){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            width = canvas.width;
            height = canvas.height;
        }
        frameCount++;
        loop(); 
    }, 1/60);
}

function autoFormat(){
    var ori = coding.value;
    var lines = ori.split(/\r\n|\r|\n/g);
    var nueva = "";
    var esp = 0;
    for(var i = 0; i < lines.length; i++){
        var line = lines[i].toString().trim().replace(/(\r\n|\n|\r)/g,"");
        esp -= (line.split("}").length - 1);
        for(var j = 0; j < esp; j++){
            nueva += spaceTab;
        } 
        esp += (line.split("{").length - 1); 
        nueva += line;
        if(i < lines.length-1) nueva += "\n";
    }
    //console.log(lines);
    coding.value = nueva;
}

function compilar(){
    /*
    code = document.getElementById("code");
    code.innerHTML = document.getElementById("coding").value;
    */
    var borrar = document.getElementById("code");
    document.body.removeChild(borrar);
    
    var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.id = "code";
    script.text  = document.getElementById("coding").value;
    document.body.appendChild(script);
}

var loop = function(){

}

//// "Processing"
// Colors
function background(c){
  ctx.fillStyle = c;
  ctx.fillRect(0, 0, width, height);
  ctx.fill();
}

function color(r,g,b){
    if(r < 0) r = 0;
    if(r > 256) r = 255;
    if(g < 0) g = 0;
    if(g > 256) g = 255;
    if(b < 0) b = 0;
    if(b > 256) b = 255;
    if (g === undefined) {
          g = b = r;
    }
    var col = "#";
    var cc = Math.floor(r).toString(16);
    if(cc.length == 1) cc = "0"+cc;
    col += cc;
    cc = Math.floor(g).toString(16);
    if(cc.length == 1) cc = "0"+cc;
    col += cc;
    cc = Math.floor(b).toString(16);
    if(cc.length == 1) cc = "0"+cc;
    col += cc;
    return col;
}
function fill(c){
    ctx.fillStyle = c;
}
function stroke(c){
    ctx.strokeStyle = c;
}
// Draw
function arc(x, y, d, a, a2){
    ctx.beginPath();
    ctx.arc(x,y,d/2,a,a2);
}
function circle(x, y, d){
    ctx.beginPath();
    ctx.arc(x,y,d/2,0,2*Math.PI);
}
function line(x, y, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
}
function rect(x, y, w, h){
    ctx.fillRect(x, y, w, h);
}
function star(x, y, d, c, a, md){
    var r = d/2;
    var da = Math.PI*2/(c*2);
    ctx.beginPath();
    ctx.moveTo(x+Math.cos(a)*r, y+Math.sin(a)*r);
    for(var i = 1; i < c*2; i+=2){
        ctx.lineTo(x+Math.cos(a+da*i)*r*md, y+Math.sin(a+da*i)*r*md);
        ctx.lineTo(x+Math.cos(a+da*(i+1))*r, y+Math.sin(a+da*(i+1))*r);   
    }
    ctx.closePath();
}
function poly(x, y, d, c, a){
    var r = d/2;
    var da = Math.PI*2/c;
    ctx.beginPath();
    ctx.moveTo(x+Math.cos(a)*r, y+Math.sin(a)*r);
    for(var i = 1; i < c; i++){
        ctx.lineTo(x+Math.cos(a+da*i)*r, y+Math.sin(a+da*i)*r);   
    }
    ctx.closePath();
}

//Math
var PI = Math.PI;
var TWO_PI = Math.PI*2;
function abs(v){
    return Math.abs(v);
}
function atan2(y, x){
    return Math.atan2(y, v);
}
function ceil(v){
    return Math.ceil(v);
}
function cos(v){
    return Math.cos(v);
}
function exp(v){
    return Math.exp(v);
}
function floor(v){
    return Math.floor(v);
}
function log(v){
    return Math.log(v);
}
function max(v, v2){
    return Math.max(v, v2);
}
function min(v, v2){
    return Math.min(v, v2);
}
function pow(v, v2){
    return Math.pow(v, v2);
}
function random(min, max){
    if (min === undefined) {
        return Math.random();
    }else if(max === undefined){
        return Math.random()*min;
    }else{
        return min + (max-min) * Math.random(); 
    }
}
function round(v){
    return Math.round(v);
}
function sin(v){
    return Math.sin(v);
}
function sqrt(v){
    return Math.sqrt(v);
}
function tan(v){
    return Math.tan(v);
}