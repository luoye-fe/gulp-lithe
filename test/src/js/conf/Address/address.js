/**
 * 收货地址模块脚本
 * @author yanglang
 * @date 20160111
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
     data-config="config.js"
     data-debug="true"
     data-main="conf/Address/address.js">
     </script>
 */
define('conf/Address/address.js',function(require,exports,module) {
    
    var $=require('vendors/zepto.js');
    var ajax = require('utils/ajax');
    var common = require('lib/common');
    var storage = require('mods/storage');
    var UI = require('UI/alert');

    common.init();

    var params = common.getParams();
    if(params.source === '0'){//0表示从用户中心过来
        storage.setItem('address2pay','0');
    }
    if(params.source === '1' || storage.getItem('address2pay')==='1'){//1表示从订单过来
        storage.setItem('address2pay','1');
        $('.complie_list_box').on("click",".backOrder",function(){
            var addressId = $(this).parent().attr('addressid');
            var lastId = $(this).attr('lastId');
            var loginCars;
            if(loginCars = storage.getItem("logincars",true)){
                var loginCars = JSON.parse(loginCars);
                loginCars.addressId = lastId;
                storage.setItem("logincars",JSON.stringify(loginCars),true);
            }
            location.replace('/car/confirm?addressid='+(addressId!=undefined?addressId:0));
        });
    }

    $('#goback2').click(function(){
        location.assign((params.source === '1' || storage.getItem('address2pay')==='1') ?'/car/confirm' : '/user/index' );
    });
   
    $('.complie_list_box').find(".setDefaultAddress em").each(function(i,val){
        if($(val).attr("isdefault")=="1"){
            $(this).closest(".complie_list").addClass("high");
        }
    });

    $(".w_delete").on("click",function(){
        var self = this;
        var addressId = $(this).attr('addressId');
        UI.alertBox("确定要删除吗？",'',function(){
            ajax.postData('/address/del',{addressId:addressId},function(data){
                if(data.success){
                    $(self).closest(".complie_list").remove();
                }else{
                    UI.alerter(data.message);
                }
            });
        });
    });

    //修改默认地址
    $('.complie_list_box').on("click",".setDefaultAddress",function(){
        var self = this;
        var isDefault = $(this).find('em').attr('isdefault');
        if(isDefault == '0'){
            var parent = $(self).parents('.complie_list');
            parent.addClass('high').siblings().removeClass('high');
            //不是默认的，变成默认的
            var addressId = parent.attr('addressId');
            ajax.postData('/address/setdefault',{addressId:addressId},function(data){
                if(data.success){
                    //当前选中默认地址，去掉其他地址的默认
                    $('.setDefaultAddress').html('<em isdefault="0"></em>设为默认地址');
                    $(self).html('<em isdefault="1"></em>默认地址');
                    UI.alertSecond('设置成功');

                    
                }else{
                    UI.alerter(data.message);
                }
            });
        }
        return false;
    });

    //编辑地址
    $(".edit").on("click",function(){
        var parent = $(this).parents('.complie_list');
        var addressId = parent.attr('addressid');
        location.assign('/address/editindex?addressId='+addressId);
    });

    //添加地址不超过20条
     if($(".complie_list_box .complie_list").length>=20){
           $("#add").attr("disabled","disabled");
     }
     else{
         $("#add").removeAttr("disabled","disabled");
     }
           
    $("#add").on("click",function(){
        location.assign('/address/addindex');    
    });


});