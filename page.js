	window.URL = window.URL || window.webkitURL;

//*****************************************************************
//	基础juery插件
//		shanshuo:对象闪烁
//*****************************************************************
(function($){
	$.fn.shanshuo = function(option){
		return this
		.animate({opacity:.3},100).animate({opacity:.75},100)
		.animate({opacity:.5},100).animate({opacity:.8},100)
		.animate({opacity:.6},100).animate({opacity:1},200)
	}
})(jQuery);

var _default = {
	url:"",
	items:"",
	d:[
		{
//			id:"A",
//			dom:".wrap_info>h4",
//			get:"1",		//空|0:TEXT,1:属性,2:HTML
//			attr:"src",		//获取值属性	//get==3;获取对象样式
//			filte:"",		//过滤子集
//			re:['2211',1,''],	//正则式
//			arr:0,			//空|0:单,1:数组
//			type:0,			//空|0:字符串,1:url,2:数值
//			i2n:0,			//空|0,1 (删除了)
//			fun:""			//自定义函数
		}
	]
}


/* 返回条目的code */
function code(detail,fy){
	detail = detail||{};
	detail.re || (detail.re=[]);
	
	// 不同类型,数据转换显示
	if(t == 1){
		if($.type(detail.dom) == 'array'){
			detail.dom = detail.dom.join('.');
		}
	}
	
	var d = "";
		d += '<tr>';
		d += '<td class=td_id><div class="inputip_warp">';
			d += '<input name="id" class="id" type="text" value="'+(detail.id||'')+'">';
			d += '<div class="tipno">0</div>';
			d += '<div class="inputips">';
				d += '<a title=title>标题</a>';
				d += '<a title=url>网址</a>';
				d += '<a title=pic_url>主图</a>';
				d += '<a title=video>视频</a>';
				d += '<a title=price>价格</a>';
				d += '<a title=coupon_price>折扣价格</a>';
				d += '<a title=promotion_price>促销价格</a>';
			d += '</div>';
		d += '</div></td>';
		d += '<td class=td_dom>';
			d += '<select name="d" class="d number">';
				d += '<option value="-1"'+(detail.d == -1&&' selected')+' >主项</option>';
				d += '<option disabled>--------</option>';
				d += '<option value=""'+(!detail.d &&' selected')+' title="取的匹配的第一项">一项</option>';
				d += '<option value="1"'+(detail.d == 1&&' selected')+' title="取的匹配的全部项">全部</option>';
				d += '<option disabled>--------</option>';
				d += '<option value="2"'+(detail.d == 2&&' selected')+' >引用</option>';
				d += '<option value="3"'+(detail.d == 3&&' selected')+' >引值</option>';
				d += '<option disabled>--------</option>';
				d += '<option value="diy">其它值</option>';
			d += '</select> ';
			d += '<select name="add" class="add number">';
				d += '<option value="">-选择-</option>';
				d += '<option disabled>----------</option>';
				d += '<option value="100"'+(detail.add == 100&&' selected')+' >序号</option>';
				d += '<option value="101"'+(detail.add == 101&&' selected')+' >时间</option>';
				d += '<option disabled>----------</option>';
				d += '<option value="1"'+(detail.add == 1&&' selected')+' >字符串</option>';
				d += '<option value="2"'+(detail.add == 2&&' selected')+' >parse</option>';
				d += '<option disabled class="onlyt0">----------</option>';
				d += '<option value="dom" class="onlyt0">对象取值</option>';
			d += '</select> ';
				var da = detail.a || {};
				d += '<input style=width:150px name="v" class="add_fun a1" type="text" value=\''+(da.v||'')+'\'>';
				d += '<input style=width:50px  name="b" class="add_fun a100 number" type="text" value="'+(da.b||'')+'" placeholder="启始值 0">';
				d += ' <select style="width:75px;" name="t" class="add_fun a100 number">';
					d += '<option value=""></option>';
					d += '<option value="1"'+(detail.t == 1&&' selected')+' >递增++</option>';
					d += '<option value="-1"'+(detail.t == -1&&' selected')+' >递减--</option>';
				d += '</select> ';
			
			d += '<input name="dom" class="dom" type="text" value="'+(detail.dom||'')+'">';
		d += '</td>';
		d += '<td class=td_filte><input name="filte" class="filte" type="text" value="'+(detail.filte||'')+'"></td>';
		d += '<td class=td_get>';
			d += '<select name="get" class="get number">';
				d += '<option value="">默认</option>';
				d += '<option value="1"'+((detail.get == 1)?" selected":"")+'>属性</option>';
				d += '<option value="2"'+((detail.get == 2)?" selected":"")+'>源码</option>';
				d += '<option value="3"'+((detail.get == 3)?" selected":"")+'>样式</option>';
				d += '<option value="4"'+((detail.get == 4)?" selected":"")+'>数量</option>';
			d += '</select>';
		if(detail.attr&&detail.get==1){
			for(var i in detail.attr){
				if(detail.attr[i] == '_src'){
					detail.attr[i] = 'src'; // _src 前台显示为src
				}
			}
		};
		
		d += '<div class="inputip_warp">';
			d += '<input name="attr" class="attr" type="text" value="'+(detail.attr||'')+'" disabled>';
			d += '<div class="inputips">';
				d += '<a title=href>属性:网址</a>';
				d += '<a title=src>属性:图片</a>';
				d += '<a title=class>属性:Class</a>';
				d += '<a title=backgroundImage>样式:背景图片</a>';
			d += '</div>';
		d += '</div>';
		d += '</td>';
		d += '<td class=td_arr>';
			d += '<select name="arr" class="arr number">';
				d += '<option value="">默认</option>';
				d += '<option value="1"'+((detail.arr == 1)?" selected":"")+' title="存储为单值">合并</option>';
				d += '<option value="2"'+((detail.arr == 2)?" selected":"")+' title="存储为数组">数组</option>';
			d += '</select> ';
			d += '<input name="fg" class="fg" type="text" title=分隔符 value="'+(detail.fg||'')+'" disabled> ';
		d += '</td>';
		d += '<td class=td_arr_>';
			d += '<select name="arr_item_del" class="arr_item_del number">';
				d += '<option value="" title=保留数组中无效的项>保留空项</option>';
				d += '<option value="1"'+((detail.arr_item_del == 1)?" selected":"")+' title="删除数组中无效的项">删除空项</option>';
			d += '</select> ';
			d += '<select name="arr_item_re" class="arr_item_re number">';
				d += '<option value="" title=保留数组中重复的项>保留重复</option>';
				d += '<option value="1"'+((detail.arr_item_re == 1)?" selected":"")+' title="删除数组中重复的项">删除重复</option>';
			d += '</select> ';
			d += '<select name="arr_item_sort" class="arr_item_sort number">';
				d += '<option value="" title=数组项默认排序>默认排序</option>';
				d += '<option value="1"'+((detail.arr_item_sort == 1)?" selected":"")+' title="数组项顺序排序">顺序排列</option>';
				d += '<option value="2"'+((detail.arr_item_sort == 2)?" selected":"")+' title="数组倒顺序排序">倒序排列</option>';
				d += '<option value="3"'+((detail.arr_item_sort == 3)?" selected":"")+' title="倒转数组">倒转数组</option>';
			d += '</select> ';
		d += '</td>';
		d += '<td class=td_re>';
		
			d += '<div class="inputip_warp inputip_warp_re0">';
				d += '<input name="re0" class="re0" type="text" value="'+(detail.re[0]||'')+'"> ';
				d += '<div class="inputips">';
					d += '<a title=\\s>匹配空格 \\s</a>';
				d += '</div>';
			d += '</div>';
			d += '<input name="re1" class="re1" type="text" value="'+(detail.re[1]||'')+'"> ';
			d += '<div class="inputip_warp">';
			d += '<input name="re2" class="re2" type="text" value="'+(detail.re[2]||'')+'">';
				d += '<div class="inputips">';
					d += '<a title=i>不分大小写</a>';
					d += '<a title=g>全局替换</a>';
					d += '<a title=ig>ig</a>';
				d += '</div>';
			d += '</div>';
		d += '</td>';
		d += '<td class=td_type>';
			d += '<select name="type" class="type number">';
				d += '<option value="">无</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="1"'+((detail.type == 1)?" selected":"")+' title="补全链接">URL</option>';
				d += '<option value="2"'+((detail.type == 2)?" selected":"")+' title="数字的值">数值</option> ';
				d += '<option value="3"'+((detail.type == 3)?" selected":"")+' title="有值(1),空值(0)">布尔</option> ';
				d += '<option disabled>------------</option>';
				d += '<option value="4"'+((detail.type == 4)?" selected":"")+' title="内容字节长度">长度</option> ';
				d += '<option value="5"'+((detail.type == 5)?" selected":"")+' title="截取内容">截取</option> ';
				d += '<option disabled>------------</option>';
				d += '<option value="6"'+((detail.type == 6)?" selected":"")+' title="获取URL属性值,组值">属性组值</option> ';
				d += '<option value="7"'+((detail.type == 7)?" selected":"")+' title="正则匹配,组值">正则组值</option> ';
				d += '<option disabled>------------</option>';
				d += '<option value="8"'+((detail.type == 8)?" selected":"")+' title="获取时间">获取时间</option> ';
				d += '<option disabled>------------</option>';
				d += '<option value="9"'+((detail.type == 9)?" selected":"")+' title="解析为对象（JSON.parse）">析为对象</option> ';
				d += '<option value="10"'+((detail.type == 10)?" selected":"")+' title="解析为字对象符串（JSON.stringify）">析为字符</option> ';
			d += '</select> ';
		d += '</td>';
		d += '<td class=td_fun>';
				var df = detail.f || {};
				d += '<select style=width:114px class="fun t4 number" name="t" title="长度计算方式">';
					d += '<option value="">字符</option>';
					d += '<option value="1"'+((df.t == 1)?" selected":"")+' >字节</option>';
					d += '<option value="2"'+((df.t == 2)?" selected":"")+' >全半角</option>';
				d += '</select> ';
				d += '<input style=width:40px;margin-right:10px; class="fun t5 number" name="l" placeholder="40" type="number" min=1 value="'+(df.l||'')+'" title="截取长度:默认40"> ';
				d += '<input style=width:40px; class="fun t5" name="m" type="text" value="'+(df.zf||'')+'" title="超出字符"> ';
				d += '<input style=width:120px class="fun t6" name="s" type="text" value="'+(df.s||'')+'" title="Url属性组值" placeholder="组值规则"> ';
				d += '<input style=width:120px;margin-right:10px; class="fun t7" name="r" type="text" value="'+(df.r||'')+'" title="正则式" placeholder="正则式"> ';
				d += '<input style=width:120px class="fun t7" name="s" type="text" value="'+(df.s||'')+'" title="组值" placeholder="组值规则"> ';
				d += '<input style=width:82px;margin-right:10px; class="fun t8" name="c" type="text" value="'+(df.c||'')+'" title="日期时间格式设置"> ';
				d += '<select style=width:65px class="fun t8 number" name="q" title="时区">';
						d += '<option value="">时差</option>';
					for(var sqi = -12;sqi<0;sqi++){
						d += '<option value="'+sqi+'"'+((df.q == sqi)?" selected":"")+' >'+sqi+'</option>';
					}
						d += '<option disabled>--</option>';
					for(var sqi = 1;sqi<13;sqi++){
						d += '<option value="'+sqi+'"'+((df.q == sqi)?" selected":"")+' >+'+sqi+'</option>';
					}
				d += '</select> ';
		d += '</td>';
		
		d += '<td class=td_fy>';
			d += '<select name="sl" class="sl">';
					d += '<option value="">自动</option>';
					d += '<option value="zh-CN"'+((fy&&fy[1] == "zh-CN")?" selected":"")+' >中文</option>';
					d += '<option value="zh-TW"'+((fy&&fy[1] == "zh-TW")?" selected":"")+' >中文(繁)</option>';
					d += '<option value="yue"'+((fy&&fy[1] == "yue")?" selected":"")+' >粤语</option>';
					d += '<option value="en"'+((fy&&fy[1] == "en")?" selected":"")+' >英文</option>';
					d += '<option value="ja"'+((fy&&fy[1] == "ja")?" selected":"")+' >日语</option>';
					d += '<option value="ko"'+((fy&&fy[1] == "ko")?" selected":"")+' >韩语</option>';
					d += '<option value="es"'+((fy&&fy[1] == "es")?" selected":"")+' >西班牙语</option>';
					d += '<option value="de"'+((fy&&fy[1] == "de")?" selected":"")+' >德语</option>';
					d += '<option value="fr"'+((fy&&fy[1] == "fr")?" selected":"")+' >法语</option>';
					d += '<option value="ru"'+((fy&&fy[1] == "ru")?" selected":"")+' >俄语</option>';
					d += '<option value="ru"'+((fy&&fy[1] == "ar")?" selected":"")+' >阿拉伯语</option>';
					d += '<option value="th"'+((fy&&fy[1] == "th")?" selected":"")+' >泰语</option>';
					d += '<option value="vi"'+((fy&&fy[1] == "vi")?" selected":"")+' >越南</option>';
			d += '</select>';
			d += ' <span class="icon-hand-right"> </span> ';
			d += '<select name="tl" class="tl">';
					d += '<option value=""></option>';
					d += '<option value="zh-CN"'+((fy&&fy[0] == "zh-CN")?" selected":"")+' >中文</option>';
					d += '<option value="zh-TW"'+((fy&&fy[0] == "zh-TW")?" selected":"")+' >中文(繁)</option>';
					d += '<option value="yue"'+((fy&&fy[0] == "yue")?" selected":"")+' >粤语</option>';
					d += '<option value="en"'+((fy&&fy[0] == "en")?" selected":"")+' >英文</option>';
					d += '<option value="ja"'+((fy&&fy[0] == "ja")?" selected":"")+' >日语</option>';
					d += '<option value="ko"'+((fy&&fy[0] == "ko")?" selected":"")+' >韩语</option>';
					d += '<option value="es"'+((fy&&fy[0] == "es")?" selected":"")+' >西班牙语</option>';
					d += '<option value="de"'+((fy&&fy[0] == "de")?" selected":"")+' >德语</option>';
					d += '<option value="fr"'+((fy&&fy[0] == "fr")?" selected":"")+' >法语</option>';
					d += '<option value="ru"'+((fy&&fy[0] == "ar")?" selected":"")+' >阿拉伯语</option>';
					d += '<option value="ru"'+((fy&&fy[0] == "ru")?" selected":"")+' >俄语</option>';
					d += '<option value="th"'+((fy&&fy[0] == "th")?" selected":"")+' >泰语</option>';
					d += '<option value="vi"'+((fy&&fy[0] == "vi")?" selected":"")+' >越南</option>';
			d += '</select>';
			d += ' <select name="dict" class="dict number">';
					d += '<option value="">词典</option>';
					d += '<option value="1"'+((fy&&fy[2] == "1")?" selected":"")+'>google</option>';
					d += '<option value="2"'+((fy&&fy[2] == "2")?" selected":"")+'>baidu</option>';
					d += '<option value="3"'+((fy&&fy[2] == "3")?" selected":"")+'>youdao</option>';
			d += '</select>';
		d += '</td>';
		
		d += '<td class=td_data>';
			d += '<select name="del" class="del number">';
				d += '<option value="">存储数据</option>';
				d += '<option value="1"'+((detail.del == 1)?" selected":"")+' title="数据不存储，仅供引用">仅供引用</option>';
			d += '</select> ';
			d += '<select name="del_empty" class="del_empty number">';
				d += '<option value="" title="保留空值">保留空值</option>';
				d += '<option value="1"'+((detail.del_empty == 1)?" selected":"")+' title="删除空值字段">删除空值</option>';
			d += '</select> ';
			d += '<select name="del_empty_arr" class="del_empty_arr number">';
				d += '<option value="" title="保留空数组">保留空数组</option>';
				d += '<option value="1"'+((detail.del_empty_arr == 1)?" selected":"")+' title="删除空数组">删除空数组</option>';
			d += '</select> ';
		d += '</td>';
		
		d += '<td class=td_if>';
			d += '<select name="if" class="if number">';
				d += '<option value="">选择过滤条件</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="1"'+((detail.if == 1)?" selected":"")+' title="值为空时或无效时，删除本条记录">空值过滤</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="11"'+((detail.if == 11)?" selected":"")+' title="值等于设定值时，删除本条记录">值等于..</option>';
				d += '<option value="12"'+((detail.if == 12)?" selected":"")+' title="值不等于设定值时，删除本条记录">值不等于..</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="21"'+((detail.if == 21)?" selected":"")+' title="数组长度小于设定值时，删除本条记录">数组项小于</option>';
				d += '<option value="22"'+((detail.if == 22)?" selected":"")+' title="数组长度等于设定值时，删除本条记录">数组项等于</option>';
				d += '<option value="23"'+((detail.if == 23)?" selected":"")+' title="数组长度大于设定值时，删除本条记录">数组项大于</option>';
				d += '<option value="24"'+((detail.if == 24)?" selected":"")+' title="数组长度不等于设定值时，删除本条记录">数组项不等</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="31"'+((detail.if == 31)?" selected":"")+' title="值正则匹配，删除本条记录">正则匹配</option>';
				d += '<option value="32"'+((detail.if == 32)?" selected":"")+' title="值正则不匹配，删除本条记录">正则不匹配</option>';
				d += '<option disabled>------------</option>';
				d += '<option value="41"'+((detail.if == 41)?" selected":"")+' title="早于指定时间，删除本条记录">早于指定时间</option>';
				d += '<option value="42"'+((detail.if == 42)?" selected":"")+' title="晚于指定时间，删除本条记录">晚于指定时间</option>';
				d += '<option value="43"'+((detail.if == 43)?" selected":"")+' title="早于当前时间范围，删除本条记录">早于当前时间</option>';
				d += '<option value="44"'+((detail.if == 44)?" selected":"")+' title="晚于当前时间范围，删除本条记录">晚于当前时间</option>';
			d += '</select> ';
			d += '<input style=margin-right:10px; class="o" name="o" type="text" value="'+(detail.o||'')+'" title="条件值"> <span class=oSpan>个</span>';
		d += '</td>';
		
		
		d += '<td>';
			d += '<div class=czdiv> ';
				d += '<button type="submit" class="btn btn-mini tr_add"><i class="icon-plus"></i></button> ';
				d += '<button type="submit" class="btn btn-mini tr_up"><i class="icon-arrow-up"></i></button> ';
				d += '<button type="submit" class="btn btn-mini tr_down"><i class="icon-arrow-down"></i></button> ';
				d += '<button type="button" class="btn btn-mini tr_del"><i class="icon-trash"></i></button> ';
			d += '</div> ';
		d += '</td>';
		d += '</tr>';
		
	return d;
}

