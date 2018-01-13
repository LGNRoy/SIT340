var scraptchaContainer;
var scraptchaCAPTCHA;
var scraptchaTextbox;

window.addEventListener('load',function(){
  console.log("ready");
  init();
});

function init() {
  console.log("init");
  scraptchaContainer = document.getElementsByClassName('scraptcha')[0];
  scraptchaCAPTCHA = getCAPTCHA();
  scraptchaContainer.appendChild(scraptchaCAPTCHA);
}

var getCAPTCHA = function(){
  var captcha = document.createElement('canvas');
  return captcha;
}

var getTextbox = function(){
  var textbox = document.createElement('input');
  textbox.setAttribute("type","password");
  textbox.setAttribute("class","form-control");
  textbox.setAttribute("placeholder","Captcha");
  textbox.setAttribute("regex","");


  var textboxContainer = document.createElement('div');
}
