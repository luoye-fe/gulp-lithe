
define('conf/Actcms/Actcms-cont.js',function (require ,exports ,module){

    var $ = require('$');
//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
    var u = navigator.userAgent;  
    var isAndroid = u.indexOf('Android') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// 返回顶部
    var oTotop = $('.totop')[0];
    // var oTabUl = $('.section5-box-div')[0];
    // var oTabTop = oTabUl.offsetTop;
    var oTabUl = $('.section5-box-div')[0]?$('.section5-box-div')[0]:null;
    if(oTabUl){
        var oTabTop = oTabUl.offsetTop;
    }
        if(oTotop){
            oTotop.style.display='none';
            if(isiOS){
                $(window).on('touchmove scroll', function(){
                    if(document.body.scrollTop>50){
                        oTotop.style.display='block';
                    }else{
                        oTotop.style.display='none';
                    }             
                    if(document.body.scrollTop>oTabTop){
                        $('.section5-box-ul').addClass('fixed');
                    }else{
                        $('.section5-box-ul').removeClass('fixed');
                    }
                });
            }else{
                $(window).on('scroll', function(){
                    if(document.body.scrollTop>50){
                        oTotop.style.display='block';
                    }else{
                        oTotop.style.display='none';
                    }             
                    if(document.body.scrollTop>oTabTop){
                        $('.section5-box-ul').addClass('fixed');
                    }else{
                        $('.section5-box-ul').removeClass('fixed');
                    }
                });
            }
            oTotop.onclick=function(){
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
    // var oCouponsa = document.getElementById('couponsa');
    $('.couponsa').on('click',function(){
        $(this).css('color','#999');
        $(this).find('.fr').css('borderColor','#999');
        $(this).find('.buy').removeClass('buy').addClass('buy2');
    });
});