/* change :get */
function change_get($tr,val,focus){
	var $attr = $tr.find('input.attr');
	var $d = $tr.find('select.d')
		,d = $d.val();
	if(!val||val == '2'){
		$attr.attr('disabled','disabled').val('');
	}else if(val == '1'||val == '3'){
		$attr.removeAttr('disabled');
		if(focus){$attr.focus()}
	}else if(val == '4'){
		$attr.attr('disabled','disabled').val('');
	}
}
function change_d($tr,val,focus){
	
	var  $dom = $tr.find('input.dom')
		,$filte = $tr.find('input.filte')
		,$get = $tr.find('select.get')
		,$attr = $tr.find('input.attr')
		,add = $tr.find('select.add').val();
	
	if(val == 'diy' || add){
		$dom.add($tr.find('select.d')).hide();
		$tr.find('.d').add($dom).add($filte).add($get).add($attr).attr('disabled','disabled').val('');
		$tr.find('.add').show();
	}else if(!val || val == '1'){
		$dom.removeAttr('disabled');
		if(focus){$dom.focus()}
	}else if(val == '-1'){
		$filte.add($get).add($attr).removeAttr('disabled');
		$dom.attr('disabled','disabled').val('');
	}else if(val == '2'||val == '3'){
		$dom.attr('disabled','disabled').val('');
		if(val == '3'){
		$get.add($filte).add($attr).attr('disabled','disabled').val('');
		}else{
		$get.add($filte).add($attr).removeAttr('disabled');
		}
	}
	
	$tr.attr('d',val)
}
function change_arr($tr,val,focus){
	var  $fg = $tr.find('input.fg');
//	if(val == 2){
//		$fg.attr('disabled','disabled').val('');
//	}else if(!$tr.find('select.add').val()){
//		$fg.removeAttr('disabled');
//	}
	if(!val){
		$fg.attr('disabled','disabled').val('');
	}else{
		$fg.removeAttr('disabled');
	}
	if(focus){$tr.find('input.fg').focus()}
}
function change_type_1($tr,val,focus){
	if(val == 1){
		var $domain = $("#set").find("input[name='domain']").parent();
		if($domain.hasClass('hide')){
			$domain.removeClass('hide').shanshuo();
		}
	}
}
function change_type($tr,val,focus){

	var  $all = $tr.find('td.td_fun').find('input,select')
		,$this = $all.filter('.t'+val)
		,$other = $all.not($this);
		$other.hide().val('');
	if(val){
			$this.show();
	}
	
}
function change_if($tr,val,focus){
	var $o = $tr.find('input.o')
		,$oSpan = $tr.find('.oSpan');
	if(val==1||!val){
		$o.hide().val('')
	}else{
		if(focus){$o.focus()}
		if(val>10&&val<20){
			$o.show().css("width","52px");$oSpan.hide()
		}else if(val>20&&val<30){
			$o.show().css("width","25px");$oSpan.show().text('个')
		}else if(val>30&&val<40){
			$o.show().css("width","120px");$oSpan.hide()
		}else if(val==41||val==42){
			$o.show().css("width","120px");$oSpan.show().text('日期')
		}else if(val==43||val==44){
			$o.show().css("width","52px");$oSpan.show().text('秒')
		}
	}


}
function change_add($tr,val,focus){
	
	var  $all = $tr.find('.add_fun')
		,$this = $all.filter('.a'+val)
		,$other = $all.not($this);
		$other.hide().val('');
	if(val){
			$tr.find('input.dom').val('').hide();
			if(val == 'dom'){	// 取消
				$tr.find('select.add').hide().val('');
				$tr.find('.d,.dom,.filte,.get').val('').removeAttr('disabled');
				$tr.find('.d,.dom').show();
			}
			$this.show();
	}else{
		$tr.find('input.dom').show();
	}
	
	$tr.attr('a',val)
}
function change_del($tr,val,focus){
	var  $id = $tr.find('input.id');
	if(val){
		$id.addClass('isdel')
	}else{
		$id.removeClass('isdel');
	}
}

