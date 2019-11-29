var $ = require('jquery');
// ------------- 变量 ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var isSafari =  (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //敏感度 越低越敏感
var slideDurationSetting = 1000; //事件锁定时长
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- 滚动代码 ------------- //
function parallaxScroll(evt) {
  console.log(evt)
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } 
  else if(isSafari){
    delta = evt.wheelDelta*10;
  }else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }
//  console.log(delta)
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- 锁定 ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- 事件监听 ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
// $(window).on('mousewheel', function(evt){

//   // _.throttle(, 60)
//   // console.log(evt)
//   parallaxScroll(evt)
// })
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- slide动画 ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

function firstItem() {
  var $currentSlide = $(".background").eq(0);
  $(".background").removeClass("up-scroll").removeClass("down-scroll");
  // $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  currentSlideNumber = 0
}
function lastItem() {
  var $currentSlide = $(".background").eq(($(".background").length-1));
  $(".background").removeClass("up-scroll");
  $(".background").addClass("down-scroll");
  $currentSlide.removeClass("down-scroll");
  currentSlideNumber=$(".background").length-1;
}


// ------------- 图片载入 ------------- //
var imgs = [
 "url(images/img1.jpg)",
 "url(images/img2.jpg)",
 "url(images/img3.jpg)",
 "url(images/img4.jpg)",
]
imgs.map(
  function(item,key){
    var style = "<style>::before{ background-image:" + item+ ";}</style>"
    $('.background').eq(key).find(".img-container").css({
      "background-image":item
    })
  }
)
// ------------- 事件出发滚动 ------------- //
$("#logo").on('click',function(){
  firstItem()
})
$("#aboutUs").on('click',function(){
  lastItem()
})
$("#beian").click(function(event) {
 window.open("http://www.beian.miit.gov.cn/publish/query/indexFirst.action ");   
});
