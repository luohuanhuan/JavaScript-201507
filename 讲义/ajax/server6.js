var http=require("http");
var url=require("url");
var fs=require("fs");

http.createServer(function(request,response){
	var objUrl=url.parse(request.url,true);//第二个参数是true，就可以把query这个属性转化为对象了（本来是字符串）
	var query=objUrl.query;
	var pathname=objUrl.pathname;
	if(pathname=="/"||pathname=="/index2.html"){
		if(query.btn==undefined){//如果是直接输入网址访问的，则这样处理
			var strFile=fs.readFileSync("index2.html").toString();
			response.end(strFile);	
		
			console.log(query);
		}else if(query.btn){//如果是点提交按钮访问的，则按这样处理
			try{
				var strFile=fs.readFileSync("data2.txt").toString();
				var a=JSON.parse(strFile);//是把data2.txt里的JSON字符串转化为JS对象，
				a.push(query);//这是对象是数组，才可以往这个数组不断的保存对象
				fs.writeFile("data2.txt",JSON.stringify(a));//每一次操作都会覆盖重写
				
			}catch(e){
				var a=[];
				a.push(query);
				fs.writeFile("data2.txt",JSON.stringify(a));//把对象a转化为JSON格式的字符串写成data2.txt文件里
			}finally{//以上的代码负责数据保存到文件里
			//这里面负责把数据写到html代码里，然后返回到浏览器端
				var strHTML=fs.readFileSync("index2.html").toString();//先把HTML字符串从index2.html文件中读出来
				//然后再用正则把显示内容的div匹配到
				//再用一个数据表格替换div里的内容
				var reg=/<div +id="showContent">[\W\w]*?<\/div>/
				
				//以下是生成表格字符串
				var strTable="<table>";
				for(var i=0;i<a.length;i++){
					strTable+="<tr>";
					
					for(var attr in a[i]){
						strTable+="<td>"+a[i][attr]+"</td>";
					}
					
					strTable+="</tr>";
					
				}
				strTable+="</table>";
				
				
				strHTML=strHTML.replace(reg,strTable);
				response.end(strHTML);
			}
			
		}
		
		
	}else if(pathname=="/ajax"){
		//是不是异步请求，和浏览器端有关系，有服务端没有任何关系
		//(5000)
		response.end(JSON.stringify(query));	
	}
	
	
}).listen(8081,function(){
	console.log("启动成功");	
})