/* 载入配置 */
function loadset(data){
console.log(data)
	var $set= $("#set"),
		$tbody= $set.find("tbody"),
		$title=$set.find("input[name='title']"),
		$t=$set.find("select[name='t']"),
		$url=$set.find("input[name='url']"),
		$domain=$set.find("input[name='domain']"),
		$id2url=$("#id2url"),
		$ylID=$("#ylID"),
		$items=$set.find("input[name='items']");
		$re0=$set.find(".allre input[name='re0']");
		$re1=$set.find(".allre input[name='re1']");
		$re2=$set.find(".allre input[name='re2']");
	
	/* 设置类型 */
	change_t(data.t);
	
	/* 设置翻译 */
	var fy = data.fy || {};
	
	/* 设置过滤 */
	$re0.val('');
	$re1.val('');
	$re2.val('');
	if(data.re){
		for(var i in data.re){
			$set.find(".allre input[name='re"+i+"']").val(data.re[i]);
		}
	}
	
	/* 加载数据 */
	var d = "",showClass='',show_filte,show_arr,show_arr_,show_re,show_type,show_data,show_out;
	for(var i in data.d){
		d += code(data.d[i],fy[data.d[i].id]);
		
		/* 判断显示的方法 */
		if(data.d[i].filte)show_filte=true;
		if(data.d[i].arr)show_arr=true;
		if(data.d[i].arr_item_del||data.d[i].arr_item_re||data.d[i].arr_item_sort)show_arr_=true;
		if(data.d[i].re.length)show_re=true;
		if(data.d[i].type)show_type=true;
		if(data.d[i].del||data.d[i].del_empty||data.d[i].del_empty_arr)show_data=true;
		if(data.d[i].out)show_out=true;
		
	}
	if(show_filte)showClass+='show_filte';
	if(show_arr)showClass+=' show_arr';
	if(show_arr_)showClass+=' show_arr_';
	if(show_re)showClass+=' show_re';
	if(show_type)showClass+=' show_type';
	if(data.fy)showClass+=' show_fy';
	if(show_data)showClass+=' show_data';
	if(show_out)showClass+=' show_out';
	
	
	$title.val(data.title);
	$t.val(data.t);
	$url.val(data.url);
	$domain.val(data.domain);
	$id2url.val(data.id2url);
	$ylID.val(data.ylid);
	if(t==1&&$.type(data.items) == 'array'){
		$items.val(data.items.join('.'));
	}else{
		$items.val(data.items);
	}

	$tbody.html(d);
	
	
	/* 二次处理 */
	$tbody.children().each(function(i){
		change_type($(this),data.d[i].type);
		change_add($(this),data.d[i].add);
		change_d($(this),data.d[i].d);
		change_get($(this),data.d[i].get);
		change_arr($(this),data.d[i].arr);
		change_del($(this),data.d[i].del);
		change_if($(this),data.d[i].out);
	});
	
	$tbody.find('select').each(function(i){
		if($(this).val()){
			$(this).addClass('selectOn')
		}else{
			$(this).removeClass('selectOn')
		}
	})
	
	if(data.domain||urlValIsTrue(data.d))$domain.parent().removeClass('hide');

	$set.removeClass('show_filte show_arr show_arr_ show_re show_type show_fy show_data show_out');
	if(showClass)$set.addClass(showClass);
	$set.show();
}

