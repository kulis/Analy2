//*****************************************************************
//	基础juery插件
//		gaoliang:表单高亮
//		shanshuo:对象闪烁
//*****************************************************************
(function($){
	$.fn.gaoliang = function(option) {
		return this.change(function(){
			var thisVal = $(this).val();
			$(this)
			.find("option").andSelf().removeClass("gaoliang")
			if(thisVal){
				$(this)
				.find("option:selected").andSelf().addClass("gaoliang")
			}
		})
	}
	$.fn.shanshuo = function(option){
		return this
		.animate({opacity:.3},100).animate({opacity:.75},100)
		.animate({opacity:.5},100).animate({opacity:.8},100)
		.animate({opacity:.6},100).animate({opacity:1},200)
	}
})(jQuery);
