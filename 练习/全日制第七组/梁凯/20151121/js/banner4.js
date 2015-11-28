var bannerImg = document.getElementById("bannerImg");
var index = 0;
// var t1 = 0,t2 = 0;
var oLis = document.getElementById("bannerTip").getElementsByTagName("li");
tipAction();

function move(curEle,attr,value,duration,callBack){
	var _this = curEle;
	// console.dir(_this);
	window.clearInterval(_this.timer);
	var curAtr = utils.css(_this,attr),
		step   = (value - curAtr) / duration * 13;

	~function _move(){
		curAtr = utils.css(_this,attr);
		// if(step < 0){

			if(Math.abs(curAtr + step) >= Math.abs(value)){
				utils.css(_this,attr,value);
				typeof callBack === 'function' ? callBack.call(_this,attr) : null;
				// window.clearTimeout(_this.t);
				// console.log(new Date()-t1);
				return;
			}
		// }else if(step > 0){
		// 	if(Math.abs(curAtr + step) <= Math.abs(value)){
		// 		utils.css(_this,attr,value);
		// 		typeof callBack === 'function' ? callBack.call(_this,attr) : null;
		// 		// window.clearTimeout(_this.t);
		// 		return;
		// 	}
		// }else{
		// 		typeof callBack === 'function' ? callBack.call(_this,attr) : null;
		// 	return;
		// }

		utils.css(_this,attr,curAtr + step);
		window.setTimeout(_move,13);
	}();

}
	// t1 = new Date();
function autoMove(){
	index++;
	move(bannerImg,"left",index*-1000,500,function(attr){
		if(index >= 4){
			index = 0;
			utils.css(this,attr,0);
		}
		showTip(index);
		bannerImg.timer = window.setTimeout(autoMove,3000);
	})
}
bannerImg.timer = window.setTimeout(autoMove,3000);
function showTip(n){
	[].slice.call(oLis,0).forEach(function(item,i,input){
		item.className = i === n ? 'selected' : null;
	})
	// for(var i=0; i<oLis.length; i++){
	// 	oLis[i].className = i === n ? 'selected' : null;
	// }
}
function tipAction(){
	for(var i=0; i<oLis.length; i++){
		oLis[i].count = i;
		oLis[i].onclick = function(){
			index = this.count;
			showTip(this.count);
			move(bannerImg,"left",index*-1000,500,function(){
				bannerImg.timer = window.setInterval(autoMove,3000);
			})
		}
	}
}