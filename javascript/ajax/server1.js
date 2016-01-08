var http=require("http");
var url=require("url");

http.createServer(function(request,response){//如果有浏览访问，则执行这个回调方法
	
	var objUrl=url.parse(request.url);
	console.log(request.url);
	console.log("-----------------------------------");
	console.log(objUrl.query);
	// /后边是路径和文件名，问号后边的是查询字符串
	response.write("pathname:");
	response.end(objUrl.pathname);
	
	
}).listen("8081",function(){//如果成功的开启了服务并且监听了8081端口，则执行这个回调方法
	console.log("开张了！");
});