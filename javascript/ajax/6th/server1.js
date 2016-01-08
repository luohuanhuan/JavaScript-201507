var http=require("http");//核心的内置模块
var url=require("url");
var fs=require("fs");

/*<script src="http"></script>*/

http.createServer(function(request,response){
	//如果你想得到从浏览器端带来的信息，则在request里分析
	//如果你想把信息发给浏览器端，则在response里去处理
	//console.log(request);
	//console.log(request.url);
	
	var objUrl=url.parse(request.url,false);//把url字符串转化为一个对象
	//第二个参数是指把objUrl中的query属性也转化为对象。就是个深度转化。
	//console.log(objUrl);
	response.writeHead(200,{"content-type":"text/css;charset=utf-8"});//写文件头
	//MIME类型，就是告诉浏览器以什么格式打开
	response.write("");
	response.end("<h1>welcome to everest training!</h1><p>你当前访问的路径是："+objUrl.path+"</p><p>你来的时候，带来了以下数据："+JSON.stringify(objUrl.query)+"</p>");
}).listen("8080",function(){console.log("service start")});