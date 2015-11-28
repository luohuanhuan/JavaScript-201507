var _utils = function(){
	listToAry : function(list){
		try{
			return Array.prototype.slice.call(list,0);
		}catch{
			var ary = [];
			for(var i=0; i<list.length; i++){
				ary[ary.length] = list[i];
			}
			return ary;
		}
	},
	toJSON : function(jsonStr){
		return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr +")");
	},

};

/*
*操作DOM元素的方法
*/
// _utils.getElementsByClass = function(strClass,context){
// 	context = context || document;
// 	if("getElementsByClassName" in document){
// 		return this.listToAry(context.getElementsByClassName(strClass));
// 	}

// 	var strAry = strClass.replace(/(^ +)|( +$)/g,"").split(/\s+/),
// 		tarList = context.getElementsByTagName("*"),
// 		ary 	= [];

// 	for(var i=0; i<tarList.length; i++){
// 		var curTag = tagList[i];
// 		curTag.flag = true;
// 		for(var k=0; k<strAry.length; k++){
// 			var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
// 			if(!reg.test(curTag.className)){
// 				curTag.flag = false;
// 				break;
// 			}
// 		}
// 		curTag.flag ? ary[ary.length] = curTag : null;
// 	}
// 	return ary;
// };

_utils.getElementsByClass = function(strClass,context){
	context = context || document;
	if("getElementsByClassName" in document){
		return this.listToAry(context.getElementsByClassName(strClass));
	}

	var strAry = strClass.replace(/(^ +)|( +$)/g,"").split(/\s+/),
		ary 	= [],
		strList = context.getElementsByTagName("*");

	for(var i=0; i<strList.length; i++){
		var curTag = tagList[i];
		curTag.flag = true;
		for(var k=0; k<strAry.length; k++){
			var reg = new RegExp("(^| +)" + strAry[i] + "( +|$)");
			if(!reg.test(curTag.className)){
				curTag.flag = false;
				break;
			}
		}
		curTag.flag ? ary[ary.length] = curTag : null;
		curTag.flag  = null;
	}
	return ary;
};

// _utils.children = function children(curEle,tagName){
// 	var nodeList = curEle.childNodes,ary = [];
// 	for(var i=0; i<nodeList.length; i++){
// 		var curNode = nodeList[i];
// 		if(curNode.nodeType === 1){
// 			if(typeof tagName === 'string'){
// 				var curNodeLow = curNode.nodeName.toLowerCase();
// 				var tagNameLow = tagName.toLowerCase();
// 				if(curNodeLow === tagNameLow){
// 					ary[ary.length] = curNode;
// 				}
// 				continue;
// 			}
// 			ary[ary.length] = curNode;
// 		}
// 	}
// 	return ary;
// }

_utils.children = function(curEle,tagName){
	var nodeList = curEle.childNodes,ary=[];
	for(var i=0; i<nodeList.length; i++){
		var curNode = nodeList[i];
		if(curNode.nodeType === 1){
			if(typeof tagName === 'string'){
				var curNodeLow = curNode.nodeName.toLowerCase();
				var tagNameLow = tagName.toLowerCase();
				if(curNodeLow === tagNameLow){
					ary[ary.length] = curNode;
				}
				continue;
			}
			ary[ary.length] = curNode;
		}
	}
	return ary;
}


_utils.prev = function(curEle){
	if("previousElementSibling" in curEle){
		return curEle.previousElementSibling;
	}
	var pre = curEle.previousSibling;
	while(pre&&pre.nodeType !== 1){
		pre = pre.previousSibling;
	}
	return pre;
}

_utils.prevAll = function(curEle){
	var pre = this.prev(curEle),ary=[];
	while(pre){
		ary.unshift(pre);
		pre = this.prev(pre);
	}
	return ary;
}

_utils.getIndex = function(curEle){
	return this.prevAll(curEle).length;
};

_utils.next = function(curEle){
	if("nextElementSibling" in curEle){
		return curEle.nextElementSibling;
	}
	var nex = curEle.nextSibling;
	while(nex && nex.nodeType !== 1){
		nex = nex.nextSibling;
	}
	return ary;
}

_utils.nextAll = function(curEle){
	var nex = this.next(curEle),ary=[];
	while(nex){
		ary[ary.length] = nex;
		nex = this.next(nex);
	}
	return ary;
}

_utils.sibling = function(curEle){
	var pre = this.prev(curEle),nex = this.next(curEle),ary=[];
	pre ? ary[ary.length] = pre : null;
	nex ? ary[ary.length] = nex : null;
	return ary;
}

_utils.siblings = function(curEle){
	var pres = this.prevAll(curEle),
		nexs = this.nextAll(curEle),
		ary  = [];
	return pres.concat(nexs);
}

_utils.first = function(curEle,tagName){
	return this.children(curEle,tagName)[0];
}
_utils.last = function(curEle,tagName){
	var child = this.children(curEle,tagName);
	return child[child.length - 1];
};

_utils.css = function(curEle,attr,value){
	var reg = /^[+-]?(?:\d|([1-9]\d+))(\.\d+)?(px|pt|en|rem)$/;
	if(typeof value === 'undefined'){
		var val = "getComputedStyle" in window ? window.getComputedStyle(curEle,null)[attr]:curEle.currentStyle(attr);
		return reg.test(val) ? parseFloat(val) : val;
	}

	reg = /^(width|height|top|bottom)|((margin|padding)(Left|Top|Right|Bottom)?)$/;
	if(attr === 'opacity'){
		if(value >= 0 && value <= 1){
			curEle["style"]["opacity"] = value;
			curEle["style"]["filter"] = "alpha(opacity=" +value*100 + ")";
		}
	}else if(attr === "float"){
		curEle["style"]["cssFloat"] = value;
		curEle["style"]["styleFloat"] = value;
	}else if(reg.test(attr)){
		curEle["style"][attr] = isNaN(value) ? value : value + 'px';
	}else {
		curEle["style"][attr] = value;
	}
};


_utils.setGroupCss = function(curEle,options){
	for(var key in options){
		if(options.hasOwnProperty(key)){
			this.css(curEle,key,options[key]);
		}
	}
}

_utils.hasClass = function(curEle,strClass){
	var reg = new RegExp("(^| +)" + strClass + "( +|$)");
	return reg.test(curEle.className);
}

_utils.addClass = function(curEle,strClass){
	if(!this.hasClass(curEle,strClass)){
		curEle.className += " " + strClass;
	}
}

_utils.removeClass = function removeClass(curEle,strClass){
	var reg = new RegExp("(^| +)" + strClass + "( +|$)","g");
	if(this.hasClass(curEle,strClass)){
		curEle.className = curEle.className.replace(reg, " ");
	}
}
_utils.attr = function(curEle,attr,value){
	if(typeof value === 'undefined'){
		return attr === 'class' ? curEle.className : curEle.getAttribute(attr);
	}
}