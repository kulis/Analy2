// ylmb={maxid:0,data:{1}};
/* 加载完DOM执行*/
$(function(){
	var $div = $("#ylmbgl_div"),
		$id = $("#ylmbgl_div .ylmbgl_id"),
		$title = $("#ylmbgl_div .ylmbgl_title"),
		$code = $("#ylmbgl_div .ylmbgl_code"),
		
		$x_gl = $("#ylmbgl"),
		$x_bd = $("#ylID");
		
		
	// 存储菜单
	// chrome.storage.local.get({ylmb:null},function(d){console.log(d)})
	// chrome.storage.local.clear()
	$("#ylmbgl").on('change',function(e){
		var v = $(this).val();
		if(v>0){
			chrome.storage.local.get({ylmb:null},function(d){
				$id.text("id:"+v).attr("id",v)
				$title.val(d.ylmb.data[v].title)
				$code.val(d.ylmb.data[v].code)
				$div.show();
				$code.focus();
			})
		}else{
			chrome.storage.local.get({ylmb:null},function(d){
					d.ylmb = d.ylmb || {maxid:1,data:{}};
					d.ylmb.data[d.ylmb.maxid] = {title:'新建模板'+d.ylmb.maxid,code:''};
					$id.text("id:"+d.ylmb.maxid).attr("id",d.ylmb.maxid)
					$title.val('新建模板'+d.ylmb.maxid)
					$code.val('')
					d.ylmb.maxid += 1;
					chrome.storage.local.set({ylmb:d.ylmb},function(d){
						$div.show()
						$code.focus();
					})
			})
		}
		
		$(this).val('');
	});
	
	// 关闭
	$div.on('click','button',function(e){
		if($(this).hasClass('del')){
				_alert("确认删除?",'',
					{
						ok:function(){
							chrome.storage.local.get({ylmb:null},function(d){
								var id = $id.attr("id");
									delete d.ylmb.data[id];
									chrome.storage.local.set({ylmb:d.ylmb},function(d){$div.hide();upM();})
							})
						},
						c:function(){}
					}
				)
		}else{
			$div.hide();
			upM();
		}
	});
	
	
	// 加载更新菜单
	function upM(){
		chrome.storage.local.get({ylmb:null},function(d){
			var html='';
			if(d.ylmb){
				for(var i in d.ylmb.data){
					html+='<option value="'+i+'">'+d.ylmb.data[i].title+'</option>';	
				}
			};
			var gl = '<option value="" style="color:#999">模板管理</option>';
				gl += html;
				gl +='<option value="0" style="color:#999">+新建</option>'
				
			$x_gl.html(gl);
			var bd = '<option value="" style="color:#999">绑定模板</option>';
				bd += html;
			var thisbd = $x_bd.val();
			$x_bd.html(bd).val(thisbd);
			
		});
	};
	upM();
	
	// 自动存储
	$code.add($title).on('change',function(e){
			var $this = $(this);
			chrome.storage.local.get({ylmb:null},function(d){
				var id = $id.attr("id"),
					v = $this.val();
				
					if( $this.hasClass('ylmbgl_code')){
						d.ylmb.data[id].code =  v;
					}else if( $this.hasClass('ylmbgl_title') && v){
						d.ylmb.data[id].title = v;
					}

					chrome.storage.local.set({ylmb:d.ylmb})
			})
	})
})






