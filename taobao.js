// http://s.taobao.com/search?q=%D2%C2%B7%FE&s=80
var i = 0,t0,t1;
function taobao(i){
	i = i || 0;
	if(i == 0){
		t0=t1=_.now();
	}else{
		t1=_.now();
	}
	if(i <= 3960){
		var xhr = new XMLHttpRequest()
			xhr.open("GET","http://s.taobao.com/search?q=%C6%BB%B9%FB%BF%E3%D7%D3+%C4%D0&s="+i,true);
			xhr.setRequestHeader("If-Modified-Since","0");
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4&&xhr.status == 200){
					_Analy(
						xhr.responseText,
						{"t":0,"url":"http://s.taobao.com/search?q=%D2%C2%B7%FE&s=80","re":["<\\/?textarea[^>]*>","","g"],"items":".row.grid-view>div","d":[{"id":"id","dom":"h3>a","get":1,"attr":["href"],"type":6,"f":{"s":"1#(&id&)"}},{"id":"title","d":2},{"id":"price","dom":".price","type":2,"re":["\\￥"]},{"id":"sell","dom":".seller a","get":1,"attr":["href"],"type":6,"f":{"s":"(&user_number_id&)"}}]}
						,function(r){
						//console.log(_.now() - t1);
						//console.log(r);
					})
					
					i += 40;
					taobao(i)
				}
			}
			xhr.send();
	}else{
		alert(_.now() - t0);
	}
}

