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
    generar();
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


function generar() {
    var c = document.getElementById("canvis");
    var ctx = c.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var grd = ctx.createLinearGradient(0, 0, 0, height);
    grd.addColorStop(0, "#ADEDDA");
    grd.addColorStop(1, "#63DA9E");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    circulin(ctx, width / 2, height / 2, height * 0.8, 200);

    var cant = Math.random() * 3 + 2;
    var tam = 26;
    for (var i = 0; i < cant; i++) {
        var x = (0.1 + Math.random() * 0.8) * width;
        var y = (0.1 + Math.random() * 0.8) * height;
        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowColor = "#00A668";
        ctx.strokeStyle = "#FEFEFE";
        for (var j = y; j < height; j += 6) {
            ctx.moveTo(x, j);
            ctx.lineTo(x, j + 3);
            ctx.stroke();
        }
        ctx.shadowOffsetX = 0;

        ctx.fillStyle = "#3A3A34";
        ellipse(ctx, x, y, tam, tam);
        ctx.stroke();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.fillStyle = "B0FA29";
        ctx.strokeStyle = "#33332F";
        ellipse(ctx, x, y, tam * 0.2, tam * 0.2);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(x, y, tam * 1.2, Math.random() * (Math.PI / 4) * 3 + (Math.PI / 4) * 3, Math.PI * 1.5 + Math.random() * (Math.PI / 4) * 3);
        ctx.strokeStyle = "#B0FA29";
        ctx.stroke();


    }
}

function ellipse(context, cx, cy, rx, ry) {
    context.save(); // save state
    context.beginPath();
    context.translate(cx - rx, cy - ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.restore(); // restore to original state
}

function circulin(ctx, x, y, tam, cant) {
    ctx.lineWidth = 2;
    var da = (Math.PI * 2) / cant;
    var rad = tam / 2;
    ctx.strokeStyle = "#FEFEFE";
    for (var i = 0; i < cant; i++) {
        ctx.beginPath();
        ctx.lineCap = "butt";
        var dx = Math.cos(da * i);
        var dy = Math.sin(da * i);
        var tt = 0.6 + (Math.random() * 0.4);
        var ct = rad * 0.01;
        ctx.moveTo(x + dx * rad, y + dy * rad);
        ctx.lineTo(x + dx * rad * tt, y + dy * rad * tt);
        ctx.stroke();
        ellipse(ctx, x + dx * (rad * tt - ct), y + dy * (rad * tt - ct), ct, ct);
        ctx.stroke();
    }
    ellipse(ctx, x, y, rad, rad);
    ctx.stroke();
}

var loop = function(){
}