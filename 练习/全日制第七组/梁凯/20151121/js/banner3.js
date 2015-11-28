// var bannerImg = document.getElementById("bannerImg");
// var index = 0;
// function move(curEle,attr,value,duration,callBack){
// 	window.clearTimeout(curEle.timer);

// 	var _this = curEle,
// 		curAtr= utils.css(_this,attr),
// 		timer = null,
// 		step  = (value - curAtr) / duration * 13;

// 	~function _move(){
// 		window.clearTimeout(_this.timer);
// 		var curAtr = utils.css(_this,attr);
// 		if(Math.abs(curAtr + step) >= Math.abs(value)){
// 			utils.css(_this,attr,value);
// 			typeof callBack === 'function' ? callBack.call(_this) : null;
// 			return;
// 		}
// 		utils.css(_this,attr,curAtr + step);
// 		timer = window.setTimeout(_move,13);
// 	}();
// }
// function autoMove(){
// 	index++;
// 	move(bannerImg,"left",index*-1000,1000,function(){
// 		if(index >= 4){
// 			index = 0;
// 			utils.css(bannerImg,"left",0);
// 		}
// 		changeLi(index);
// 		bannerImg.timer = window.setInterval(autoMove,3000);
// 	});
// }
// bannerImg.timer = window.setInterval(autoMove,3000);


// var oLis = document.getElementById("bannerTip").getElementsByTagName('li');
// function changeLi(index){
// 	for(var i=0; i<oLis.length; i++){
// 		oLis[i].className = '';
// 		// oLis[i].className = index === i? 'selected' : null;
// 	}
// 	oLis[index].className = 'selected';
// }

// function tipAction(){
// 	for(var i=0; i<oLis.length; i++){
// 		oLis[i].index = i;
// 		oLis[i].onclick = function(){
// 			changeLi(this.index);
// 			// index = this.index;
// 			move(bannerImg,"left",this.index*-1000,1000,function(){
// 				bannerImg.timer = window.setInterval(autoMove,3000);
// 			});
// 		}
// 	}
// }
// tipAction();



var bannerImg = document.getElementById("bannerImg");
var oLis = document.getElementById('bannerTip').getElementsByTagName('li');
var index = 0;
var move = function(curEle,attr,value,duration,callBack){
	var _this = curEle;
	window.clearInterval(_this.timer);
	var attrTar = utils.css(_this,attr);
	var timer = null;
	var step = (value - attrTar) / duration * 13;

	~function _move(){
		window.clearTimeout(timer);
		var attrTar = utils.css(_this,attr);
		if(Math.abs(attrTar + step) >= Math.abs(value)){
			utils.css(_this,attr,value);
			typeof callBack === 'function' ? callBack.call(_this):null;
			return;
		}
		utils.css(_this,attr,attrTar + step);
		timer = setTimeout(_move,13);
	}();
}
var showTip = function(n){
	for(var i=0; i<oLis.length; i++){
		oLis[i].className = i === n ? 'selected' : null;
	}
}
var autoMove = function(){
	index++;
	// var attrtar = index
	move(bannerImg,"left",index*-1000,1000,function(){
		if(index >= 4){
			index = 0;
			utils.css(bannerImg,"left",0);
		}
		showTip(index);
		bannerImg.timer = window.setInterval(autoMove,3000);
	})
}

bannerImg.timer = window.setInterval(autoMove,3000);

var tipAction = function(){
	for(var i=0; i<oLis.length; i++){
		oLis[i].index = i;
		oLis[i].onclick = function(){
			showTip(this.index);
			index = this.index;
			move(bannerImg,"left",this.index*-1000,1000,function(){
				bannerImg.tiemr = window.setInterval(autoMove,3000);
			});
		}
	}
}
tipAction();