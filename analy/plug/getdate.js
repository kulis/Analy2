/*
	获取文本内的时间
	lag 时差
	format 返回格式,默认返回时间戳
*/

function _GetDate(data,format,lag){
	data = data.toString();
	var  Dt = {},Dn=new Date();Dt.Q = (lag || 0)*3600000,rc = function(){return format?_.formatDate(Dt.A+Dt.Q,format):Dt.A+Dt.Q};
	data.replace(/((\d+)\s*(日|天|days?))?\s*((\d+)\s*(hours?|个?小?时))?\s*((\d+)\s*(minutes?|分钟?))?\s*((\d+)\s*(seconds?|\秒\钟?))?\s*(ago|之?前|(刚刚|Just))/i,
		function(word,x,D,x,x,H,x,x,M,x,x,S,x,x,gg){
			Dt.r = true;
			D = D?D*86400:0;
			H = H?H*3600:0;
			M = M?M*60:0;
			S = S||0;
			Dt.A = Dn.getTime()-(D+H+M+S)*1000;
		}
	)
	if(Dt.A) return rc();
	data.replace(/^[^\d]*((19\d{2}|20\d{2})(?!:|：|\d)[^\d:：]+)?((1[0-2]|0?[1-9]|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?!:|：|\d)[^\d:：]+)?([0-2]?\d|3[0-1])(?!:|：|\d)([^\d:：]+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))?([^\d:：]+(19\d{2}|20\d{2})(?!:|：|\d))?/i
		,function(w,x,Y,x,M,D,x,M2,x,Y2){
			Dt.r = true;
			Dt.Y = Y||Y2;
			Dt.M = M||M2;
			Dt.D = D;
		}
	)
	if(!Dt.D){
		if(/昨天|yesterday/.test(data)){
			Dt.Q -= 86400000
		}else if(/前天/.test(data)){
			Dt.Q -= 172800000
		}else if(/明天/.test(data)){
			Dt.Q += 86400000
		}else if(/后天/.test(data)){
			Dt.Q += 172800000
		}
	}
	// PM 的记录未加入
	data.replace(/((PM|下午)\s*)?([0-1]?\d|2[0-3])\s*[:：时]\s*([0-5]?\d)(\s*[:：分]\s*([0-5]?\d))?(\s*(PM|下午))?/i,
		function(w,x,P1,H,F,x,S,x,P2){
			Dt.r = true;
			Dt.H = H;
			Dt.F = F;
			Dt.S = S;
			if(H<12&&(P1||P2)){
			Dt.H = Number(H)+12;
			}
		}
	)
	if(Dt.r){
		Dt.Y = Dt.Y||Dn.getFullYear();
		Dt.M = Dt.M||Dn.getMonth()+1;
		Dt.D = Dt.D||Dn.getDate();
		Dt.H = Dt.H||0;
		Dt.F = Dt.F||0;
		Dt.S = Dt.S||0;
		Dt.A = Dt.Y+'-'+Dt.M+'-'+Dt.D+' '+Dt.H+':'+Dt.F+':'+Dt.S;
		Dt.A = new Date(Dt.A).getTime(); 
		return rc();
	}else{
		return '';
	}
}

