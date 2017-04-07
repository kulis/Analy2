var _Fanyi = {
	auto:function(d,k){
		var a=0,c=[];
		k = k || {};
		k.auto = k.auto || [1,2,3];
		
		// 识别过滤不存在的翻译源
		if(k.tl=='yue'||k.sl=='yue'){
			k.auto = [2];
		}
		k.allerror = k.error;
		k.error = function(e){
			c[k.auto[a]]=e[0];
			a++;
			if(a<k.auto.length){
				_Fanyi[k.auto[a]](d.concat(),k);
			}else{
				if(k.allerror)k.allerror(c);
			}
		}
		_Fanyi[k.auto[0]](d.concat(),k);
	},
	g:['com.hk','com','com.sg','com.tw'],
	1:function(d,k){
		k = k || {}
		d=encodeURIComponent(d.join('\r'));
		var  type,e={from:1}
			,cycle = 0
			,dl = d.length;
			type = (dl < 1800)?'GET':'POST';
			e.send = type;
			e.cycle = 0;
			
			function ggm(){
				e.cycleName = _Fanyi.g[e.cycle];
				var  xhr = new XMLHttpRequest()
					,url = 'http://translate.google.'+e.cycleName+'/translate_a/t?client=t&sl='+(k.sl||'auto')+'&tl='+(k.tl||'zh-CN');
					xhr.onreadystatechange = function() {
						if(xhr.readyState == 4&&xhr.status == 200){
							try{
								var data = JSON.parse(xhr.responseText.replace(/,(?=,|\])/g,',""').replace(/\[,/g,'["",'))[0]
									,r='';
									for(var i=0;i<data.length;i++){
										r += data[i][0]
									}
									if(k.success)k.success(r.split('\r'),e);
									// 调整可用位置
									if(e.cycle){
										_Fanyi.g=_Fanyi.g.splice(e.cycle).concat(_Fanyi.g)
									}
							}catch(err){
								if(k.error){e.err = -1;k.error([e])}
							}
						}else if(xhr.readyState == 4){
							e.cycle ++;
							if(e.cycle < _Fanyi.g.length){
								ggm()
							}else{
								e.cycleName = _Fanyi.g.join(',');
								if(k.error){e.err = xhr.status;k.error([e])}
							}
						}
					}
				if(type == 'GET'){
					xhr.open(type,url+'&q='+d);
					xhr.send();
				}else{
					xhr.open(type,url);
					xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
					xhr.send('q='+d);
				}
			};
			ggm()
	},
	2:function(d,k){
		k = k || {};
		
		var  xhr = new XMLHttpRequest()
			,e={from:2,send:'POST'}
			,url = 'http://fanyi.baidu.com/transapi';
			
			// 参数匹配
			var dyzf={
				 'zh-CN':'zh'
				,'zh-TW':'zh'
				,ar:'ara'
				,fr:'fra'
				,ko:'kor'
				,es:'spa'
			}
			for(var i in dyzf){
				if(k.sl == i){k.sl = dyzf[i]}
				if(k.tl == i){k.tl = dyzf[i]}
			}


		if(!d.length)d.push('0');
		for(var i in d){d[i] = d[i].replace(/\n\*\n/)}
		d = 'from='+(k.sl||'auto')+'&to='+(k.tl||'zh-CN')+'&query='+encodeURIComponent(d.join('\n*\n'));
			
			xhr.open('POST',url);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4&&xhr.status == 200){
					try{
						var data = JSON.parse(xhr.responseText.replace(/,(?=,|\])/g,',""').replace(/\[,/g,'["",'))
							,r='';
							if(data.data&&data.data.length){
								for(var i=0;i<data.data.length;i++){
									if(data.data[i].src !== '*'){
										r += data.data[i].dst || '';
									}else{
										r += '\n*\n';
									}
								}
								if(k.success)k.success(r.split('\n*\n'),e)
							}else{
								if(k.error){e.err = -2;k.error([e])}
							}
					}catch(err){
						if(k.error){e.err = -1;k.error([e])}
					}
				}else if(xhr.readyState == 4){
					if(k.error){e.err = xhr.status;k.error([e])}
				}
			}
			xhr.send(d);
	},
	3:function(d,k){
		k = k || {};
		
		var  xhr = new XMLHttpRequest()
			,e={from:3,send:'POST'}
			,url = 'http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule&smartresult=ugc';
				
			// 参数匹配
			var dyzf={
				 'zh-CN':'ZH_CN'
				,'zh-TW':'ZH_CN'
				,ko:'kr'
				,es:'sp'
			}
			for(var i in dyzf){
				if(k.sl == i){k.sl = dyzf[i]}
				if(k.tl == i){k.tl = dyzf[i]}
			}
			var type = (k.sl+'2'+k.tl).toUpperCase();
			
		if(!d.length)d.push('0');
		for(var i in d){d[i] = d[i].replace(/\n\*\n/)}
		d = '&doctype=json&ue=UTF-8&keyfrom=fanyi.web&type='+type+'&i='+encodeURIComponent(d.join('\n*\n'));
			
			xhr.open('POST',url);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4&&xhr.status == 200){
					try{
						var data = JSON.parse(xhr.responseText.replace(/,(?=,|\])/g,',""').replace(/\[,/g,'["",'))
							,r='';
							if(!data.errorCode&&data.translateResult&&data.translateResult.length){
								for(var i=0;i<data.translateResult.length;i++){
									if(data.translateResult[i][0].src !== '*'){
										r += data.translateResult[i][0].tgt || '';
									}else{
										r += '\n*\n';
									}
								}
								if(k.success)k.success(r.split('\n*\n'),e)
							}else{
								if(k.error){e.err = -2;k.error([e])}
							}
					}catch(err){
						if(k.error){e.err = -1;k.error([e])}
					}
				}else if(xhr.readyState == 4){
					if(k.error){e.err = xhr.status;k.error([e])}
				}
			}
			xhr.send(d);
	}
}




