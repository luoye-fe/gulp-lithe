define("conf/Actcms/Actcms-thr.js",function(require){

	require('$');
	require('utils/appInterface.js');
	// require('utils/qrcode.js');
    require('mods/buried.js');
	var base64 = require('utils/base64.js');
	require('conf/Actcms/Actcms-cont.js');
$(function(){
	var domaincom = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
	var domain2 = '';
	var s5,s6,s7,s8 = '';
if(window.location.host == 'h5.test.gomeplus.com' ){
	otHost(31,11,33,35,37,39,41,125,127,149);
	var oHostId = 'metaIds=31,11,33,35,37,39,41,125,127,149'; // 测试环境
	s5 = 39,s6 = 41,s7 = 125,s8 =127;
}else if(window.location.host == 'h5.gomeplus.com'){
	otHost(15,13,17,19,21,23,25,27,29,31);
	var oHostId = 'metaIds=15,13,17,19,21,23,25,27,29,31'; //生产环境
	s5 = 23,s6 = 25,s7 = 27,s8 =29;
}else if(window.location.host == 'h5-pre.gomeplus.com'){
	otHost(31,32,34,36,38,40,42,43,44,29);
	var oHostId = 'metaIds=31,32,34,36,38,40,42,43,44,29';//预生产
	s5 = 40, s6 = 42, s7 = 43, s8 = 44;
}
function otHost(s0,s1,s2,s3,s4,s5,s6,s7,s8,s9){
	// 测试环境
	classArray = [{
		oIdName :'oSection0',
			type : s0
		},{oIdName : 'oSection1',
			type : s1
		},{oIdName : 'oSection2',
			type : s2
		},{oIdName : 'oSection3',
			type : s3
		},{oIdName : 'oSection4',
			type : s4
		},{oIdName : 'section5',
			type : s5
		},{oIdName : 'section5',
			type : s6
		},{oIdName : 'section5',
			type : s7
		},{oIdName : 'section5',
			type : s8
		},{oIdName : 'oSection9',
			type : s9
	}];	
}
AppInterface.buried( 'P000W006','商品管理页');
// 没有更多商品
// 刷新组件
function downReLoad(){
    var dropload = $('body').dropload({
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
         domClass   : 'dropload-down',
         domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
         domUpdate  : '<div class="dropload-update">↓释放加载</div>',
         domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
         },
        loadUpFn : function(me){
            setTimeout(function(){
                me.resetload();
                location.reload(true);
            },300);
        },
        loadDownFn:function(me){
        	var mData = MGlobal.data,
        		flag = false;
        	for(var k=0;k< mData.length;k++) {
        		if($("li.oSection5").hasClass("section5-boxul-li")){
        			if(mData[k]["type"] == s5){
				     	if($('.section5-cont1 .section5-cont-li-div').length==mData[k].itemData.length){
				     		DropLoadEnd();
				     		// return;		
				     	}else{
				 			addSection(mData[k],0,1); 
				 			flag = true;
				     	}
				     	break;
				    } 	
			     }else if($("li.oSection6").hasClass("section5-boxul-li")){
			     	if(mData[k]["type"] == s6){
				     	if($('.section5-cont2 .section5-cont-li-div').length==mData[k].itemData.length){
				     		DropLoadEnd();
				     		// return;		
				     	}else{
				 			console.log(222222);
				 			addSection(mData[k],1,2); 
				 			flag = true;
				     	}
				     	break;
				    }	
			     }else if($('li.oSection7').hasClass('section5-boxul-li')){
			     	if(mData[k]["type"] == s7){
			 	    	if($('.section5-cont3 .section5-cont-li-div').length==mData[k].itemData.length){
			 	    		DropLoadEnd();
			 	    		// return;		
			 	    	}else{
				 			console.log(3333333);
			 				addSection(mData[k],2,3); 
			 				flag = true;
			 	    	}
			 	    	break;
			 	    }	
			     }else if($('li.oSection8').hasClass('section5-boxul-li')){
			     	if(mData[k]["type"] == s8){
			 	    	if($('.section5-cont4 .section5-cont-li-div').length==mData[k].itemData.length){
				     		DropLoadEnd();	
				     	}else{
				 			console.log(4444);
				 			addSection(mData[k],3,4); 
				 			flag = true;
				     	}
				     	break;
				    }	
			    }
        	}
        	if(flag){
        		DropLoadEnd();
        	}
        	me.resetload();
	    }    
    });
}
function DropLoadEnd(){
	var DropEnd = '<div class="dropload-load">'+
		'<span class="loading"></span>没有更多商品了哦~'+
		'</div>';
		$('.dropload-load').html(DropEnd);
	setTimeout(function(){
	},1000)	
}
downReLoad();
// 每个title
function oTitleTop(data,obj){
	var oTitleTopC = 
		'<span class="fl" type="'+data.type+'" icon="'+data.icon+'"></span>'+
		'<h2 class="fl" type="'+data.type+'" icon="'+data.icon+'">'+data.title+'</h2>';
	obj.append(oTitleTopC);
}
// 每个商品
var sectionMap = {
	section0:function(data){
		var oS0List =data.itemData[0];
		var oS0ListCont = 
			'<a href="'+oS0List.redirectUrl+'" title="'+data.title+'" type="'+data.type+'"  icon="'+data.icon+'">'+
				'<img src="'+oS0List.picUrl+'">'+
			'</a>';
		$('.coupons-art').append(oS0ListCont);	
	},
	section1:function(data){
		var oS1List = data.itemData;
		oTitleTop(data,$('#title-drop1'),1);
		var oSPrice = oS1List[0].productPrice;
		var oSection1ContL = 
			'<div shopId="'+oS1List[0].shopId+'" productId="'+oS1List[0].productId+'" sn="'+oS1List[0].sn+'" icon="'+data.icon+'">'+	
				'<a data-href=" '+domain2+'?shopId='+oS1List[0].shopId+'&productId='+oS1List[0].productId+' ">'+
					'<div  shopId="'+oS1List[0].shopId+'" productId="'+oS1List[0].productId+'" sn="'+oS1List[0].sn+'">'+
						'<img src="'+oS1List[0].productPicUrl+'" alt="国美+">'+
					'</div>'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS1List[0].shopId+'&productId='+oS1List[0].productId+' " class="couponsa" style="color:#ee2f2f;">'+
					'<div class="coupons">'+
							'<div class="fl buy"></div>'+
							'<div class="fr"><i>￥</i><span>'+oS1List[0].coupon+'</span></div>'+
					'</div>'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS1List[0].shopId+'&productId='+oS1List[0].productId+'">'+
					'<p class="section1-cont-left-p1" >'+oS1List[0].productName+'</p>'+
				'</a>'+
				'<p class="section1-cont-left-p2">优惠价: '+
				oS1List[0].productPrice+'元</p>'+
				'<a data-href="'+domain2+'?shopId='+oS1List[0].shopId+'&productId='+oS1List[0].productId+'">'+
					'<span class="snapUp">立即抢购</span>'+
				'</a>'+
			'</div>';
		$('.section1-cont-left').append(oSection1ContL);
		for(var i=1;i<3;i++){		
		var oSection1ContR = 
			'<div class="section1-cont-right-bottom clearfix" shopId="'+oS1List[i].shopId+'"productId="'+oS1List[i].productId+'" sn="'+oS1List[i].sn+'" icon="'+data.icon+'">'+
				'<div class="fl">'+
					'<a data-href="'+domain2+'?shopId='+oS1List[i].shopId+'&productId='+oS1List[i].productId+'">'+
						'<p class="section1-cont-right-p1">'+oS1List[i].productName+'</p>'+
					'</a>'+
					'<p class="section1-cont-right-p2">优惠价:'+oS1List[i].productPrice+'元</p>'+
					'<a data-href="'+domain2+'?shopId='+oS1List[i].shopId+'&productId='+oS1List[i].productId+'">'+
						'<span class="snapUp">立即抢购</span>'+
					'</a>'+
				'</div>'+
				'<a data-href="'+domain2+'?shopId='+oS1List[i].shopId+'&productId='+oS1List[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
					'<div class="coupons">'+
							'<div class="fl buy"></div>'+
							'<div class="fr"><i>￥</i><span>'+oS1List[i].coupon+'</span></div>'+
					'</div>'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS1List[i].shopId+'&productId='+oS1List[i].productId+'" class="fr">'+
					'<img src="'+oS1List[i].productPicUrl+'" alt="">'+
				'</a>'+
			'</div>';
			if(i==2){
				$('.section1-cont-right-bottom').css('borderBottom','1px solid #cdcdcd');
			}
			$('.section1-cont-right').append(oSection1ContR);		
		};	
	},
	section2:function(data){
		var oS2List = data.itemData;
		oTitleTop(data,$('#title-drop2'),2);
		for(var i=0;i<data.itemData.length;i++){

			var oSection2Cont = 
			'<div class="section2-cont-left fl" shopId="'+oS2List[i].shopId+'" productId="'+oS2List[i].productId+'" sn="'+oS2List[i].sn+'" icon="'+data.icon+'">'+
				'<a data-href="'+domain2+'?shopId='+oS2List[i].shopId+'&productId='+oS2List[i].productId+'">'+
					'<img src="'+oS2List[i].productPicUrl+'" alt="国美+" class="cont1-img">'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS2List[i].shopId+'&productId='+oS2List[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
					'<div class="coupons">'+
							'<div class="fl buy"></div>'+
							'<div class="fr"><i>￥</i><span>'+oS2List[i].coupon+'</span></div>'+
					'</div>'+
				'</a>'+	
				'<a data-href="'+domain2+'?shopId='+oS2List[i].shopId+'&productId='+oS2List[i].productId+'">'+
					'<p class="cont1-p1">'+oS2List[i].productName+'</p>'+
				'</a>'+
				'<p class="cont-p2">'+
					'<span class="fl"><em>￥</em>'+oS2List[i].productPrice+'</span>'+
					'<a data-href="'+domain2+'?shopId='+oS2List[i].shopId+'&productId='+oS2List[i].productId+'">'+
						'<i class="fr">立即抢购</i>'+
					'</a>'+	
				'</p>'+
				'</div>';
			 $('.section2-cont').append(oSection2Cont);	
		}
	},
	section3:function(data){
		var oS3List = data.itemData;
		oTitleTop(data,$('#title-drop3'),3);
		var oSection3ContTop = 
			'<a data-href="'+domain2+'?shopId='+oS3List[0].shopId+'&productId='+oS3List[0].productId+'" >'+
				'<div shopId="'+oS3List[0].shopId+'" productId="'+oS3List[0].productId+'" sn="'+oS3List[0].sn+'" icon="'+data.icon+'">'+
					'<img src="'+oS3List[0].picUrl+'" alt="">'+
				'</div>'+
			'</a>'+
			'<a data-href="'+domain2+'?shopId='+oS3List[0].shopId+'&productId='+oS3List[0].productId+'" class="couponsa" style="color:#ee2f2f;">'+
				'<div class="coupons" shopId="'+oS3List[0].shopId+'" productId="'+oS3List[0].productId+'" sn="'+oS3List[0].sn+'" icon="'+data.icon+'">'+
					'<div class="fl buy"></div>'+
					'<div class="fr"><i>￥</i><span>'+oS3List[0].coupon+'</span></div>'+
				'</div>'+
			'</a>';
		$('.section3-cont-top').append(oSection3ContTop);
		var oS3ListCont = data.itemData;	
		for(var i=1;i<oS3ListCont.length;i++){
			var oSection3ContLi = 
			'<li class="fl" shopId="'+oS3List[i].shopId+'" productId="'+oS3List[i].productId+'" sn="'+oS3List[i].sn+'">'+
				'<a data-href="'+domain2+'?shopId='+oS3List[i].shopId+'&productId='+oS3List[i].productId+'">'+
					'<img src="'+oS3List[i].picUrl+'" alt="">'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS3List[i].shopId+'&productId='+oS3List[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
					'<div class="coupons">'+
							'<div class="fl buy"></div>'+
							'<div class="fr"><i>￥</i><span>'+oS3List[i].coupon+'</span></div>'+
					'</div>'+
				'</a>'+	
			'</li>';
			$('.section3-cont-bottom ul').append(oSection3ContLi);	
		}
		if($('.section3-cont-bottom ul li').length>0){
			
		}else{
			$('.section3-cont-bottom').hide();
			

		}	
	},
	section4:function(data){
		var oS4List = data.itemData;
		oTitleTop(data,$('#title-drop4'),4);
		for(var i=0;i<oS4List.length;i++){
			var oSection4Cont = 
			'<div class=" clearfix section4-cont-div border-bottom" shopId="'+oS4List[i].shopId+'" productId="'+oS4List[i].productId+'" sn="'+oS4List[i].sn+'" icon="'+data.icon+'">'+
				'<a data-href="'+domain2+'?shopId='+oS4List[i].shopId+'&productId='+oS4List[i].productId+'">'+
					'<img src="'+oS4List[i].picUrl+'" alt="" class="fl">'+
				'</a>'+
				'<a data-href="'+domain2+'?shopId='+oS4List[i].shopId+'&productId='+oS4List[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
					'<div class="coupons">'+
							'<div class="fl buy"></div>'+
							'<div class="fr"><i>￥</i><span>'+oS4List[i].coupon+'</span></div>'+
					'</div>'+
				'</a>'+	
			'</div>';
			$('#section4-cont').append(oSection4Cont);

		}
		var oSection4ToLeft = $('.section4-cont-div .couponsa .coupons').eq(1);
		oSection4ToLeft.css('left','0.2rem');
	},
	section5:function(data){
		section5Cont(data,0,1,0,4);
	},
	section6:function(data){
		section5Cont(data,1,2,0,4);
	},
	section7:function(data){
		section5Cont(data,2,3,0,4);
	},
	section8:function(data){
		section5Cont(data,3,4,0,4);
	},
	section9:function(data){
		var oBarner = data.itemData[0];
		var barnerdiv = 
			'<div class="header-div" sn="+oBarner.sn+" type="+oBarner.type+" dataValue="+oBarner.dataValue+" title="+oBarner.title+">'+
				'<a data-href = "'+oBarner.redirectUrl+'">'+
				'<img src="'+oBarner.bannerPic+'" alt="banner">'+
				'</a>'+
			'</div>';
		$("header").append(barnerdiv);	
	}
};
// 刷新添加商品
function addSection(data,num1,num2){
	section5Cont(data,num1,num2,4,data.itemData.length);

}
var m=4,n=0;
function section5Cont(data,k,y,x,z){
	var oS5List = data.itemData;
	var oSection5ContLiA = 
		'<a data-href="javascript:;" type="'+data.type+'">'+data.title+'</a>';
	$('.section5-box-ul ul li').eq(k).append(oSection5ContLiA);
	    m = oS5List.length > m ? m : oS5List.length;
		for(var i=x;i<z;i++){
			if(!oS5List[i]){
				break;
			}
			var oSection5ContDiv = 
				'<div class="section5-cont-li-div" shopId="'+oS5List[i].shopId+'" productId="'+oS5List[i].productId+'" sn="'+oS5List[i].sn+'" icon="'+data.icon+'">'+
					'<a data-href="'+domain2+'?shopId='+oS5List[i].shopId+'&productId='+oS5List[i].productId+'">'+
						'<img src="'+oS5List[i].productPicUrl+'" alt="国美+">'+
					'</a>'+
					'<a data-href="'+domain2+'?shopId='+oS5List[i].shopId+'&productId='+oS5List[i].productId+'" class="couponsa" style="color:#ee2f2f;">'+
						'<div class="coupons">'+
								'<div class="fl buy"></div>'+
								'<div class="fr"><i>￥</i><span>'+oS5List[i].coupon+'</span></div>'+
						'</div>'+
					'</a>'+								
					'<a data-href="'+domain2+'?shopId='+oS5List[i].shopId+'&productId='+oS5List[i].productId+'">'+
						'<p>'+oS5List[i].productName+'</p>'+
					'</a>'+
					'<div class="clearfix section5-bottom">'+
						'<div class="amount fl">'+
							'<p class="amount-b">销量：'+oS5List[i].sales+'</p>'+
							'<p class="amount-div"><i>￥</i>'+oS5List[i].productPrice+'</p>'+
						'</div>'+
						'<a data-href="'+domain2+'?shopId='+oS5List[i].shopId+'&productId='+oS5List[i].productId+'" >'+
							'<span class="snapUp fr">立即抢购</span>'+
						'</a>'+
					'</div>'+
				'</div>';
			if(i%2){
				$('.section5-cont'+y+' .section5-cont1-li-right').append(oSection5ContDiv);
			}else{
				$('.section5-cont'+y+' .section5-cont1-li-left').append(oSection5ContDiv);
			}	
		}
		function oJudge(){
			var oCouponCont = $('.coupons span');
			for(var i=0,l=oCouponCont.length;i<l;i++){
				if(oCouponCont[i].innerHTML ==='' || oCouponCont[i].innerHTML ==='undefined'){
					oCouponCont.eq(i).parents(".coupons").hide();
				}
			}			
		}
	oJudge();
}
//	data 是得到的数据  
//	j 是数据中的第几个
//	k 是 tab li的第几个
//	y 是 下面第几个加
//	x 是得到数据从哪开始
//	z 是到哪个为止
// 判断优惠卷有无
function oCoupon (data){
	$(document).ready(function (){
		function oJudge(){
			var oCouponCont = $('.coupons span');
			for(var i=0,l=oCouponCont.length;i<l;i++){
				if(oCouponCont[i].innerHTML ==='' || oCouponCont[i].innerHTML ==='  '||oCouponCont[i].innerHTML ==='undefined'){
					oCouponCont.eq(i).parents(".coupons").hide();
				}
			}			
		}
		oJudge();					
	});
}
// 判断每个模板有无
function section(map,index,args){
	var funcName = "section"+index;
	map[funcName] && map[funcName](args);
}
function allData(data){
	for(var k = 0,i=0; k < classArray.length; k++) {
			if(classArray[k].type === data[i].type) {
				if(!data[i].itemData.length){
					$('.' +classArray[k].oIdName).css('display','none');
				}
				console.log(data[i]);
				section(sectionMap,k,data[i]);
				i++;		
			}else{
				console.log($('#' +classArray[k].oIdName));
				$('.' +classArray[k].oIdName).css('display','none');
			}
		index = k;
	}
}
// 调用ajax
function requestAjax(url,params,callback,isAsync,isW){
  var data = {url:url,params:params};
    var isasync = true;
    var ua = window.navigator.userAgent.toLowerCase();
    if(!ua.match(/MicroMessenger/i)){
        isasync = isAsync;
    }
  $.ajax({
    type:'post',
    url:domaincom+'/operation/listdata',
    data : oHostId,
    dataType:'json',
    async:isAsync,
    success:function(res){
      if(res.code === 0){
         isW ? callback(res.data) : callback(res);
      }else{
         isW ? callback(res.data) : callback(res);
      }
    },
    error:function(xhr, errorType, error){
      console.log('网络请求错误！');
    }
  });
}
function getData(){
    var isAsync = true,
    	url = '',
    	params = '';
requestAjax(url,params,function(data){
 	allData(data);
 	MGlobal.data = data;
 	oCoupon(data);
 },isAsync,true);			
}
var MGlobal = {};
getData();

var oMhdArr = {

};
//内嵌
function oAppClick(mhd,str1,str2){
	$(str1).on("click",str2,function(e){
		var $self = $(this),
			shopid = $self.attr("shopid"),
			productid = $self.attr("productid");
		AppInterface.call('/common/productDetail', {shopId: shopid, productId: productid});
   		AppInterface.buried(mhd,'功能模块', {shopId: shopid, productId: productid});
		console.log(shopid,productid);	
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
}
(function oAppInter(){
	oAppClick('Mhd0A009','.section5-cont4','.section5-cont-li-div');
	oAppClick('Mhd0A008','.section5-cont3','.section5-cont-li-div');
	oAppClick('Mhd0A007','.section5-cont2','.section5-cont-li-div');
	oAppClick('Mhd0A006','.section5-cont1','.section5-cont-li-div');
	oAppClick('Mhd0A005','.section4','.section4-cont-div');
	oAppClick('Mhd0A004','.section3','.section3-cont-top div');
	oAppClick('Mhd0A004','.section3','.section3-cont-bottom li');
	oAppClick('Mhd0A003','.section2','.section2-cont-left');
	oAppClick('Mhd0A002','.section1','.section1-cont-left div');
	oAppClick('Mhd0A002','.section1','.section1-cont-right-bottom');
})();
});

});

























