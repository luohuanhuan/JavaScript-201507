function children(ele,tagName){//ele的元素子节点，并且是指定标签名的
	var childNodes=ele.childNodes;
	tagName=tagName.toUpperCase();
	var a=[];//用来存满足条件的元素，就是那些元素子节点
	
	for(var i=0;i<childNodes.length;i++){
		var ele=childNodes[i];
		if(ele.nodeName==tagName){
			a.push(ele);
		}		
	}
	return a;	
}
function getIndex(ele){//其实就是找哥哥的个数
	var i=0;
	var p=ele.previousSibling;
	while(p){//判断有没有哥哥
		if(p.nodeType==1){//如果哥哥是元素节点，则i累加
			i++;	
		}
		p=p.previousSibling;
	}
	return i;
}

function addClass(ele,className){
	var reg=new RegExp("(?:^| +)"+className+"(?: +|$)","g");
	if(!reg.test(ele.className))
		ele.className+=" "+className;
	
}

function removeClass(ele,className){
	var reg=new RegExp("(?:^| +)"+className+"(?: +|$)","g");
	ele.className=ele.className.replace(reg," ");
	
}


function byClass(className,eles){
	var reg=new RegExp("(?:^| +)"+className+"(?: +|$)");	
	var a=[];
	for(var i=0;i<eles.length;i++){
		var ele=eles[i];
		if(reg.test(ele.className)){
			a.push(eles[i]);
		}	
	}
	return a;	
}

function getElesByClass(className,context){
	
	context=context||document;
	if(context.getElementsByClassName){
		return context.getElementsByClassName(className);
	}
	var eles=context.getElementsByTagName("*");
	var str="   tab high selectedTab   ";
	className=className.replace(/^\s+|\s+$/g,"");
	var aClass=className.split(/ +/);
	
	for(var i=0;i<aClass.length;i++){
		eles=byClass(aClass[i],eles);		
	}	
	return eles;	
}

function prevSiblings(ele){
	var prev=ele.previousSibling;
	var a=[];
	while(prev){
		if(prev.nodeType==1){
			a.unshift(prev);
		}
		prev=prev.previousSibling;
	}
	return a;
	
}

function nextSiblings(ele){
	var n=ele.nextSibling;
	var a=[];
	while(n){
		if(n.nodeType===1){
			a.push(n);
		}
		n=n.nextSibling;
	}
	return a;
}

function siblings(ele){
	return prevSiblings(ele).concat(nextSiblings(ele));
}