var http=require("http");//核心的内置模块
var url=require("url");
var fs=require("fs");


http.createServer(function(request,response){	
	var objUrl=url.parse(request.url,true);//把url字符串转化为一个对象
	console.log(objUrl);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});//写文件头
	
	//pathname属性是路径名的意思
	if(objUrl.pathname=="/"){//这个/就是表示网站的根目录
		var strFile=fs.readFileSync("index.html");//如果访问的是网站根目录，则把网站的首页读出来
		response.end(strFile);	//然后写回去
	}else{
		var pathname=objUrl.pathname;
		try{
			//http://localhost:8080/a/b/c.html?a=1&b=2&c=3//这是20行判断成立的写法
			//http://localhost:8080/a/b/c.html
			//http://localhost:8080 这是上边判断条件成立的方式
			//http://localhost:8080/?a=1&b=2&c=3 ;问号后边的是给后台传的值
			var endIndex=pathname.indexOf("?");
			if(endIndex<0)endIndex=pathname.length;
			var strFile=fs.readFileSync(pathname.slice(1,endIndex));
			response.end(strFile);
		}catch(e){
			response.end("<h3>404,其它页面还没创建……</h3>");
		}
	}
	

}).listen("8080",function(){console.log("service start")});

/*md file
cd file
cd/

cd file/file2
cd
www.qq.com
www.qq.com/
打开网站有一个默认配置：自动的首页打开，
*/