/* 获取项值 */
function getTrVal($tr,v){
	var $alldata = $tr.find("input:text,input[type=number],input:checkbox:checked,select"),
		d = {},f={},fIsTrue,a={},aIsTrue;
	// 获取
	$alldata.each(function(i){
		var  val = $(this).val()
			,n = $(this).attr('name');
			if($(this).hasClass('number')){
				if(v&&isNaN(val)){$(this).focus().shanshuo();return false}
				val = Number(val);
			}
			
			if(val){
				// 转换 - 数值型
				if($(this).hasClass('fun')){
					f[n] = val;
					fIsTrue = true;
				}else if($(this).hasClass('add_fun')){
					aIsTrue = true;
					// 系列化数据处理
//					if($(this).hasClass('a2')){
//						try{
//							a[n] = JSON.parse(val);
//						}catch(err){
//							$(this).focus().shanshuo();return false
//						}
//					}else{
						a[n] = val
//					}
				}else{
					d[n] = val;
				}
			}
			
	})
	
	// 转换 - 值替换数组
	if(d.re0){
		d.re = [d.re0];
		if(d.re1||d.re2)d.re.push(d.re1||'');
		if(d.re2)d.re.push(d.re2);
	}
	delete d.re0;
	delete d.re1;
	delete d.re2;
	if(d.attr&&d.get==1){
		d.attr = d.attr.split(',')
		for(var i in d.attr){
			if(d.attr[i] == 'src'){
				d.attr[i] = '_src'; // _src 前台显示为src
			}
		}
	};
	
	// 方法参数
	if(fIsTrue){
		d.f = f;
	}
	if(aIsTrue){
		d.a = a;
	}
	
	
	// 项目过滤（附属值为数值）
	if(d.out>20 && d.out<30 && d.o>0) d.o = Number(d.o);
	if((d.out==43 ||d.out==44) && d.o>0) d.o = Number(d.o);
	
	// 不同类型的数据处理
	if(t == 1){
		if(d.dom){
			d.dom = d.dom.split('.');
		};
		
		// 不需要的数据
		delete d.d;
		delete d.get;
		delete d.attr;
		delete d.td_filte;
		delete d.arr;
		delete d.fg;
	}
	
	// 验证 - id,dom 必填
	if(!d.id && v){$alldata.filter('[name=id]').focus().shanshuo();_alert('错误!');return false}
	if(!d.dom && v && t == 0 && (!d.d||d.d==1) && !d.add){$alldata.filter('[name=dom]').focus().shanshuo();_alert('错误!');return false}
	
	// 验证 - 获取为属性值,必须有属性的类型
	if((d.get == 1 || d.get == 3)&& !d.attr && v){$alldata.filter('[name=attr]').focus().shanshuo();_alert('错误!');return false}
	
	// 验证 - 选择器不能用数字开头
	if(d.dom && d.dom[0] >= 0 && t == 0 && v){$alldata.filter('[name=dom]').focus().shanshuo();_alert('错误!');return false}
	if(d.filte && d.filte[0] >= 0 && t == 0 && v){$alldata.filter('[name=filte]').focus().shanshuo();_alert('错误!');return false}
	
	// 验证 - 自建附加值
	if(v && d.add >= 1 && d.add <= 2 &&(!d.a||(!d.a.v&&d.a.v!==0))){$alldata.filter('[name=v]:visible').focus().shanshuo();_alert('错误!');return false}
	
	// 验证 - 值转换类
	if(v && d.type == 6&&(!d.f||!d.f.s)){$alldata.filter('[name=s]:visible').focus().shanshuo();_alert('错误!');return false}
	if(v && d.type == 7&&(!d.f||!d.f.r)){$alldata.filter('[name=r]:visible').focus().shanshuo();_alert('错误!');return false}
	if(v && d.type == 7&&(!d.f||!d.f.s)){$alldata.filter('[name=s]:visible').focus().shanshuo();_alert('错误!');return false}
	
	// 验证 - 项目过滤
	if(v && d.out > 1&& !d.o){$alldata.filter('[name=o]:visible').focus().shanshuo();_alert('错误!');return false}
	if(v && d.out > 20&& d.out < 30 && !(d.o>=0)){$alldata.filter('[name=o]:visible').focus().shanshuo();_alert('错误!');return false}
	if(v && (d.out==43 ||d.out==44) && !(d.o>=0)){$alldata.filter('[name=o]:visible').focus().shanshuo();_alert('错误!');return false}

	return d;
}

