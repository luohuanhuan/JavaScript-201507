var http=require("http");
var url=require("url");
var fs=require("fs");

http.createServer(function(request,response){
	var objUrl=url.parse(request.url,true);
	var query=objUrl.query;
	var pathname=objUrl.pathname;
	if(pathname=="/"||pathname=="/index2.html"){
		var strFile=fs.readFileSync("index2.html").toString();
		response.end(strFile);	
		//在保存数据之前，先要做一个判断：有没有数据提交过来呢？
		//如果知道浏览器端有没有数据提交过来？如果是直接访问域名过来的，没有相应的查询字符串的情况，就是没有数据提交过来。
		//如果有相应查询字符串，则说明有数据提交过来。
		console.log(query);
		if(query.btn){
			try{
				var strFile=fs.readFileSync("data2.txt").toString();
				var a=JSON.parse(strFile);//是把data2.txt里的JSON字符串转化为JS对象，
				a.push(query);//这是对象是数组，才可以往这个数组不断的保存对象
				fs.writeFile("data2.txt",JSON.stringify(a));//每一次操作都会覆盖重写
				
				
			}catch(e){
				var a=[];
				a.push(query);
				fs.writeFile("data2.txt",JSON.stringify(a));//把对象a转化为JSON格式的字符串写成data2.txt文件里
			}
			
		}
		
		
	}
	
	
}).listen(8081,function(){
	console.log("启动成功");	
})