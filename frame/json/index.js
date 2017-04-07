var jsonUrl = window.location.href.replace(/.+\index.html\?/,'');
function ajax(url){
	
	$.ajax({
		url:url,
		dataType:"text",
		cache:false,
		success:function(data){
			$("#YM").html(data);
			try{
				Process(JSON.parse(data.replace(/^[^\{\[]+/,'').replace(/\)\s*$/,'')));
			}catch(err){
				$("#YM").html('');
				$("#Canvas").html('101 格式错误!!!')
			}
		},
		error:function(data){
			$("#YM").html('');
			$("#Canvas").html('错误!!!')
		}
	})
}


$(function(){
	var $input=$("input"),
		$go = $("button");
		
		if(jsonUrl){
			$input.val(jsonUrl);
			ajax(jsonUrl)
		}
		
		$go.click(function(){
			var url = $input.val()
			if(url){
				ajax(url);
				window.history.pushState({},document.title,location.href.replace(/\?(.+)/,'?'+url));
			}
		})
})