var t = 0;
function change_t(v,loads){
	t = v;
	var $set= $("#set");
		$set.addClass('t'+v);
		if(v == 1){
			$set.removeClass('t0')
		}else{
			$set.removeClass('t1')
		}
		
	if(loads)loadset(getVal());
}

// 判断设置里是否存在url值的对象
function urlValIsTrue(d){
	for(var i in d){
		if(d[i].type == 1)return true;
	}
	return false
}

function getVal(v,peizhi){
	var $set= $("#set"),
		$tbody= $set.find("tbody"),
		$t=$set.find("select[name='t']"),
		$url=$set.find("input[name='url']"),
		$domain=$set.find("input[name='domain']"),
		$id2url=$("#id2url"),
		$ylID=$("#ylID"),
		$items=$set.find("input[name='items']");
		$re0=$set.find(".allre input[name='re0']");
		$re1=$set.find(".allre input[name='re1']");
		$re2=$set.find(".allre input[name='re2']");
	
	var o = {};
	
		// 类型
		o.t = Number($t.val());
	
	// 获取url
		o.url = $url.val();if(!o.url&&v){$url.focus().shanshuo();return false};
		if(!o.url)delete o.url;
		
	// 获取绑定模板ID
		o.ylid = $ylID.val();
		if(!o.ylid)delete o.ylid;
	
	// id生成网址方法前缀
		o.id2url = $id2url.val();
		if(!o.id2url)delete o.id2url;
	
	
	// 获取相对域
		o.domain = $domain.val();
		if(!o.domain){
			delete o.domain;
		}else if(o.domain[o.domain.length-1]!='/'){
			// 补全 '/'
			o.domain += '/';
		}
	
	// 获取代码过滤
	var re0 = $re0.val();
	if(re0){
		o.re = [re0];
		var re1=$re1.val(),re2=$re2.val();
		if(re1||re2)o.re.push(re1||'');
		if(re2)o.re.push(re2);
	}
	
	// 获取项集
		o.items = $items.val();
		if(!o.items){
			delete o.items
		}else if(t == 1){
			o.items = o.items.split('.')
		};
	
		
	o.d=[];
	$tbody.children().each(function(i){
		var d = getTrVal($(this),v);
		if(d===false){o=false;return false;}
		o.d.push(d)
	});
	
	// 转换翻译的数据结构
	var fy = {},fyIsTrue;
	for(var i in o.d){
		var trd = o.d[i]
		if(trd.sl || trd.tl || trd.dict){
			fyIsTrue = true;
			trd.tl = trd.tl || 'zh-CN';
			fy[trd.id] = [trd.tl];
				delete o.d[i].tl;
			if(trd.dict){
				fy[trd.id][2] = trd.dict;
				delete o.d[i].dict;
				if(!trd.sl)fy[trd.id][1]=0;
			}
			if(trd.sl){
				fy[trd.id][1]=trd.sl;
				delete o.d[i].sl;
			}
		}
	}
	if(fyIsTrue){
		o.fy = fy;
	}
	
	
	// -- 判断,获取配置的数据:删除不必要的字段
	if(peizhi){
		delete o.ylid;
		if(!urlValIsTrue(o.d)){
			delete o.url;
			delete o.domain;
		}else if(o.domain){
			delete o.url;
		}
	}
	
	return o;
}

