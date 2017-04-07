/* 加载完DOM执行*/
$(function(){
	
	chrome.storage.local.get({yl:null,ylmb:null},function(d){
		console.log(d)
		$("title").html(d.yl._title);
		var tid = d.yl._jsonTemplate;
		if(!tid){
			$("body").html("<b>未绑定预览模板!!!</b>")
		}else{
			$("body").bindTemplate({
				source      : d.yl 
			  , template    : d.ylmb.data[tid].code	// 预览模板
			  , tagOpen     : "{{"
			  , tagClose    : "}}"
			,
			});
		}
	})
	
})
