define("conf/Actcms/Actcms-cont.js",function(require,i,o){function t(i,o){if(o>30)var t=Math.round(o/30);else var t=1;clearInterval(i.timer),i.timer=setInterval(function(){var o=i.scrollTop,e=(0-o)/(t/2);e=e>0?Math.ceil(e):Math.floor(e),i.scrollTop=o+e;var n=!0;0!=i.scrollTop&&(n=!1),n&&clearInterval(i.timer)},30)}var $=require("$"),e=navigator.userAgent,n=(e.indexOf("Android")>-1,!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),s=$(".totop")[0],c=$(".section5-box-div")[0]?$(".section5-box-div")[0]:null;if(c)var a=c.offsetTop;s&&(s.style.display="none",n?$(window).on("touchmove scroll",function(){document.body.scrollTop>50?s.style.display="block":s.style.display="none",document.body.scrollTop>a?$(".section5-box-ul").addClass("fixed"):$(".section5-box-ul").removeClass("fixed")}):$(window).on("scroll",function(){document.body.scrollTop>50?s.style.display="block":s.style.display="none",document.body.scrollTop>a?$(".section5-box-ul").addClass("fixed"):$(".section5-box-ul").removeClass("fixed")}),s.onclick=function(){t(document.body,300)}),$(".couponsa").on("click",function(){$(this).css("color","#999"),$(this).find(".fr").css("borderColor","#999"),$(this).find(".buy").removeClass("buy").addClass("buy2")})}),define("conf/Actcms/Actcms-sec.js",function(require,i,o){function t(){switch(f){case m:r++,e(r,$("div.oSection5 ul"));break;case v:u++,e(u,$("div.oSection6 ul")),console.log(u);break;case b:h++,e(h,$("div.oSection7 ul"));break;case x:p++,e(p,$("div.oSection8 ul"))}}function e(i,o){c.query("/op/actcms/getdatabypage",{metaId:f,pageNum:i},function(i){if(i.success)if(0==i.data.list.length)g.html("暂无更多数据");else{for(var t=i.data.list[0].itemData,e=0;e<t.length;e++){var n='<li class="fl section5-cont1-li" id="oS5ContLiL"><div class="section5-cont-li-div" shopId="'+t[e].shopId+'" productId="'+t[e].productId+'" sn="'+t[e].sn+'" icon="'+i.icon+'"><a href="'+a+"?shopId="+t[e].shopId+"&productId="+t[e].productId+'"><img src="'+t[e].productPicUrl+'" alt="国美+"><p>'+t[e].productName+'</p><div class="clearfix section5-bottom"><div class="amount fl"><p class="amount-div"><i>￥</i>'+t[e].productPrice+'</p></div><span class="snapUp fr">立即抢购</span></div></a><a href="'+a+"?shopId="+t[e].shopId+"&productId="+t[e].productId+'" class="couponsa" style="color:#ee2f2f;"><div class="coupons"><div class="fl buy"></div><div class="fr"><i>￥</i><span>'+t[e].coupon+"</span></div></div></a></div></li>";o.append(n),$("div.tabdiv").height("")}for(var s=$(".coupons span"),e=0,c=s.length;c>e;e++)""!==s[e].innerHTML&&" "!==s[e].innerHTML&&"undefined"!==s[e].innerHTML||s.eq(e).parents(".coupons").hide()}})}function n(i,o,t){i.click(function(){var i=$(this).attr("productid"),e=$(this).attr("shopid");BP.send({event_id:o,product_id:i,shop_id:e,name:t})})}function s(i,o,t){i.click(function(){$(this).attr("oimgpic"),$(this).attr("href");BP.send({event_id:o,name:t})})}require("$"),require("utils/appInterface.js"),require("mods/buried.js"),require("conf/Actcms/Actcms-cont.js"),require("vendors/lazyload");var c=(require("utils/base64.js"),require("utils/ajax.js")),a=(require("vendors/dropload.js"),location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1],location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1]+"/product/index?");$("img").picLazyLoad({effect:"fadeIn"}),wx.ready(function(){wx.hideAllNonBaseMenuItem(),wx.showMenuItems({menuList:["menuItem:share:timeline","menuItem:share:appMessage","menuItem:favorite","menuItem:openWithSafari"]}),wx.onMenuShareTimeline({title:shareTitle,link:shareLink,desc:shareDesc,imgUrl:shareImg,success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:shareTitle,link:shareLink,desc:shareDesc,imgUrl:shareImg,type:"",dataUrl:"",success:function(){},cancel:function(){}}),wx.onMenuShareQQ({title:title,desc:desc,link:link,imgUrl:imgUrl,success:function(){},cancel:function(){}})});var d=$(".section5-box-ul li"),l=$(".section5-cont .tabdiv"),r=$("div.oSection5").attr("page"),u=$("div.oSection6").attr("page"),h=$("div.oSection7").attr("page"),p=$("div.oSection8").attr("page"),f=$(".section5-box-ul li").eq(0).attr("metaidx"),m=$("li.oSection5").attr("metaidx"),v=$("li.oSection6").attr("metaidx"),b=$("li.oSection7").attr("metaidx"),x=$("li.oSection8").attr("metaidx"),g=$(".click-more").eq(0),y=4;d.on("click",function(){var i=l.eq($(this).index());y=i.find("li").length,y>4?$("div.tabdiv").eq($(this).index()).height(""):$("div.tabdiv").height($(window).height());$(this).index();$(this).addClass("section5-boxul-li").siblings().removeClass("section5-boxul-li"),l.eq($(this).index()).show().siblings().hide(),g=$(".click-more").eq($(this).index()),g.show().siblings().hide(),f=l.eq($(this).index()).attr("metaidx"),console.log(g)});$("body").dropload({loadUpFn:function(i){setTimeout(function(){i.resetload(),location.reload(!0)},500)}});$(".click-more").on("click",function(){t()});BP.send({event_id:"hd00W000",desc:"活动页"}),n($(".section1"),"Mhd0W002","H5-模块2"),n($(".section2"),"Mhd0W003","H5-模块3"),n($(".section3"),"Mhd0W004","H5-模块4"),n($(".section4"),"Mhd0W005","H5-模块5"),n($(".oSection5"),"Mhd0W006","H5-模块6"),n($(".oSection6"),"Mhd0W007","H5-模块7"),n($(".oSection7"),"Mhd0W008","H5-模块8"),n($(".oSection8"),"Mhd0W009","H5-模块9"),s($(".oSection9"),"Mhd0A000","活动位"),s($(".oSection0"),"Mhd0A001","H5-模块1"),$(".opg-actcms a").click(function(){var i=($(this).attr("productid"),$(this).attr("shopid"),$(this).attr("producturl"));location.href=i})});