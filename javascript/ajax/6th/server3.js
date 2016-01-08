var http=require("http");//核心的内置模块
var url=require("url");
var fs=require("fs");


http.createServer(function(request,response){	
	var objUrl=url.parse(request.url,true);//把url字符串转化为一个对象
	console.log(objUrl);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});//写文件头
	
	
	if(objUrl.pathname=="/"){//这个/就是表示网站的根目录
		
		//objUrl.query
		var query=objUrl.query;//从浏览器端传过来的那些数据
		if(query.btn){//这是用来判断是不是提交了表单
			try{//当这个文件已经存在了
				var strFile=fs.readFileSync("data.txt");
				var objFile=JSON.parse(strFile);//转成对象（数组）
				objFile.push(query);
				strFile=JSON.stringify(objFile);
				fs.writeFile("data.txt",strFile);
			}catch(e){//如果这保存数据的文件不存在，则按以下方式处理
				var a=[];
				a.push(query);
				var strFile=JSON.stringify(a);
				fs.writeFile("data.txt",strFile);
				//[{name:'武照帅',age:24,gender:男}]{name:'武照帅',age:24,gender:男}
			}
			response.end(strFile);
		}else{
			var strFile=fs.readFileSync("index2.html");
			response.end(strFile);	//然后写回去	
		}
	}else{
		var pathname=objUrl.pathname;
		try{
			var endIndex=pathname.indexOf("?");
			if(endIndex<0)endIndex=pathname.length;
			var strFile=fs.readFileSync(pathname.slice(1,endIndex));
			response.end(strFile);
		}catch(e){
			response.end("<h3>404,其它页面还没创建……</h3>");
		}
	}
	

}).listen("8080",function(){console.log("service start")});
