define("conf/Actcms/Actcms-cont.js",function(require,o,t){function s(o,t){if(t>30)var s=Math.round(t/30);else var s=1;clearInterval(o.timer),o.timer=setInterval(function(){var t=o.scrollTop,e=(0-t)/(s/2);e=e>0?Math.ceil(e):Math.floor(e),o.scrollTop=t+e;var n=!0;0!=o.scrollTop&&(n=!1),n&&clearInterval(o.timer)},30)}var $=require("$"),e=navigator.userAgent,n=(e.indexOf("Android")>-1,!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),d=$(".totop")[0],i=$(".section5-box-div")[0],l=i.offsetTop;console.log(l),d&&(d.style.display="none",n?$(window).on("touchmove scroll",function(){document.body.scrollTop>50?d.style.display="block":d.style.display="none",document.body.scrollTop>l?$(".section5-box-ul").addClass("fixed"):$(".section5-box-ul").removeClass("fixed")}):$(window).on("scroll",function(){document.body.scrollTop>50?d.style.display="block":d.style.display="none",document.body.scrollTop>l?$(".section5-box-ul").addClass("fixed"):$(".section5-box-ul").removeClass("fixed")}),d.onclick=function(){s(document.body,300)}),$(document).ready(function(){$(".couponsa").on("click",function(){$(this).css("color","#999"),$(this).find(".fr").css("borderColor","#999"),$(this).find(".buy").removeClass("buy").addClass("buy2")})}),function($){"use strict";function o(o){o.touches||(o.touches=o.originalEvent.touches)}function t(o,t){t._startY=o.touches[0].pageY,t.opts.scrollArea==window?(t._meHeight=i.height(),t._childrenHeight=l.height()):(t._meHeight=t.$element.height(),t._childrenHeight=$(".box").height()),t._scrollTop=t.$scrollArea.scrollTop()}function s(o,t){t._curY=o.touches[0].pageY,t._moveY=t._curY-t._startY,t._moveY>0?t.direction="down":t._moveY<0&&(t.direction="up");var s=Math.abs(t._moveY);""!=t.opts.loadUpFn&&t._scrollTop<=0&&"down"==t.direction&&(o.preventDefault(),t.insertDOM||(t.$element.prepend('<div class="'+t.opts.domUp.domClass+'"></div>'),t.insertDOM=!0),t.$domUp=$("."+t.opts.domUp.domClass),d(t.$domUp,0),s<=t.opts.distance?(t._offsetY=s,t.$domUp.html("").append(t.opts.domUp.domRefresh)):s>t.opts.distance&&s<=2*t.opts.distance?(t._offsetY=t.opts.distance+.5*(s-t.opts.distance),t.$domUp.html("").append(t.opts.domUp.domUpdate)):t._offsetY=t.opts.distance+.5*t.opts.distance+.2*(s-2*t.opts.distance),t.$domUp.css({height:t._offsetY})),""!=t.opts.loadDownFn&&t._childrenHeight<=window.screen.height+t._scrollTop&&"up"==t.direction&&(o.preventDefault(),t.insertDOM||(t.$element.append('<div class="'+t.opts.domDown.domClass+'"></div>'),t.insertDOM=!0),t.$domDown=$("."+t.opts.domDown.domClass),d(t.$domDown,0),s<=t.opts.distance?(t._offsetY=s,t.$domDown.html("").append(t.opts.domDown.domRefresh)):s>t.opts.distance&&s<=2*t.opts.distance?(t._offsetY=t.opts.distance+.5*(s-t.opts.distance),t.$domDown.html("").append(t.opts.domDown.domUpdate)):t._offsetY=t.opts.distance+.5*t.opts.distance+.2*(s-2*t.opts.distance),t.$domDown.css({height:t._offsetY}),t.$scrollArea.scrollTop(t._offsetY+t._scrollTop))}function e(o){var t=Math.abs(o._moveY);o.insertDOM&&("down"==o.direction?(o.$domResult=o.$domUp,o.domLoad=o.opts.domUp.domLoad):"up"==o.direction&&(o.$domResult=o.$domDown,o.domLoad=o.opts.domDown.domLoad),d(o.$domResult,300),t>o.opts.distance?(o.$domResult.css({height:o.$domResult.children().height()}),o.$domResult.html("").append(o.domLoad),n(o)):o.$domResult.css({height:"0"}).on("webkitTransitionEnd",function(){o.insertDOM=!1,$(this).remove()}),o._moveY=0)}function n(o){o.loading=!0,""!=o.opts.loadUpFn&&"down"==o.direction?o.opts.loadUpFn(o):""!=o.opts.loadDownFn&&"up"==o.direction&&o.opts.loadDownFn(o)}function d(o,t){o.css({"-webkit-transition":"all "+t+"ms",transition:"all "+t+"ms"})}var i=$(window),l=$(document);$.fn.dropload=function(o){return new a(this,o)};var a=function(o,t){var s=this;s.$element=$(o),s.insertDOM=!1,s.loading=!1,s.isLock=!1,s.init(t)};a.prototype.init=function(n){var d=this;d.opts=$.extend({},{scrollArea:d.$element,domUp:{domClass:"dropload-up",domRefresh:'<div class="dropload-refresh">↓下拉刷新</div>',domUpdate:'<div class="dropload-update">↑释放更新</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>'},domDown:{domClass:"dropload-down",domRefresh:'<div class="dropload-refresh">↑上拉加载更多</div>',domUpdate:'<div class="dropload-update">↓释放加载</div>',domLoad:'<div class="dropload-load"><span class="loading"></span>加载中...</div>'},distance:50,loadUpFn:"",loadDownFn:""},n),d.opts.scrollArea==window?d.$scrollArea=i:d.$scrollArea=d.opts.scrollArea,d.$element.on("touchstart",function(s){d.loading||d.isLock||(o(s),t(s,d))}),d.$element.on("touchmove",function(t){d.loading||d.isLock||(o(t,d),s(t,d))}),d.$element.on("touchend",function(){d.loading||d.isLock||e(d)})},a.prototype.lock=function(){var o=this;o.isLock=!0},a.prototype.unlock=function(){var o=this;o.isLock=!1},a.prototype.resetload=function(){var o=this;o.$domResult&&o.$domResult.css({height:"0"}).on("webkitTransitionEnd",function(){o.loading=!1,o.insertDOM=!1,$(this).remove()})}}(window.Zepto||window.jQuery)});