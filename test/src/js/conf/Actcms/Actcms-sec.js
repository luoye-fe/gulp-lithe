define("conf/Actcms/Actcms-sec.js",function (require,exports,module){
	require('$');
	require('utils/appInterface.js');
    require('mods/buried.js');
    require('conf/Actcms/Actcms-cont.js');
    require('vendors/lazyload');
	var base64 = require('utils/base64.js');
	var Ajax = require('utils/ajax.js');
	var dropload = require('vendors/dropload.js');
	var domaincom = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
	var domain = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1]+'/product/index?';
	$("img").picLazyLoad({effect: "fadeIn"});
	 // 分享到微信;
    wx.ready(function () {
            wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
            wx.showMenuItems({         //显示需要的按钮
                menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
            });
            wx.onMenuShareTimeline({     //分享到朋友圈
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                desc: shareDesc, //分享描述
                imgUrl: shareImg, // 分享图标
                success: function () {
                    //alert('成功分享到朋友圈');
                },
                cancel: function () {
                    //alert('取消分享朋友圈');
                }
            });
            wx.onMenuShareAppMessage({   //分享给朋友
          		title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                desc: shareDesc, //分享描述
                imgUrl: shareImg, // 分
	            type: '', // 分享类型,music、video或link，不填默认为link
	            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	            success: function () { 
	                //alert('成功分享到朋友');
	            },
	            cancel: function () { 
	                //alert('取消分享给朋友');
	            }
           });
            wx.onMenuShareQQ({
             title: title, // 分享标题
             desc: desc, // 分享描述
             link: link, // 分享链接
             imgUrl: imgUrl, // 分享图标
             success: function () { 
                 //alert('成功分享到QQ');
             },
             cancel: function () { 
                 //alert('取消分享到QQ');
             }
          });
        });
	
	// 刷新组件
    var oTabLi = $('.section5-box-ul li');
    var oTabDiv = $('.section5-cont .tabdiv');
    var oPage6 = $('div.oSection5').attr('page');
    var oPage7 = $('div.oSection6').attr('page');
    var oPage8 = $('div.oSection7').attr('page');
    var oPage9 = $('div.oSection8').attr('page');
	var metaId = $('.section5-box-ul li').eq(0).attr('metaidx');
	var metaIda = $('li.oSection5').attr('metaidx');
	var metaIdb = $('li.oSection6').attr('metaidx');
	var metaIdc = $('li.oSection7').attr('metaidx');
	var metaIdd = $('li.oSection8').attr('metaidx');
	var oCLickMore = $('.click-more').eq(0);
	//tab切换
	var numLi = 4 ;
    oTabLi.on('click',function(){
    	var obj=oTabDiv.eq($(this).index());
        numLi=obj.find('li').length;
        if(numLi>4){
            $('div.tabdiv').eq($(this).index()).height('');
        }else{
            $('div.tabdiv').height($(window).height());
        }
    	var index=$(this).index();
        $(this).addClass('section5-boxul-li').siblings().removeClass('section5-boxul-li');
        oTabDiv.eq($(this).index()).show().siblings().hide();
        oCLickMore = $('.click-more').eq($(this).index());
        oCLickMore.show().siblings().hide();
        metaId = oTabDiv.eq($(this).index()).attr('metaidx');
        console.log(oCLickMore)
    });
    // 上啦刷新
    var droploadUp = $('body').dropload({
      loadUpFn: function(me) {
        setTimeout(function() {
          me.resetload();
          location.reload(true);
        }, 500);
      }
    });  
    //下拉加载更多
    $('.click-more').on('click',function(){
    	addNew();
        // $('div.tabdiv').height('100%');
    })
	function addNew(){
		switch (metaId) {
			case metaIda:
				oPage6++;
				addSections(oPage6,$('div.oSection5 ul'));
				break;
			case metaIdb:
				oPage7++;
				addSections(oPage7,$('div.oSection6 ul'));
				console.log(oPage7);
				break;
			case metaIdc:
				oPage8++;
				addSections(oPage8,$('div.oSection7 ul'));
				break;
			case metaIdd:
				oPage9++;
				addSections(oPage9,$('div.oSection8 ul'));
				break;			
		}
	}
	var page = 1;	
	function addSections (page,str){
		Ajax.query('/op/actcms/getdatabypage', {metaId: metaId,pageNum: page}, function (data) {
		    if (data.success) {
				if(data.data.list.length == 0){
					oCLickMore.html('暂无更多数据')
				}else{
					var oData = data.data.list[0].itemData;
					for(var i=0;i<oData.length;i++){
     					var addSection = 										
							'<li class="fl section5-cont1-li" id="oS5ContLiL">'+									
	         					'<div class="section5-cont-li-div" shopId="'+oData[i].shopId+'" productId="'+oData[i].productId+'" sn="'+oData[i].sn+'" icon="'+data.icon+'">'+
	         						'<a href="'+domain+'?shopId='+oData[i].shopId+'&productId='+oData[i].productId+'">'+
	         							'<img src="'+oData[i].productPicUrl+'" alt="国美+">'+
	         							'<p>'+oData[i].productName+'</p>'+
	         						'<div class="clearfix section5-bottom">'+
	         							'<div class="amount fl">'+
	         								'<p class="amount-div"><i>￥</i>'+oData[i].productPrice+'</p>'+
	         							'</div>'+
	         								'<span class="snapUp fr">立即抢购</span>'+
	         						'</div>'+
	         						'</a>'+
	         						'<a href="'+domain+'?shopId='+oData[i].shopId+'&productId='+oData[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
	         							'<div class="coupons">'+
	         									'<div class="fl buy"></div>'+
	         									'<div class="fr"><i>￥</i><span>'+oData[i].coupon+'</span></div>'+
	         							'</div>'+
	         						'</a>'+	
	         					'</div>'+
	         				'</li>'; 
         				str.append(addSection);
         				$('div.tabdiv').height('');
					}
					var oCouponCont = $('.coupons span');
	        		for(var i=0,l=oCouponCont.length;i<l;i++){
	        			if(oCouponCont[i].innerHTML ==='' || oCouponCont[i].innerHTML ===' '|| oCouponCont[i].innerHTML ==='undefined'){
	        				oCouponCont.eq(i).parents(".coupons").hide();
	        			}
	        		}		
				}		
		    }   
		});
	}	
	
	// 每个模块埋点
    BP.send({event_id:'hd00W000',desc:'活动页'});
	function toBpSend(str,bps,desc){
		str.click(function(){
			var productId = $(this).attr('productid');
			var shopId = $(this).attr('shopid');
			BP.send({event_id:bps,product_id:productId,shop_id:shopId,name:desc});
		});
	}
	toBpSend($('.section1'),'Mhd0W002','H5-模块2');
	toBpSend($('.section2'),'Mhd0W003','H5-模块3');
	toBpSend($('.section3'),'Mhd0W004','H5-模块4');
	toBpSend($('.section4'),'Mhd0W005','H5-模块5');
	toBpSend($('.oSection5'),'Mhd0W006','H5-模块6');
	toBpSend($('.oSection6'),'Mhd0W007','H5-模块7');
	toBpSend($('.oSection7'),'Mhd0W008','H5-模块8');
	toBpSend($('.oSection8'),'Mhd0W009','H5-模块9');
	// banner图埋点
	function toBpsendUrl(str,bps,desc){
		str.click(function(){
			var oImgPic = $(this).attr('oimgpic');
			var oUrlPic = $(this).attr('href');
			BP.send({event_id:bps,name:desc});
		});
	}
	toBpsendUrl($('.oSection9'),'Mhd0A000','活动位');
	toBpsendUrl($('.oSection0'),'Mhd0A001','H5-模块1');
	$('.opg-actcms a').click(function(){
		var productId = $(this).attr('productid');
		var shopId = $(this).attr('shopid');
		var productUrl = $(this).attr('producturl');
		location.href = productUrl;
	});

});

