// 存储,get,set,remove,clear
//	save:{maxid:0,last:'id1',list:{id1:"name"}}
var save = {};

/* 加载完DOM执行*/
$(function(){
	var $set= $("#set"),$save= $("#save"),
		$tbody= $set.find("tbody");
	
	// 存储右边数据
	function srd(){
		// 存储
		var d={},
			saveid=$set.attr('saveid');
			d[saveid] = getVal();
		chrome.storage.sync.set(d,function(e){
			// console.log(chrome.runtime.lastError)
		})
	}
	
	
	// 设置按钮
	$set.on('change','select,input',function(e){
		var val = $(this).val(),
			$tr = $(this).parents('tr');
		if($(this).hasClass('t')){
			change_t(val,true);
			$tbody.find('input.dom').removeAttr('disabled')
//		}else if($(this).hasClass('type')){
//			change_type($tr,val)
		}else if($(this).hasClass('get')){
			change_get($tr,val,true)
		}else if($(this).hasClass('d')){
			change_d($tr,val,true)
		}else if($(this).hasClass('arr')){
			change_arr($tr,val,true)
		}else if($(this).hasClass('del')){
			change_del($tr,val,true)
		}else if($(this).hasClass('type')){
			change_type_1($tr,val,true)
			change_type($tr,val,true)
		}else if($(this).hasClass('add')){
			change_add($tr,val,true)
		}else if($(this).hasClass('out')){
			change_if($tr,val,true)
			
		}
		srd();
		
		// 即时更新配置源码
		if($('#yulan').hasClass('source'))Process(getVal(false,true));
		
	// id 提示
	})
	.on('change','select',function(e){
		var $this = $(e.target);
		if($this.val()){
			$this.addClass('selectOn')
		}else{
			$this.removeClass('selectOn')
		}
	})
	.on('focus','.inputip_warp input',function(e){
		$(this).parents('.inputip_warp').find('.inputips').show();
	}).on('focusout','.inputip_warp input',function(e){	// 离开输入
		var $inputips = $(this).parents('.inputip_warp').find('.inputips');
			if(!$inputips.hasClass('hover')){
				$inputips.hide();
			}
	}).on('mousemove','.inputips',function(e){
		$(this).parents('.inputip_warp').find('.inputips').addClass('hover')
	}).on('mouseout','.inputips',function(e){
		$(this).parents('.inputip_warp').find('.inputips').removeClass('hover')
	}).on('click','.inputips',function(e){
		var $warp = $(this).parents('.inputip_warp'),
			$inputips = $warp.find('.inputips');
			$inputips.hide();
		var $a = $(e.target);
			if($a.attr('title')){
				$warp.find('input').val($a.attr('title'));
				srd();
			}
	// id 提示end
	}).on('keypress','select,input',function(e){
		if(e.keyCode == 13){
			srd();
			if($('#yulan').hasClass('source')){
				Process(getVal(false,true))
			}else{
				gotest();
			}
			return false
		}
	}).on('click','a.caozuo',function(e){
		$set.addClass($(this).attr('ff'))
	}).on('click','button',function(e){
		if($(this).hasClass('tr_add')){
			var $newtr=$(code());
				$newtr.insertAfter($(this).parents('tr')).shanshuo();
				srd();
		}else if($(this).hasClass('tr_del')&&$tbody.children().size()>1){
				$(this).parents('tr').hide("fast",function(){$(this).remove();srd();});
		}else if($(this).hasClass('tr_up')){
			var $tr = $(this).parents('tr');
				$tr.insertBefore($tr.prev()).shanshuo();
				srd();
		}else if($(this).hasClass('tr_down')){
			var $tr = $(this).parents('tr');
				$tr.insertAfter($tr.next()).shanshuo();
				srd();
		}else if($(this).hasClass('del')){
				_alert("确认删除?",'',
					{
						ok:function(){
							var saveid=$set.attr('saveid');
								$("#save td[saveid="+saveid+"]").remove();
								$set.hide();
							// 删除存储
							chrome.storage.sync.remove(saveid);
							for(var i in save.list){
								if(save.list[i][0] == saveid){
									delete save.list[i];
									chrome.storage.sync.set({save:save})
									break
								}
							}
							// 返回第一个
							$save.find('tbody td:last').click();
						},
						c:function(){}
					}
				)
		}else if($(this).hasClass('hideleft')){
			$("body").removeClass('hideleft')
		}
	});
	
	$("#ylID").on('click',function(e){
		srd();
	});
	

	// 分析数据
	function _hqym(data,o,t,yl){
		
		var h1  = $.now() - t;
		chrome.extension.sendMessage({type:"analy",dom:data,p:o},function(d){
			console.log('ok')
			$('.gotest').button('reset');
			var h2 = $.now() - t - h1;
			$("#yulan").removeClass('source').show().find("#title").text('数据 | ['+h1+'ms 加载执行] ['+h2+'ms 分析]');
			
			// 获取值的数量,反馈
			if(d.total>0){
				var items_total = {};
					for(var i in o.d){
						var name = o.d[i].id;
							items_total[name] = 0;
					}
					for(var i in d.items){
						for(var x in d.items[i]){
							items_total[x] += 1;
						}
					}
					
					
				// 显示获取数量不足的项的提示
				$tbody.find('td.td_id').each(function(i){
					var $input = $(this).find('input'),
						$tipno = $(this).find('.tipno'),
						v = $input.val();

					if(items_total[v] != d.total && !o.d[i].del){
						$tipno.text(d.total-items_total[v]).show().delay(22000).fadeOut();
					}else{
						$tipno.hide()
					}
				});

				// 组件新的数据组
//				var d = {
//					total:d.total,				// 返回的总量
//					items_total:items_total,	// 每个字段返回的个数
//					items:d.items				// 详细数据
//				}
			}
			
			$("#yulan").data('d',d);
			// 载入
			Process(d);
			
			// 预览
			if(yl){
				var SaveId = $("#set").attr('saveid'),
					PageUrl = 'yl/yl.html?'+SaveId;
					
					// 传递(local下保存yl)预览的数据
					d._url = o.url;							// 网址
					d._title = $("#save td.this a").text();	// 解析器标题
					d._jsonTemplate = $("#ylID").val();;	// 绑定的模板id
					
				chrome.storage.local.set({yl:d},function(e){
						
						PageUrl = chrome.extension.getURL(PageUrl);
						chrome.tabs.query({url:PageUrl},function(Tabs){
							if(Tabs[0]){
								chrome.tabs.reload(Tabs[0].id)
								chrome.windows.update(Tabs[0].windowId,{focused:true})
								chrome.tabs.update(Tabs[0].id,{selected:true})
							}else{
								chrome.tabs.create({url:PageUrl,selected:true});
							}
						})
									
					
					
				})
			}
		
		})

	}
	
	// 缓存监听
	chrome.extension.onMessage.addListener(
	  function(request,sender,sendResponse){
		if(request.type == 'cache'){
			_hqym(request.dom,request._in.o,request._in.t,request._in.yl)
		}
	});

	
	// 点击测试
	function gotest(yl){
		var $button = $('.gotest');
			$("#yulan").hide();
			var o = getVal(true);
				
			if(o){
				$button.button('loading');
				if(o.t==0&&($('#qt').hasClass('active') || $('#hc').hasClass('active'))){
					chrome.tabs.query({url:o.url},function(Tabs){
						var _in = {t:$.now(),o:o,yl:yl};
						if(Tabs.length>0){
							thisTabId = Tabs[0].id;
							if($('#qt').hasClass('active')){
								chrome.tabs.reload(Tabs[0].id,{bypassCache:true},function(){
									chrome.tabs.executeScript(Tabs[0].id,{code:'var _in='+JSON.stringify(_in),runAt:'document_idle'});
									chrome.tabs.executeScript(Tabs[0].id,{file:'infuse/test.js',runAt:'document_idle'});
								})
							}else{
								chrome.tabs.executeScript(Tabs[0].id,{code:'var _in='+JSON.stringify(_in),runAt:'document_idle'});
								chrome.tabs.executeScript(Tabs[0].id,{file:'infuse/test.js',runAt:'document_idle'});
							}
						}else{
							chrome.tabs.create({url:o.url,selected:false},function(c){
								chrome.tabs.executeScript(c.id,{code:'var _in='+JSON.stringify(_in),runAt:'document_idle'});
								chrome.tabs.executeScript(c.id,{file:'infuse/test.js',runAt:'document_idle'});
							});
						}
						
					})
					
				}else{
					var time0 = $.now();
						$.ajax({
							url:o.url,
							dataType:'text',
							cache:false,
							success:function(data){
								_hqym(data,o,time0,yl)
							},
							error:function(data){
								$('.gotest').button('reset');
								$('#url').shanshuo();
							}
						})
				}
			}
	}
	
	$('.gotest').on('click',function(e){
		gotest()
	});
	$('.gosource').on('click',function(e){
		var v = getVal(true,true);
		if(!v)return;
		$("#yulan").addClass('source').show().find("#title").text('配置源码')
		Process(v)
	});
	
	// 点击预览
	$('.yl').on('click',function(e){
		if($("#ylID").val()){
			gotest(true)
		}else{
			$("#ylID").focus();
			_alert('先绑定预览模板....')
		}
	});
	
	// 新建
	function addnew(name,notedit){
		var newId = save.maxid + 1;
		name = name || '未命名'+newId;
		var c = '';
		if(notedit){
		c += '<tr><td saveid=id'+newId+'>';
		}else{
		c += '<tr><td saveid=id'+newId+' class=edit>';
		}
		c += '<input type="text" value="'+name+'">';
		c += '<a>'+name+'</a>';
		c += '</td></tr>';
		var $new = $(c);$new.appendTo($("#save tbody")).find('input').focus();
			$new.find('td').click();
		
		// 存储
		save.maxid = newId;
		save.list.push(["id"+newId,name])
		chrome.storage.sync.set({save:save})
	}
	$save.find('thead').on('click','button',function(e){
		if($(this).hasClass('add')){
			addnew()
		}else if($(this).hasClass('hideleft')){
			$("body").addClass('hideleft')
		}
	})
	// 存储菜单 
	$save.find('tbody').on('click','td',function(e){
		if(!$(this).hasClass('this')){
			$(this).addClass('this').parent().siblings().find('td').removeClass('this');
			var saveid = $(this).attr('saveid');
			chrome.storage.sync.get(saveid,function(s){
			//	console.log(chrome.runtime.lastError)
				loadset(s[saveid]||_default);
				$set.attr('saveid',saveid)
				save.last = saveid;
				chrome.storage.sync.set({save:save})
			})
		}
	}).on('dblclick','td',function(e){		// 进入编辑
		$(this).addClass('edit').find('input').focus();
	}).on('focusout','input',function(e){	// 离开输入
		$(this).parent('td').removeClass('edit');
	}).on('change','input',function(e){		// 更改文件名
			var n=$(this).val(),
				$td=$(this).parent('td'),
				saveid=$td.attr('saveid');
			$td.find('a').text(n);
			for(var i in save.list){
				if(save.list[i][0]==saveid){
					save.list[i][1]=n;
					chrome.storage.sync.set({save:save});
					break
				}
			}
	}).on('keypress','input',function(e){	// 回车保存
		if(e.keyCode==13){
			$(this).parent('td').removeClass('edit');
		}
	});
	
	// 安装
	chrome.storage.sync.get("save",function(s){
		// console.log(chrome.runtime.lastError)
		if(s.save===undefined){
			save={maxid:0,last:'',list:[]};
			chrome.storage.sync.set({save:save})
		}else{
			save = s.save;
			console.log(save)
			var c = '';
			save.list.sort(function(a,b){return a[1].localeCompare(b[1])}); 
			for(var i in save.list){
					c += '<tr><td saveid='+save.list[i][0]+'>';
					c += '<input type="text" value="'+save.list[i][1]+'">';
					c += '<a>'+save.list[i][1]+'</a>';
					c += '</td></tr>';
			}
			$("#save tbody").html(c);
			// 默认载入
			if(save.last){
				$("#save tbody").find('[saveid='+save.last+']').click()
			}
		}
	})

	// 复制
	function copy(v,p){
		if(v=='false'){ _alert('<strong>复制未成功!</strong> 配置错误!');return false;}
		$('#clipboard').css({top:p.top,left:p.left}).val(v).show().focus().select();
		document.execCommand('copy');
		$('#clipboard').val('').hide();
		 _alert('<strong>复制成功!</strong> '+v.length+'字节','alert-success');
	}
	// 黏贴
	function paste(p,json){
		$('#clipboard').css({top:p.top,left:p.left}).show().focus().select();
		document.execCommand('paste');
		var v = $('#clipboard').val();
		$('#clipboard').hide();
			
			v = v.replace(/^\s+|\s+$/g,'');
			if(json&&v[0]=='{'&&v[v.length-1]=='}'){
				return JSON.parse(v);
			}else{
				return false;
			}
	}
	
	
	
	$("#copy").click(function(e){
		var $y = $('#yulan');
		if($y.hasClass('source')){
			copy(JSON.stringify(getVal(true,true)),{top:e.clientY,left:e.clientX});
		}else{
			copy(JSON.stringify($y.data('d')),{top:e.clientY,left:e.clientX});
		}
	})
	
	$("#copy2").click(function(e){
		copy(JSON.stringify(getVal(false)),{top:e.clientY,left:e.clientX});
	})
	
	$("#down").click(function(e){
		var v,$y = $('#yulan'),filename,saveid,blob;
			saveid =$set.attr('saveid');
			for(var i in save.list){
				if(save.list[i][0] == saveid){
					filename= save.list[i][1];
					break
				}
			}

			if($y.hasClass('source')){
				v = getVal(true);
				filename+="_config.json"
			}else{
				v = $y.data('d');
				filename+="_get.json"
			}		
			blob = new Blob([JSON.stringify(v)]);
			
			saveAs(window.URL.createObjectURL(blob),filename)
	})
	
	$("#paste").click(function(e){
		var v = paste({top:e.clientY,left:e.clientX},true);
			if(v&&$.type(v)==='object'){
				_alert("确认覆盖当前设置?",'',
					{
						ok:function(){
							loadset(v);
							srd();
						},
						c:function(){}
					}
				)
			}else{
				_alert("粘帖数据格式错误!!!","alert-error")
			}
	})
	
	
	$("#urlopen").click(function(){
		var url = $("#url").val();
		if(url.substring(0,4) != "http")$("#url").shanshuo().focus();
		if($('.t').val() == 1){url = 'frame/json/index.html?'+url}
		OpenUrl(url)
	})
	
	$("#urlsource").click(function(){
		var url = $("#url").val();
		if(url.substring(0,4) != "http")$("#url").shanshuo().focus();
		if($('.t').val() == 1){url = 'frame/json/index.html?'+url}
		OpenUrl('view-source:'+url)
	})
	
	// 拖动事件监听
	$("html").bind("dragover",ondragover);
	$("html").bind("dragenter",ondragenter);
	$("html").bind("dragleave",ondragleave);
	$("html").get(0).addEventListener("drop",ondragdrop,false);

	// 拖拽进入对象时候
	function ondragenter(event){
		event.stopPropagation();
		event.preventDefault();
	}
	
	// 拖拽离开对象
	function ondragleave(event){
		event.stopPropagation();
		event.preventDefault();
		$("body").removeClass("ondragenter")
	}
	
	// 拖拽移动
	function ondragover(event){
	   event.stopPropagation();
	   event.preventDefault();
		$("body").addClass("ondragenter")
	}
	
	// 拖拽发开时
	function ondragdrop(event){
		event.stopPropagation();
		event.preventDefault();
		$("body").removeClass("ondragenter")
		var files = event.dataTransfer.files;
		var reader = new FileReader();
			reader.onload = (function(theFile) {
				return function(e) {
					console.log(e)
					var data = JSON.parse(e.target.result);
					// 提前存储配置
					var d={};
						d["id"+(save.maxid+1)] = data;
					chrome.storage.sync.set(d);
					// 打开新建
					addnew(files[0].name.replace(/.(txt|json)$/,''),true);
					$("#save tbody td:last").shanshuo();
				};
			})(files[0]);
		   reader.readAsText(files[0]);
		   // reader.readAsBinaryString(files[0]);
		   // reader.readAsDataURL(files[0]);
	}

});
// 获取以添加的文件


