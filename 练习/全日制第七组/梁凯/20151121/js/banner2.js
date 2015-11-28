var bannerImg = document.getElementById('bannerImg');
var index = 0;

function move(duration,interval){
	var _this = this;
	window.clearInterval(_this.autoTimer);

	var tarL = utils.css(_this,"left") - 1000;
	var step = (-1000 / duration) * interval;

	~function _move(){
		window.clearTimeout(_this.timer);
		var curL = utils.css(_this,"left");
		if(curL + step <= tarL){
			utils.css(_this,"left",tarL);
			if(index >= 4){
				index = 0;
				// _this.style.left = 0 + 'px';
				utils.css(_this,"left",0)
			}
			_this.autoTimer = window.setInterval(autoMove,3000);
			return;
		}
		utils.css(_this,"left",curL + step);
		_this.timer = window.setTimeout(_move,interval);
	}();

}
function autoMove(){
	index++;
	move.call(bannerImg,1000,13);
}
bannerImg.autoTimer = window.setInterval(autoMove,3000);