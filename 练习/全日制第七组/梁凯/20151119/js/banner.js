

/*
	珠峰培训第一版简单的动画库（只实现匀速运动的动画）
	@parameter
		target:[object]	目标样式值
		attr:[string]	当前要操作元素的哪一个样式属性运动
		value:[number/string]	要操作的样式属性目标值
		curEle:[object]	当前要运动的元素
		duration：[number]	运动的总时间
		callBack:[function]	运动结束后执行的操作
*/
var move = function(curEle,attr,value,duration,callBack){
	window.clearTimeout(timer);//清除当前运动正在执行的其他运动
	var _this 	= curEle,
		timer 	= null,
		curAtr 	= utils.css(_this,attr),
		step 	= (value - curAtr) / duration * 13;//运动的步长

	//运动的动画
	~function _move(){
		window.clearTimeout(timer);
		var curAtr 	= utils.css(_this,attr);
		if(Math.abs(curAtr + step) >= Math.abs(value)){
			utils.css(_this,attr,value);
			typeof callBack === 'function' ? callBack.call(_this) :null;
			return;
		}

		utils.css(_this,attr,curAtr + step);
		timer = window.setTimeout(_move,13);
	}();
}


var bannerImg = document.getElementById('bannerImg');
var index = 0;
var autoMove = function(){
	index++;
	move(bannerImg,"left",index*-1000,1000,function(){
		//当第四张图片切换到最后一张图pain完成的时候，我们的index变为4，此时即和第一张相同，
		if(index>=4){
			index = 0;
			utils.css(bannerImg,"left",0);
		}
		banner.timer = window.setInterval(autoMove,2000);
	});
};

bannerImg.timer = window.setInterval(autoMove,2000);
