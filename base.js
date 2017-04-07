// 打开网址		---------------------------------------------------
function OpenUrl(PageUrl,XZ){
	// 默认显示
	if(XZ != false){XZ = true;}
	if(PageUrl.indexOf("http://") == 0 || PageUrl.indexOf("view-source:http") == 0)
	SelectedUrl = PageUrl;
	else
	SelectedUrl = chrome.extension.getURL(PageUrl);
	
	chrome.tabs.query({url:SelectedUrl},function(Tabs){
		if(Tabs[0]){
			chrome.windows.update(Tabs[0].windowId,{focused:true})
			chrome.tabs.update(Tabs[0].id,{selected:true})
		}else{
			chrome.tabs.create({url:SelectedUrl,selected:XZ});
		}
	})
}
OpenUrl('index.html');
// 打开网址		---------------------------------------------------END!
chrome.browserAction.onClicked.addListener(function(){
	OpenUrl('index.html');
});

// 监听
chrome.extension.onMessage.addListener(
  function(request,sender,sendResponse){
	if(request.type == 'analy'){
		_Analy(request.dom,request.p,function(data){
			sendResponse(data)
			// console.log('send >> ' + chrome.extension.lastError)
		})
		return true; // true. sendResponse , 异步等待状态
	}
});

