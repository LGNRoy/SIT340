var container;
var captcha;
var mask;
var textbox;
var pointerArr = []; //鼠标移动坐标数组

window.addEventListener('load',function(){
  console.log("ready");
  init();
});

function init() {
  console.log("init");

  container = getContainer();
  mask = getMask();
  container.appendChild(mask);

}

var getContainer = function(){
  var div = document.getElementsByClassName('scraptcha')[0];
  div.style.width="390px";
  // div.style.background="../img/banner2.png";
  return div;
}

var getMask = function(){
  var canvas = document.createElement("canvas");
  var width = container.offsetWidth;
  var height = container.offsetHeight;
  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");
  canvas.setAttribute("class", "mask");

  canvas.id = "myCanvas";

  var ctx = canvas.getContext("2d");

  //绘制黑色矩形
  ctx.beginPath();
  // ctx.fillStyle = "#939393";
  ctx.fillStyle = "#DFDFDF";
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();

  bindFunction(canvas, ctx)

  return canvas;
}

var bindFunction = function(canvas, ctx) {
  var xPointer = 0;//鼠标当前x坐标
  var yPointer = 0;//鼠标当前y坐标

  var div = document.getElementsByClassName('scraptcha')[0];
  var maskPosition = getElemPos(div);
  var xMask = maskPosition.x;
  var yMask = maskPosition.y;
  console.log(yMask);

  var isMouseDown = false;
  var isIncanvas = false;

  canvas.addEventListener('mousemove',function(event){
    var e=window.event||event;//2017-12-06

    if(isMouseDown && isIncanvas) {
      xPointer = e.x;
      yPointer = e.y;
      pointerArr.push({x:xPointer - xMask, y:yPointer - yMask});
      circleReset();
    }

  }, false);

  canvas.addEventListener('mouseover', function(event){
    this.style.cursor = "pointer";//改编鼠标为pointer
    isIncanvas = true;
    // console.log("isIncanvas: true");
  });

  canvas.addEventListener('mouseout', function(event){
    isIncanvas = false;
    // console.log("isIncanvas: false");
  });

  canvas.addEventListener('mousedown', function(event){
    isMouseDown = true;
    // console.log("mousedown: false");
    // console.log("down");

    var e=window.event||event;//2017-12-06
    isDown = true;
    xPointer = e.x;
    yPointer = e.y;
    pointerArr.push({x:xPointer - xMask, y:yPointer - yMask});
    circleReset();

    if (!document.getElementById("captcha")) {
      textbox = getTextbox();
      document.getElementById("l-login").appendChild(textbox);
    }

  });

  canvas.addEventListener('mouseup', function(event){
    isMouseDown = false;
    // console.log("up");

    pointerArr = [];
    // console.log("mousedown: true");
  });

  //圆形橡皮檫
  function circleReset() {
    // console.log("reset");
    console.log(pointerArr);
    var start = pointerArr[0];

    ctx.lineCap = "round";　　 //设置线条两端为圆弧
    ctx.lineJoin = "round";　　 //设置线条转折为圆弧
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 30;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    if(pointerArr.length == 1) {
      ctx.lineTo(start.x + 1, start.y + 1);
    } else {
      for (var i=1;i<pointerArr.length;i++) {
        ctx.lineTo(pointerArr[i].x, pointerArr[i].y);
        ctx.moveTo(pointerArr[i].x, pointerArr[i].y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

var getTextbox = function(){

  var div_outter = document.createElement('div');
  div_outter.setAttribute("class","input-group m-b-20");
  div_outter.setAttribute("id","captcha");

  var span = document.createElement('span');
  span.setAttribute("class","input-group-addon");

  var i = document.createElement('i');
  i.setAttribute("class","zmdi zmdi-arrow-forward");

  span.appendChild(i);
  div_outter.appendChild(span);

  var div_inner = document.createElement('div');
  div_inner.setAttribute("class","fg-line");

  var input = document.createElement('input');
  input.setAttribute("type","text");
  input.setAttribute("class","form-control");
  input.setAttribute("placeholder","Captcha");
  input.setAttribute("regex","^\\w+");

  div_inner.appendChild(input);
  div_outter.appendChild(div_inner);

  return div_outter;
}

var getElemPos = function(obj) {
  var pos = {"top": 0, "left": 0};
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      pos.top += obj.offsetTop;
      pos.left += obj.offsetLeft;
      obj = obj.offsetParent;
    }
  } else if (obj.x) {
    pos.left += obj.x;
  } else if (obj.x) {
    pos.top += obj.y;
  }
  return {x: pos.left, y: pos.top};
}
