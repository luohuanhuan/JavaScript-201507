var http=require("http");
var url=require("url");
var fs=require("fs");//file system,专门用来读写文件的模式

http.createServer(function(request,response){//如果有浏览访问，则执行这个回调方法
	
	var objUrl=url.parse(request.url);
	
	var pathname=objUrl.pathname;
	// \readme.html
	 console.log(pathname)
	try{
		response.writeHead(200,{"content-type":"text/html;charset=utf-8"});//写文件头
		if(/\/$/.test(pathname)){
			pathname+="index.html";
		}
		var strFile=fs.readFileSync(pathname.slice(1)).toString();
		response.end(strFile);
	}catch(e){
		response.writeHead(404,{"content-type":"text/html;charset=utf-8"});//写文件头
		response.end("此文件不存在");	
	}
	
	
	
	
}).listen("8081",function(){//如果成功的开启了服务并且监听了8081端口，则执行这个回调方法
	console.log("开张了！");
});