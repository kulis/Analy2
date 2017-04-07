/*
	itemsOut
		v		被验证的值
		out		验证方法
		o		验证方法附加值
	
	返回
		匹配		true
		不匹配	false
*/
function _itemsOut(v,out,o){
	if(out==1){
		return _.isEmpty(v);
	}else if(out>30){	// 正则式验证
	}else if(out>20){	// 数组长度验证
	}else if(out>10){	// 值匹配
	}
	return false;
}