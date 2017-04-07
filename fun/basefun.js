var _={
	//*****************************************************************
	//	基础类
	//*****************************************************************
	typeOf:function(d){// 数据类型
		return Object.prototype.toString.call(d);
	},
	isEmpty:function(d){// 对象为空
		return d == ''||d==NaN||d==null||d==undefined;
	},
	a:function(d){
		var xhr = new XMLHttpRequest();
			xhr.open((d.type||'GET'),d.url,(d.sync===true?true:false));
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4&&xhr.status == 200){
					if(d.success)d.success(xhr.responseText);
				}else if(xhr.readyState == 4){
					if(d.error)d.error(xhr.status);
				}
			}
			xhr.send(d.data||null);
	},
	//*****************************************************************
	//	数组类
	//*****************************************************************
	arrDelEmpty:function(d){// 删除数组空项
		for(var i = 0 ;i<d.length;i++){
			 if(this.isEmpty(d[i])){
					  d.splice(i,1);
					  i= i-1;
			 }
		}
		return d;
	},
	arrDelRe:function(d){// 删除数组重复项
		var r = [], h = {};
		for(var i = 0;i < d.length; i++) {
			var e=d[i],n=JSON.stringify(e);
			if(!h[n]){r.push(e);h[n] = 1}
		}
		return r;
	},
	arrSort:function(d,t){// 数组排序
		var sortFun;
		if(t==1||!t){
			sortFun =function(a,b){return a>b?1:-1}	// 顺序排序
		}else if(t==2){
			sortFun =function(a,b){return b>a?1:-1}	// 倒序排序
		}else if(t==3){
			d.reverse();	// 倒转数组
			return d
		}
		d.sort(sortFun);
		return d
	},
	//*****************************************************************
	//	时间
	//*****************************************************************
	timeGap:0,
	timeSync:function(h){	// h 默认非异步
		var xhr = new XMLHttpRequest()
			xhr.open("HEAD","http://www.taobao.com/",h);
			xhr.setRequestHeader("If-Modified-Since","0");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4&&xhr.status == 200){
					_.timeGap = (new Date(xhr.getResponseHeader("Date")).getTime()) - (new Date().getTime());
				}
			}
			xhr.send();
	},
	now:function(t,s){	//t 返回时间格式 s 即时获取
		if(s||!this.timeGap)this.timeSync();
		var n = (new Date().getTime())+this.timeGap;
		return t?this.formatDate(n,t):n; 
	},
	formatDate:function(n,t){
		n = n?new Date(n):this.now();
		if(!t)return n.toString();
		var r = '',
			ff = {Y:'FullYear',U:'Month',D:'Date',H:'Hours',M:'Minutes',S:'Seconds',X:'Day',Q:'Day',W:'Day'},
			xq = {
				X:['日','一','二','三','四','五','六'],
				Q:[7,1,2,3,4,5,6],
				W:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
			};
		for(var i=0;i<t.length;i++){
				var ffx = ff[t[i]];
				if(ffx){
					var tx = (n['get'+ffx]()+(t[i]=='U'?1:0)).toString();
						if(ffx=='Day')tx = xq[t[i]][tx];
						r += (ffx!='Day'&&tx.length == 1)?'0'+tx:tx;
				}else{
					r += t[i];
				}
		}
		return r;
	},
	//*****************************************************************
	//	DOM类
	//*****************************************************************
	Dr:function(j,s){// 删除子节点 j:Dom对象 s:表达式
			if(!s) return j;
			var c = j.querySelectorAll(s),l=c.length,i=0;
			for(;i<l;){c[i].parentNode.removeChild(c[i]);i++};
			return j;
	},
	
	//*****************************************************************
	//	对象类
	//*****************************************************************
	object:function(d,k){// 定位对象 d:对象 k:位置数组 错误返回空undefined
		if(!k)return d;
		var x;
		for(var i in k){
			if(d){x = d[k[i]]}else{break}
		}
		console.log(x)
		return x;
	},
	
	//*****************************************************************
	//	字符串类
	//*****************************************************************
	length:function(d,t){// 长度 t:获取类型
		d = d.toString();
		var l = d.length;
		if(!t){
			return l;
		}else{
			var a=b=0;
			for(var i=0;i<l;i++){
				(d.charCodeAt(i)>=0&&d.charCodeAt(i)<=255)?b++:a+=2;
			}
			return (t==1)?a+b:[a/2,b];
		}
	},
	cut:function(d,l,b){// l 长度 b 延长符
		d = d.toString();
		l = l || 40;
		b = b || '';
		for(var i=0;i<d.length;i++){
			var a = (d.charCodeAt(i)>=0&&d.charCodeAt(i)<=255)?1:2;
				l -= a;
			if(l<0) return d.substring(0,i)+((b&&a==2&&l==-1)?' ':'')+b;
		}
		return d;
	},
	urlPro:function(d){// 获取url属性
		d = d.toString();
		var u = d.replace(/#.*/,'').replace(/[^\?]*\?/,'').split("&"),d = {};
			for(var i=0;i<u.length;i++){var x = u[i].split("=");if(x[0]&&x[1])d[x[0]]=x[1]};
		return d;
	},
	turnVal:function(d,f){// 字符串组值,基于对象 d 对象 f 组织方式
		d = d || {};
		if(!f)return '';
		var z,r=true;
			z = f.replace(/[\(\[]([^&]+)?&([^&]+)&([^&]+)?[\)\]]/g,function(w,q,x,l){
				if(w[0]=='('&&!d[x])r=false;
				return d[x]?(q||'')+d[x]+(l||''):'';
			});
		return r?z:'';
	}
}





