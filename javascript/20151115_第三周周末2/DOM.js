//珠峰培训 2015年11月15日
var DOM={};//实现：根据某个特定的对象实例来管理一组方法，起一个分类的作用，避免把以下这些方法再暴露成全局方法。单例模式：把一些方法组只在一个实例（对象）上进行管理。不要过度解读,不要过度理解
DOM.getIndex=function (ele){//就是用来得到ele的索引值
	var index=0;
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			index++;
		}
		p=p.previousSibling;
	}
	return index;
	
}
DOM.listToArray=function(list){
	try{
		return [].slice.call(list,0)
	}catch(e){
		var a=[];
		for(var i=0;i<list.length;i++){
			a.push(list[i]);
		}
		return a;
	}
}

DOM.offset=function(ele){
	var l=ele.offsetLeft,t=ele.offsetTop,p=ele.offsetParent;
	while(p){
		if(window.navigator.userAgent.indexOf("MSIE 8")>-1){
			l+=p.offsetLeft;
			t+=p.offsetTop;	
		}else{
			l+=p.offsetLeft+p.clientLeft;
			t+=p.offsetTop+p.clientTop;	
		}
		p=p.offsetParent;
		
	}	
	return {l:l,t:t}
}

//把一个元素添加为这个元素第一个子节点
DOM.prepend=function(ele,child){//把child添加成ele的第一个元素
	ele.insertBefore(child,ele.firstChild);
}
DOM.insertAfter=function(nodeBefore,nodeNext){
	//把nodeNext添加到nodeBefore的后边,实现的逻辑是添加到nodeBefore的弟弟的前边
	nodeBefore.parentNode.insertBefore(nodeNext,nodeBefore.nextSibling);
	//如果insertBefore没有第二个参数没有或是null，则它相当于appendChild
}

DOM.siblings=function(ele){
	var a=[];//先定义数组，用来保存哥哥们或弟弟们
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			a.unshift(p);//按顺序保存在数组里	
		}
		p=p.previousSibling;
	}
	
	var next=ele.nextSibling;
	while(next){
		if(next.nodeType===1){
			a.push(next);	
		}
		next=next.nextSibling;
	}
	
	return a;
}







