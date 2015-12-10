var http=require("http");//核心的内置模块
var url=require("url");
var fs=require("fs");


http.createServer(function(request,response){	
	var objUrl=url.parse(request.url,true);//把url字符串转化为一个对象
	console.log(objUrl);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});//写文件头
	
	var regData=/<div *id="content">[\w\W]*?<\/div>/;//表示匹配最近的那一个div的结束符号。关于要理解好*?表示非贪婪匹配
	
	if(objUrl.pathname=="/"){
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
			}
			//strFile=fs.readFileSync("index3.html");
			//response.end(strFile);
		}
		{//以下是把网页填充上数据，写回到浏览器端
			var strFile=fs.readFileSync("index3.html").toString();
			try{
				if(objFile){//objFile是18行得到，并且后来更新过的
					strFile=strFile.replace(regData,"<div id=\"content\">"+formatData(objFile)+"</div>");
				}else{//这个表示直接打开的首页，而不是数据提交来的
					var strData=fs.readFileSync("data.txt").toString();
			strFile=strFile.replace(regData,"<div id=\"content\">"+formatData(JSON.parse(strData))+"</div>");
				}
			}finally{
				response.end(strFile);	//然后写回去
			}
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
function formatData(data){
	var str="<table>"
	for(var i=0;i<data.length;i++){
		str+="<tr>"
			for(var attr in data[i]){
				str+="<td>"+data[i][attr]+"</td>";
			}
		str+="</tr>";
	}
	str+="</table>";
	return str;
}