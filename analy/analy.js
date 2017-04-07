

//*****************************************************************
//	
//	-_Analy 分析器-
//		dom:节点
//		p:节点分析配置
//		返回
//		getData 返回函数
//		return:{total:}
//*****************************************************************
function _Analy(dom,p,getData){

	var t0 = new Date().getTime();
	
	//*****************************************************************
	//	正则
	//*****************************************************************
	function _re(data,re){
		if(!data) return data;
		data = data.toString().replace(/^\s+|\s+$/g,'');
		if(re)data = data.replace((new RegExp(re[0],(re[2]||''))),(re[1]||'')).replace(/^\s+|\s+$/g,'');
		return data;
	}
	
	//*****************************************************************
	//	自定义函数(默认传值)
	//*****************************************************************
	var _fun = {
		1:function(data,f){		// url
			data = data.toString();
			// p.domain = www.abc.com/ 包含斜杆
			var baseUrl = p.domain || p.url;
			// 补全
			if(data[0] == "/"){
				if(data[1] == "/"&&/^\/\/[\w\-_]+(\.[\w\-_]+)+\//.test(data)){
					data = baseUrl.replace(/^([^:]+).*$/,'$1:')+data;
				}else{
					data = baseUrl.replace(/^(https?:\/\/[^\/]+).*$/,'$1')+data;
				}
			}else if(data.substring(0,4) != "http"){
				data = baseUrl.replace(/[^\/]+$/,'')+data;
			}
			return data
		},
		2:function(data,f){		// 数值
			return Number(data.toString()||NaN);
		},
		3:function(data,f){		// 布尔
			return data?1:0;
		},
		4:function(data,f){		// 长度
			return _.length(data,f.t)
		},
		5:function(data,f){		// 截取
			return _.cut(data,f.l,f.m)
		},
		6:function(data,f){		// Url 属性组值
			return _.turnVal(_.urlPro(data),f.s)
		},
		7:function(data,f){		// 正则组值
			data = data.toString();
			var d = [];
				data.toString().replace((new RegExp(f.r)),function(w,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){
					d = [w,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10];
				})
			return _.turnVal(d,f.s)
		},
		8:function(data,f){		// 时间
			return _GetDate(data,f.c,f.q)
		},
		9:function(data,f){		// JSON.parse
			return JSON.parse(data)
			try{
				return a[n] = JSON.parse(val);
			}catch(err){
				return '';
			}
		},
		10:function(data,f){	// JSON.stringify
				return JSON.stringify(data)
		}
	};
	
	//*****************************************************************
	//	获取项数据DOM
	//	无法获取返回空字符串
	//*****************************************************************
	function _valDom($d,pdx){
		
		var data;
		
		// 获取数据
		if(!pdx.get){
			data = $d.innerText;
		}else if(pdx.get == 1){
			for(var i in pdx.attr){// 循环attr,获取匹配的第一个值
				data = $d.getAttribute(pdx.attr[i]);
				if(data){break}
			}
			data = data||'';
		}else if(pdx.get == 2){// html
			data = $d.innerHTML;
		}else if(pdx.get == 3){// css
			data = $d.style[pdx.attr]||'';
			// 背景图
			if(data&&pdx.attr == 'backgroundImage'){
				var cssBi_r = /^url\([\"|\']?(.+)[\"|\']?\)$/;
					data = (cssBi_r.test(data))?data.replace(cssBi_r,'$1'):'';
			}
		}
		
		return data;
	}
	// 值运算(字符串)
	function _valPro(data,pdx){
		// 处理数据 - 值替换
		data = _re(data,pdx.re);
		// 处理数据 - 值转换
		if(pdx.type)data = _fun[pdx.type](data,pdx.f||{});
		return data;
	}
	
	
	//*****************************************************************
	//	获取项数据json
	//	d:当前条内容对象
	//	pdx:项配置
	//*****************************************************************
	function _valJson(d,pdx){
		var data;
		
		// 获取数据
		var data = _.object(d,pdx.dom||[pdx.id]);
		
		if(data!==undefined){
			// 处理数据 - 替换
			if(pdx.re)data = _re(data,pdx.re);
			
			// 处理数据 - 值转换
			if(pdx.type)data = _fun[pdx.type](data,pdx.f||{});
		}else{
			data = '';
		}
		
		return data;
		
	}
	
	//*****************************************************************
	//	附加数据//自建数据
	//	pdx:参数
	//	i:索引位置
	//*****************************************************************
	function _add(pdx,i){
		if(pdx.add == 100){	// 序号
			var pdxab=0,pdxat=1;
			if(pdx.a){
				pdxab = pdx.a.b || pdxab;
				pdxat = pdx.a.t || pdxat;
			}
			return pdxab + i*pdxat;
			
		}else if(pdx.add == 101){	// 获取时间戳
			var r = _.now();
			if(pdx.type==8&&pdx.f&&pdx.f.c){
				if(pdx.f.q){r += pdx.f.q*3600000}
				r = _.formatDate(r,pdx.f.c)
			}
			return r;
		}else{					// 字符串等
			return pdx.a.v;
		}
	}	
	//*****************************************************************
	//	预设返回数据
	//*****************************************************************
	var r = {
		total:0				// 获取了几个对象
		,status:200			// 返回状态 404:分析对象不存在
		,logs:{				// 分析日志
			type:p.t		// 分析的类型
			,total:0		// 成功记录的条数
			,out:0			// 不合规删除的条数
			,time:0			// 分析耗时
		}
		,items:[]
	};
	
	if(!dom){r.logs.status = 404;ok(r);return}
	
	//*****************************************************************
	//	开始分析,!t:html dom...
	//*****************************************************************
	if(p.re){dom=_re(dom,p.re)};
	if(!p.t){
		var $a = document.createElement('div');
			$a.innerHTML = dom.replace(/\ssrc=/ig,' _src=');
		var $i = (p.items)?$a.querySelectorAll(p.items):[$a];
			// 过滤$i

			// 返回多少条
			r.total=$i.length;
			r.logs.total=$i.length;
			// 循环每条
			for(var i=0;i<r.total;i++){
				var $t = $i[i],t={};
				// 循环项数据
				var $d=[],td=[],opdx={},itemsOut=false;
				for(var x in p.d){
					var pdx = p.d[x],isArr=false,isDel=false;

					if(pdx.add){
					// 系统或自建值
						$d=[];
						td = [_add(pdx,i)];
					}else if(pdx.d==3){
					// 引值
						$d=[];
						if(_.typeOf(td) == '[object Array]'){
							td=td.concat();
							isArr=!pdx.arr;		// 值结构为默认时，判断是否为数组返回
						}else{
							td=[td];
						}
					}else{
					// DOM,含引用对象
						if(!pdx.d){							// DOM:第一项
							$d = $t.querySelector(pdx.dom);
							$d = $d===null?[]:[$d]
						}else if(pdx.d==1){					// DOM:全部项目
							$d = $t.querySelectorAll(pdx.dom)
						}else if(pdx.d==-1){				// DOM:自身
							$d = [$t]
						}else if(pdx.d==2){					// DOM:引用
							$d = $d;
						}
						
						//
						var dl = $d.length;
						if(dl>0){
							// 过滤子集
							if(pdx.filte){for(var y=0;y<dl;y++){$d[y] = _.Dr($d[y],pdx.filte)}};
							if(pdx.get == 4){
								td = [dl.toString()];							// dom数量
							}else{
								td = [];for(var y=0;y<dl;y++){td.push(_valDom($d[y],pdx))};
								isArr = !pdx.arr&&(pdx.d==1||opdx.d==1);		// 值结构为默认时，判断是否为数组返回
							}
						}else if(dl==0){
							td = [];
							// 未获取到对象,记录到logs
						}
						
					}
					
					// 数组里再拆分
					if(td.length>0&&pdx.fg&&pdx.arr==2){
						td = td.join(pdx.fg).split(pdx.fg)
					}
					
					
					// 值二次运算
					if(pdx.arr==2||isArr){
						for(var y = 0;y<td.length;y++){td[y] =  _valPro(td[y],pdx)}

						// 数组项设置，空值项>重复删除>排序
						if(pdx.arr_item_del)td = _.arrDelEmpty(td);
						if(pdx.arr_item_re)td = _.arrDelRe(td);
						if(pdx.arr_item_sort)td = _.arrSort(td,pdx.arr_item_sort);
						
						// 判断空值或不存储
						if(pdx.del_empty_arr&&td.length == 0)isDel = true;
					}else{
						td = _valPro(td.join(pdx.fg||''),pdx);
						
						// 判断空值或不存储
						if(pdx.del_empty&&_.isEmpty(td))isDel = true;
					}
					
					console.log(td)

					// 存储
					if(!isDel&&!pdx.del)t[pdx.id] = td;
					
					// Out(过滤)
					if(pdx.out){
						// ... 引入函数？
						itemsOut = _itemsOut(td);
					}
					
					// 记录上一级的配置
					opdx = p.d[x];
					
				}
				
				// 判断是否存储整条数据
				if(!itemsOut){
					r.items.push(t)
				}else{
					// 不存储当前这条数据
					r.logs.out ++;
				}
			}
	}else if(p.t==1){	// json 获取数据
		try{
			dom = JSON.parse(dom.replace(/^[^\{\[]+/,'').replace(/\)\;?\s*$/,''));
		}catch(err){
			r.logs.status = 404;
			ok(r);return
		}

		// 获取对象
		var jsonData = _.object(dom,p.items)

		if(!jsonData){getData(r)}
		// 单对象转换为数组
		if(_.typeOf(jsonData) !== '[object Array]')jsonData=[jsonData];
		
		// 返回多少条
		r.total=jsonData.length;
		
		// 获取项值
		for(var i in jsonData){
			var d = jsonData[i],
				t = {};
				
				for(var x in p.d){
					var pdx = p.d[x];
					
					// 系统或自建值
					if(pdx.add&&!pdx.del){
						t[pdx.id] = _add(pdx,i);
						continue;
					}
					
					var	td = _valJson(d,pdx);
					if(!pdx.del)t[pdx.id] = td;
				}
				
			r.items.push(t)
		}
	}
	// 结束返回函数
	function ok(r){
		r.logs.time = (new Date().getTime())-t0;
		getData(r);
	}
	//*****************************************************************
	//	翻译
	//*****************************************************************
	if(p.fy){
		_Aanly_FY(r,p.fy,function(r){
			ok(r);
		})
	}else{
		ok(r);
	}
	
}

//*****************************************************************
//	翻译插件 + fanyi.js
//*****************************************************************
function _Aanly_FY(r,p,g){
	// 翻译准备
	var fy=[],l=-1,t0=new Date().getTime(),t1;
		r.logs.fanyi={};
	for(var id in p){
		l += 1;
		fy[l]=[]; 
		fy[l][0]=[]; 
		fy[l][1]=p[id][0]||'zh-CN';
		fy[l][2]=p[id][1]||'auto';
		fy[l][3]=p[id][2]||'auto';
		fy[l][4]=id;
		fy[l][5]=[];	// 存储位置
		
		// 获取需要翻译的对象(字符串,数组内的字符串)
		for(var i in r.items){
			var v = r.items[i][id];
			if(v&&_.typeOf(v)=="[object String]"){
				fy[l][0].push(v);r.items[i][id] = '';fy[l][5].push(i);
			}else if(v&&_.typeOf(v)=="[object Array]"){
				var fydarr = [];
				for(var x in v){
					if(_.typeOf(v[x])=="[object String]"){
						fy[l][0].push(v[x]);r.items[i][id][x] = '';fydarr.push(x);
					}
				}
				if(fydarr.length)fy[l][5].push([i,fydarr]);
			}
		}
		
	}
	// 翻译循环执行函数
	function fygo(w){
			if(w <= l){	// 结束
				t1 = new Date().getTime();
				if(fy[w][0].length){
					_Fanyi[fy[w][3]](fy[w][0],{
						sl:fy[w][2],
						tl:fy[w][1],
						success:function(d,e){
							// 赋值到对应的
							var n = 0,fyd=fy[w][5],id=fy[w][4];
							for(var i in fyd){
								if(_.typeOf(fyd[i])=="[object String]"){
									r.items[fyd[i]][id] = d[n];n++;
								}else{
									var v=r.items[fyd[i][0]][id];
									for(var x in fyd[i][1]){
										r.items[fyd[i][0]][id][fyd[i][1][x]]=d[n];n++;
									}
								}
							}
							r.logs.fanyi[id] = {};
							r.logs.fanyi[id].time = (new Date().getTime())-t1;
							r.logs.fanyi[id].len = fyd.length;
							r.logs.fanyi[id].from = e.from;
							fygo(w+1);
						},
						error:function(e){
							var id=fy[w][4];
							r.logs.fanyi[id] = {};
							r.logs.fanyi[id].time = (new Date().getTime())-t1;
							r.logs.fanyi[id].len = fy[w][5].length;
							r.logs.fanyi[id].error = e;
							fygo(w+1);
						}
					})
				}else{
					fygo(w+1);
				}
			}else{
				r.logs.fanyi.time=(new Date().getTime())-t0;
				g(r);
			}
	}
	// 启动
	fygo(0)
}



