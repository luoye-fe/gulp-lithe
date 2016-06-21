
define('conf/Operation/m-share.js',function(require){

    var $ = require('$');
//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.


// 返回顶部
    var oTotop = $('.totop')[0];
        if(oTotop){
            oTotop.style.display='none';
            window.onscroll = function(){
                if(document.body.scrollTop>50){
                    oTotop.style.display='block';
                }else{
                    oTotop.style.display='none';
                }
            };
            oTotop.onclick=function(){
                // var docBody =;
                gotoTop( document.body,300)
            };
        }
        function gotoTop(obj,time){
            if(time>30){
                var s = Math.round(time/30);
            }else{
                var s = 1;
            }
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                var t = obj.scrollTop;
                var speed = (0-t)/(s/2);
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                obj.scrollTop = t + speed;
                var bOk = true;
                if(obj.scrollTop!=0){
                    bOk = false;
                }
                if(bOk){
                    clearInterval(obj.timer);
                }
            },30)
        }

    // ;(function($){
    //     'use strict';
    //     var $win = $(window);
    //     var $doc = $(document);
    //     $.fn.dropload = function(options){  
    //         return new MyDropLoad(this, options);
    //     };
    //     var MyDropLoad = function(element, options){
    //         var me = this;
    //         me.$element = $(element);
    //         me.insertDOM = false;
    //         me.loading = false;
    //         me.isLock = false;
    //         me.init(options);
    //     };

    //     // 初始化
    //     MyDropLoad.prototype.init = function(options){
    //         var me = this;
    //         me.opts = $.extend({}, {
    //             scrollArea : me.$element,                                            // 滑动区域
    //             domUp : {                                                            // 上方DOM
    //                 domClass   : 'dropload-up',
    //                 domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
    //                 domUpdate  : '<div class="dropload-update">↑释放更新</div>',
    //                 domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    //             },
    //             domDown : {                                                          // 下方DOM
    //                 domClass   : 'dropload-down',
    //                 domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
    //                 domUpdate  : '<div class="dropload-update">↓释放加载</div>',
    //                 domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    //             },
    //             distance : 50,                                                       // 拉动距离
    //             loadUpFn : '',                                                       // 上方function
    //             loadDownFn : ''                                                      // 下方function
    //         }, options);

    //         // 判断滚动区域
    //         if(me.opts.scrollArea == window){
    //             me.$scrollArea = $win;
    //         }else{
    //             me.$scrollArea = me.opts.scrollArea;
    //         }

    //         // 绑定触摸
    //         me.$element.on('touchstart',function(e){
    //             if(!me.loading && !me.isLock){
    //                 fnTouches(e);
    //                 fnTouchstart(e, me);
    //             }
    //         });
    //         me.$element.on('touchmove',function(e){
    //             if(!me.loading && !me.isLock){
    //                 fnTouches(e, me);
    //                 fnTouchmove(e, me);
    //             }
    //         });
    //         me.$element.on('touchend',function(){
    //             if(!me.loading && !me.isLock){
    //                 fnTouchend(me);
    //             }
    //         });
    //     };

    //     // touches
    //     function fnTouches(e){
    //         if(!e.touches){
    //             e.touches = e.originalEvent.touches;
    //         }
    //     }

    //     // touchstart
    //     function fnTouchstart(e, me){
    //         me._startY = e.touches[0].pageY;
    //         // 判断滚动区域
    //         if(me.opts.scrollArea == window){
    //             me._meHeight = $win.height();
    //             me._childrenHeight = $doc.height();
    //             // console.log(1);
    //         }else{
    //             me._meHeight = me.$element.height();
    //             me._childrenHeight = $('.box').height();
    //         }
    //         me._scrollTop = me.$scrollArea.scrollTop();
    //         // console.log(me._scrollTop);
    //     }

    //     // touchmove
    //     function fnTouchmove(e, me){
    //         me._curY = e.touches[0].pageY;
    //         me._moveY = me._curY - me._startY;

    //         if(me._moveY > 0){
    //             me.direction = 'down';
    //         }else if(me._moveY < 0){
    //             me.direction = 'up';
    //         }

    //         var _absMoveY = Math.abs(me._moveY);

    //         // 加载上方
    //         if(me.opts.loadUpFn != '' && me._scrollTop <= 0 && me.direction == 'down'){
    //             e.preventDefault();
    //             if(!me.insertDOM){
    //                 me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
    //                 me.insertDOM = true;
    //             }

    //             me.$domUp = $('.'+me.opts.domUp.domClass);
    //             fnTransition(me.$domUp,0);

    //             // 下拉
    //             if(_absMoveY <= me.opts.distance){
    //                 me._offsetY = _absMoveY;
    //                 // 待解决：move时会不断清空、增加dom，有可能影响性能，下同
    //                 me.$domUp.html('').append(me.opts.domUp.domRefresh);
    //             // 指定距离 < 下拉距离 < 指定距离*2
    //             }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
    //                 me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
    //                 me.$domUp.html('').append(me.opts.domUp.domUpdate);
    //             // 下拉距离 > 指定距离*2
    //             }else{
    //                 me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
    //             }

    //             me.$domUp.css({'height': me._offsetY});
    //         }

    //         // 加载下方
    //         if(me.opts.loadDownFn != '' && me._childrenHeight <= (window.screen.height+me._scrollTop) && me.direction == 'up'){
    //             e.preventDefault();
    //             // console.info("insertDOM");
    //             if(!me.insertDOM){
    //                 me.$element.append('<div class="'+me.opts.domDown.domClass+'"></div>');
    //                 me.insertDOM = true;
    //             }

    //             me.$domDown = $('.'+me.opts.domDown.domClass);
    //             fnTransition(me.$domDown,0);

    //             // 上拉
    //             if(_absMoveY <= me.opts.distance){
    //                 me._offsetY = _absMoveY;
    //                 me.$domDown.html('').append(me.opts.domDown.domRefresh);
    //             // 指定距离 < 上拉距离 < 指定距离*2
    //             }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
    //                 me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
    //                 me.$domDown.html('').append(me.opts.domDown.domUpdate);
    //             // 上拉距离 > 指定距离*2
    //             }else{
    //                 me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
    //             }

    //             me.$domDown.css({'height': me._offsetY});
    //             me.$scrollArea.scrollTop(me._offsetY+me._scrollTop);
    //         }
    //     }

    //     // touchend
    //     function fnTouchend(me){
    //         var _absMoveY = Math.abs(me._moveY);
    //         if(me.insertDOM){
    //             if(me.direction == 'down'){
    //                 me.$domResult = me.$domUp;
    //                 me.domLoad = me.opts.domUp.domLoad;
    //             }else if(me.direction == 'up'){
    //                 me.$domResult = me.$domDown;
    //                 me.domLoad = me.opts.domDown.domLoad;
    //             }

    //             fnTransition(me.$domResult,300);
    //             if(_absMoveY > me.opts.distance){
    //                 me.$domResult.css({'height':me.$domResult.children().height()});
    //                 me.$domResult.html('').append(me.domLoad);
    //                 fnCallback(me);
    //             }else{
    //                 me.$domResult.css({'height':'0'}).on('webkitTransitionEnd',function(){
    //                     me.insertDOM = false;
    //                     $(this).remove();
    //                 });
    //             }
    //             me._moveY = 0;
    //         }
    //     }

    //     // 回调
    //     function fnCallback(me){
    //         me.loading = true;
    //         if(me.opts.loadUpFn != '' && me.direction == 'down'){
    //             me.opts.loadUpFn(me);
    //         }else if(me.opts.loadDownFn != '' && me.direction == 'up'){
    //             me.opts.loadDownFn(me);
    //         }
    //     }

    //     // 锁定
    //     MyDropLoad.prototype.lock = function(){
    //         var me = this;
    //         me.isLock = true;
    //     };

    //     // 解锁
    //     MyDropLoad.prototype.unlock = function(){
    //         var me = this;
    //         me.isLock = false;
    //     };

    //     // 重置
    //     MyDropLoad.prototype.resetload = function(){
    //         var me = this;
    //         if(!!me.$domResult){
    //             me.$domResult.css({'height':'0'}).on('webkitTransitionEnd',function(){
    //                 me.loading = false;
    //                 me.insertDOM = false;
    //                 $(this).remove();
    //             });
    //         }
    //     };

    //     // css过渡
    //     function fnTransition(dom,num){
    //         dom.css({
    //             '-webkit-transition':'all '+num+'ms',
    //             'transition':'all '+num+'ms'
    //         });
    //     }
    // })(window.Zepto || window.jQuery);


// a切换
$(document).ready(function(){
    // var oCouponsa = document.getElementById('couponsa'); 
    $('.couponsa').on('click',function(){
        $(this).css('color','#999');
        $(this).find('.fr').css('borderColor','#999');
        $(this).find('.buy').removeClass('buy').addClass('buy2');
    });
    // 选项卡
    var oTabLi = $('.section5-box-ul li');
    var oTabDiv = $('.section5-cont .tabdiv');
    oTabLi.on('click',function(){
        $(this).addClass('section5-boxul-li').siblings().removeClass('section5-boxul-li');
        oTabDiv.eq($(this).index()).show().siblings().hide();
    });
});

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})($);

});