// 下载文件
function saveAs(url,name) {
	if(!url||!name) return false;
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml','a');
		save_link.href = url;
		save_link.download = name;

    var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
		save_link.dispatchEvent(event);
}

// 打开网址		---------------------------------------------------
function OpenUrl(PageUrl,XZ){
	// 默认显示
	if(XZ != false){XZ = true;}
	if(PageUrl.indexOf("http://") == 0){
	SelectedUrl = PageUrl;
	}else if(PageUrl.indexOf("view-source:http") == 0){
		chrome.tabs.create({url:PageUrl,selected:XZ});
		return true;
	}else{
	SelectedUrl = chrome.extension.getURL(PageUrl);
	}
	
	chrome.tabs.query({url:SelectedUrl},function(Tabs){
		if(Tabs[0]){
			chrome.windows.update(Tabs[0].windowId,{focused:true})
			chrome.tabs.update(Tabs[0].id,{selected:true})
		}else{
			chrome.tabs.create({url:SelectedUrl,selected:XZ});
		}
	})
}


// 提示
// alert-success,alert-error
function _alert(v,c,f){
	var $a = $('#alert');
	$a.attr("class","alert "+c).html(v)
	if(f){
		if(f.ok){
			var $ok = $('<button class="btn btn-mini btn-success ok" type="button"><i class="icon-ok-circle icon-white"></i> 确认</button>');
				$ok.appendTo($a);
				$ok.click(function(){
					f.ok();
					$a.hide();
				})
		}
		if(f.c){
			var $c = $('<button class="btn btn-mini btn-danger cancel" type="button"><i class="icon-ok-circle icon-white"></i> 取消</button>')
				$c.appendTo($a);
				$c.click(function(){
					f.c();
					$a.hide();
				})
		}
		$a.fadeIn(550);
	}else{
		$a.show().fadeOut(2000);
	}
}


// 存储空间
chrome.storage.sync.getBytesInUse(null,function(d){console.log(d)});

// 删除全部存储 chrome.storage.sync.clear()
// 删除指定存储 chrome.storage.sync.remove(saveid)
