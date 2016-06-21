/**
 * 编辑收货地址模块脚本
 * @author wanglonghai  
 * @date 20160513
 * 页面引用
 * addAddress.js,editAddress.js
 */
define('conf/Address/comAddress.js',function(require,exports,module) {
    require('$');
    var ajax = require('utils/ajax');
    var common = require('lib/common');
    var storage = require('mods/storage');
    var Vue = require('vendors/vue');
    var addressFun = require('mods/addressFun');
    var UI = require('UI/alert');
 
    var address;
    if(typeof address_detail !== 'undefined'){
        address = JSON.parse(address_detail);
    }
    common.init();
    $('.w_goback').attr('href','javascript:;');
    //phoneErrType 1 手机号，2 电话号码 3、其他格式
    var search = location.search.substr(1),isName = false,isPhone = false,phoneErrType = 1,isAddrDetail = false,doc=window.document;

    var vm = new Vue({
        el:'#choose',
        data:{
            cities:[],
            areas:[],
            streets:[],
            addrList:[],
            isEdit:false,
            addressId:0,
            nextStep:'/address/index'
        },
        methods:{
            //选择地址
            selectChildAddr:function(addr){
                $('.areaSelectList li').attr('active','0').eq(addr.level-1).attr({'addrId':addr.id,'level':addr.level}).html(addr.name);
                if(addr.level === 4){
                    $('.areaSelectList li').eq(addr.level-1).attr('active','1');
                    var address = "";
                    $('.areaSelectList li').each(function(){
                        address += this.innerHTML + ' ';
                    });
                    $('#addressSelect').html(address);
                    this.addrList = [];
                    localSaveAddr();
                    closeSelectShopAttr();
                    checkInput();
                }else{
                    $('.areaSelectList li').eq(addr.level).attr('active','1').html('请选择');
                    for(var i=addr.level+1;i<=4;i++){
                        $('.areaSelectList li').eq(i).attr('active','0').html('');  
                    }
                    getAddress(addr.id,addr.level);   
                }
            },
            changeAddr:function(event){
                var self = event.target;
                if(self.innerHTML === '' || self.getAttribute('active') === '1' || self.innerHTML === '请选择'){
                    return false;
                }
                var level = self.getAttribute('level');
                var addrid = self.getAttribute('addrid');
                switch(level){
                    case '1':this.addrList = storage.getnewItem('provinces');break;
                    case '2':this.addrList = this.cities;break;
                    case '3':this.addrList = this.areas;break;
                    case '4':this.addrList = this.streets;break;
                }
                $('.areaSelectList li').attr('active','0').eq(parseInt(level-1)).attr('active','1').html('请选择');
                $('.areaSelectList li').each(function(index){
                    if(index > level-1)
                        this.innerHTML = '';
                });
            }           
        }
    });
    
    var addressSelect = $("#addressSelect");
    $("#username").on('keyup',function(){
        checkUserName();
        checkInput();
    });

    $("#username").on('blur',function(){
        sleepAddressSelect();
        checkUserName();
        if(!isName){
            UI.alerter("收货人姓名要2-20个字符");
            return false;
        }
        checkInput();
    });

    $('#address,#mobile').on('focus',function(){
        doc.body.scrollTop='60';
    });

    $('#mobile').on('keyup',function(){
        var phone = common.trimVal('mobile');
        var first = phone.slice(0,1);
        if(first === '0'){
            if(!/^0[0-9]{10,11}$/.test(phone)){
                isPhone = false;
                phoneErrType = 1;
            }else{
                isPhone = true;
            }
        }else if(first === '1'){
            if(!/^1[3-9][0-9]{9}$/.test(phone)){
                isPhone = false;
                phoneErrType = 2;
            }else{
                isPhone = true;
            }
        }else{
            isPhone = false;
            phoneErrType = 3;
        }
        checkInput();
    });
    $('#mobile').on('blur',function(){
        sleepAddressSelect();
        if(!isPhone){
            switch(phoneErrType){
                case 1: UI.alerter('电话号输入错误');break;
                case 2: UI.alerter('手机号输入错误');break;
                case 3: UI.alerter('请重新输入电话号码');break;
            }
            return false;
        }
    });

    $('#address').on('keyup',function(){
        checkAddressDetail();
        checkInput();
    });
    $('#address').on('blur',function(){
        sleepAddressSelect();
        checkAddressDetail();
        if(!isAddrDetail){
            UI.alerter('详细地址要2-200个字符');
            return false;
        }
        checkInput();
    });

    $(".saveAddress").on("click",function(){
        if(this.getAttribute('disabled') === 'disabled'){
            return false;
        }
        var selected_address = storage.getnewItem('selected_address'),self = this;
        selected_address.userName = common.trimVal('username');
        selected_address.mobile = common.trimVal('mobile');
        selected_address.address = common.trimVal('address').replace('\r\n',' ');
        selected_address.isDefault = vm.isEdit?doc.getElementById('isDefault').value:1;

        this.setAttribute('disabled','disabled');
        if(address){
            selected_address["addressId"] = address["id"];
            ajax.postData('/address/edit',selected_address,function(res){
                callback(res,'编辑收货地址成功');
            });
        }else{
            ajax.postData('/address/add',selected_address,function(res){
                callback(res,'新增地址设置成功');
            });
        }
        function callback(res,msg){
            if(res.code === 0){
                clearSelectedAddr();
                UI.alertSecond(msg);
                location.assign(vm.nextStep);    
            }else{
                UI.alerter(res.message);
                self.removeAttribute('disabled');
            }
        }
    });

    $('.w_goback').on('click',function(){
        clearSelectedAddr();
        location.assign('/address/index'+location.search);
    });
     $('.goback').on('click',function(){
        clearSelectedAddr();
        location.assign('/address/index'+location.search);
    })
    addressSelect.on("click",function(){
        if(this.getAttribute('disabled') === 'disabled'){
            return false;
        }
        $('#cover_bj').show();
        $('#choose').css({
            'transition': 'bottom 1s ease-out',
            'bottom': '0%',
            '-webkit-transition': 'bottom 1s ease-out',
            '-moz-transition': 'bottom 1s ease-out',
            "z-index": 10000,
            'opacity':1
        });
        var active = $('.areaSelectList li').eq(3).attr('active');
        if(!!vm.streets && active==='1'){
            vm.addrList = vm.streets;
            var selectedIndex = 0,addrId = $('.areaSelectList li').eq(3).attr('addrid');
            if(vm.addrList.length > 0){
                vm.addrList.forEach(function(item,index){
                    if(item.id == addrId){
                        item.orderNo = 1;
                    }else{
                        item.orderNo = 0;
                    }
                });    
            }
        }
    })
    init();
    //页面加载，请求省级列表
    function init(){
        var provinces = storage.getnewItem('provinces');
        clearSelectedAddr();
        if(provinces){
            setAddrVal(provinces);
        }else{
            getAddress(0,1);
        }
        var search = location.search.toLowerCase(),params = common.getParams();
        //source 1 我的，2 订单
        if(search.indexOf('source') > 0){
            vm.nextStep = vm.nextStep + '?source=' + params.source;
        }
        //addressid 编辑收货地址
        if(search.indexOf('addressid') > 0){
            vm.isEdit = true;
            vm.addressId = params.addressId;
            var selected_address = JSON.parse(address_detail);
            getAddress(selected_address.provinceId);   
            getAddress(selected_address.cityId);   
            getAddress(selected_address.boroughId);   
        }
        if(vm.isEdit){
            resetAddr();
        }
        checkInput();
        addLevelForEdit();
    }
    //active addressSelect
    function sleepAddressSelect(){
        addressSelect.attr('disabled','disabled');
        setTimeout(function(){
            addressSelect.removeAttr('disabled');
        },300);
    }
    //校验用户名规则
    function checkUserName(){
        var userName = common.trimVal('username');
        if(!/^[a-zA-Z0-9\u4E00-\u9FA5]*$/.test(userName) || common.getByteLen(userName) < 2 || common.getByteLen(userName) > 20){
            isName = false;
        }else{
            isName = true;
        }
    }
    //校验详细地址长度
    function checkAddressDetail(){
        var textarea = doc.getElementById('address');
        textarea.defaultValue = textarea.value;
        var address = common.trimVal('address');
        if(address.length < 2 || address.length > 200){
            isAddrDetail = false;
        }else{
            isAddrDetail = true;
        }
    }
    function getAddress(parentId,level){
        ajax.postData('/address/regiondivision',{parentId:parentId},function(res){
            if(res.data && res.data.length > 0){
                setAddrVal(res.data);
                if(parentId === 0){
                    storage.setItem('provinces',res.data);
                }else{
                    var level = res.data[0].level;
                    switch(level){
                        case 2:vm.cities = res.data;break;
                        case 3:vm.areas = res.data;break;
                        case 4:vm.streets = res.data;break;
                    }
                }    
            }else{
                vm.streets = [{name:'全部区域',id:'0',level:4}];
                setAddrVal([{name:'全部区域',id:'0',level:4}]);
            }
        });
    }
    function setAddrVal(addrList){
        vm.addrList = addrList;
    }
    function closeSelectShopAttr() {
        $('#cover_bj').hide();
        $('#choose').css({
            'transition': 'bottom 1s ease-out',
            '-moz-transition': 'bottom 1s ease-out',
            '-webkit-transition': 'bottom 1s ease-out',
            'bottom': '-200%'
        });
        doc.getElementById("choose").addEventListener("webkitTransitionEnd", zIndex('choose', -1,0), false);
        UI.remliste();
    }
    //关闭选择参数规格
    $('#choose').on("click", '#close_choose', function() {
        closeSelectShopAttr();
    });

    function zIndex (id, val,val1) {
        setTimeout(function(){
            $('#'+id).css({"z-index":val,'opacity':val});
        },500)
    }
    //存取地址到本地
    function localSaveAddr(){
        var selected_address = storage.getnewItem('selected_address') || {};
        $('.areaSelectList li').each(function(index,item){
            switch(index){
                case 0:selected_address.provinceId = this.getAttribute('addrid');selected_address.provinceName = this.innerHTML;break;
                case 1:selected_address.cityId = this.getAttribute('addrid');selected_address.cityName = this.innerHTML;break;
                case 2:selected_address.boroughId = this.getAttribute('addrid');selected_address.boroughName = this.innerHTML;break;
                case 3:
                    if(this.getAttribute('addrid') === '0'){
                        selected_address.areaId = '';
                        selected_address.areaName = '';
                    }else{
                        selected_address.areaId = this.getAttribute('addrid');
                        selected_address.areaName = this.innerHTML;
                    }
                    break;
                default:break;
            }
        });
        storage.setItem('selected_address',selected_address);
    }
    //还原地址数据到标签
    function resetAddr(){
        if(address_detail){
            var selected_address = JSON.parse(address_detail);
            $('.areaSelectList li').each(function(index,item){
            switch(index){
                    case 0:this.setAttribute('addrid',selected_address.provinceId);this.innerHTML = selected_address.provinceName;break;
                    case 1:this.setAttribute('addrid',selected_address.cityId);this.innerHTML = selected_address.cityName;break;
                    case 2:this.setAttribute('addrid',selected_address.boroughId);this.innerHTML = selected_address.boroughName;break;
                    case 3:this.setAttribute('addrid',selected_address.areaId);this.innerHTML = selected_address.areaName;break;
                    default:break;
                }
            });
            storage.setItem('selected_address',selected_address);
        }
       
    }
    //清除缓存的地址
    function clearSelectedAddr(){
        storage.removeItem('selected_address');
    }
    function checkInput(){
        var selected_address = storage.getnewItem('selected_address');
        if(selected_address && isPhone && isName && isAddrDetail){
            $('.saveAddress').removeAttr('disabled');
            return false;   
        }
        $('.saveAddress').attr('disabled','disabled');
    }

    /*增加特殊处理for编辑地址*/
    function addLevelForEdit(){
        if(address){
            var $lis = $(".areaSelectList li"),
                index = 1;
            $lis.each(function(i){
                $lis.eq(i).attr("level",index++);
            });
            isPhone = true;
            isName = true;
            isAddrDetail = true;
            $(".saveAddress").removeAttr("disabled");
        }
    }
});