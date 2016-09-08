/*

	说明：

		以下变量的值可修改：

			rows    :  图片分割行数， li的高度与rows相除必须是一个整数，否则无法正常分割。
			cells   :  图片分割列数， li的宽度与cells相除必须是一个整数，否则无法正常分割。
			iSpeed  :  图片运动的速度，值越小，运动越快，值越大，运动越慢。
			iDelay  :  自动播放的间隔时间，如果时间过短，当播放开始时运动效果还没有完成，则不会执行当次运动。
			arrPos  :  图片往外扩散所移动的距离，左负右正，上负下正。 x为左右，y为上下（上下左右为移动方向）。

		注：图片运动速度可以同时调整iSpeed与arrPos中的值，运动快慢与距离和速度相关。


*/


window.onload = function(){
	var oMenu = getByClass('menu')[0]
	var oPage = getByClass('pages')[0];
	var oCon = getByClass('content')[0];
	var oUl = getByClass('big-ptr')[0];
	var oMsg = getByClass('msg-list')[0];
	var oMark = getByClass('floats-box')[0];
	var aLi = oUl.getElementsByTagName('li');
	var oUl_a = oUl.getElementsByTagName('a');
	var aDt = oMsg.getElementsByTagName('dt');
	var aDd = oMsg.getElementsByTagName('dd');
	var aImg = oUl.getElementsByTagName('img');
	var aBtn = oPage.getElementsByTagName('a');
	var oEm = oPage.getElementsByTagName('em')[0];
	var aSpan = oMark.getElementsByTagName('span');
	var aTips = aDt[1].getElementsByTagName('span');
	var oSpan = oPage.getElementsByTagName('span')[0];
	var aMenu_dd = oMenu.getElementsByTagName('a');

	var aPos = [],arr = [],iNum = 0,iCont = 0;
	var iWidth = getStyle(aLi[0],'width');
	var iHeight = getStyle(aLi[0],'height');
	var iLoop = null,iDefer = null,iTime = null,bClk = false;

	var rows = 7,cells = 10;
	var iSpeed = 8,iDelay = 8000;
	var arrPos = {x:[-300,300],y:[300,-300]};

	oMenu.onmouseover = function(){startMove(oMenu,{top: -8});};
	oMenu.onmouseout = function(){startMove(oMenu,{top: -184});};

	for(var i=0; i<aMenu_dd.length; i++){
		aMenu_dd[i].index = i;
		aMenu_dd[i].onmouseover =  function(){
			for(var i=0; i<aMenu_dd.length; i++){
				aMenu_dd[i].className = '';
			}
			this.className = 'active';
		};
	}

	aTips[1].innerHTML = aDd.length;
	oSpan.style.width = 25 * aLi.length - 13 + 'px';

	if(iWidth%cells!=0||iHeight%rows!=0){
		alert('图片分割不合法，请重新设置rows值或者cells值！');
		return;
	}


	for(var i=0,len=rows*cells; i<len; i++){
		oMark.innerHTML += '<span></span>';
		aSpan[i].style.width = iWidth/cells + 'px';
		aSpan[i].style.height = iHeight/rows + 'px';
	}

	for(var i=0; i<oUl_a.length; i++){oUl_a[i].style.borderWidth = '0px';}

	for(var i=0; i<aSpan.length; i++){
		arr.push(aSpan[i]);
		aSpan[i].index = i;
		aSpan[i].x = aSpan[i].offsetLeft < iWidth/2 ? 0 : 1;
		aSpan[i].y = aSpan[i].offsetTop < iHeight/2 ? 1 : 0;
		aSpan[i].style.backgroundImage = 'url(' + aImg[iNum].src + ')';
		aPos.push({left: aSpan[i].offsetLeft, top: aSpan[i].offsetTop,opacity: 0});
		aSpan[i].style.backgroundPosition = -aPos[i].left +'px '+ (-aPos[i].top) +'px';
	}

	aBtn[0].onclick = function(){

		if(bClk)return;
		bClk = true;

		iNum--;
		if(iNum<0)iNum = aLi.length - 1;

		startMove(oEm,{width: 25 * (iNum+1) - 13},null,5);

		for(var i=0; i<aDd.length; i++){aDd[i].style.display = 'none';}
		aTips[0].innerHTML = iNum+1;
		aDd[iNum].style.display = 'block';
		changeImg(iNum,true);
	};

	aBtn[1].onclick = function(){

		if(bClk)return;
		autoPlay();

		for(var i=0; i<aDd.length; i++){aDd[i].style.display = 'none';}
		aTips[0].innerHTML = iNum+1;
		aDd[iNum].style.display = 'block';
		bClk = true;
	};

	iTime = setInterval(autoPlay,iDelay);

	oPage.onmouseover = oCon.onmouseover = function(){
		clearInterval(iTime);
		aTips[0].innerHTML = iNum+1;
		if(this==oCon)startMove(oMsg,{height: 40},null,5);
	};

	oPage.onmouseout = oCon.onmouseout = function(){
		clearInterval(iTime);
		iTime = setInterval(autoPlay,iDelay);
		if(this==oCon)startMove(oMsg,{height: 0},null,5);
	};

	function autoPlay(){

		if(bClk)return;
		bClk = true;

		iNum++;
		iNum %= aLi.length;

		for(var i=0,len=aLi.length; i<len; i++){aLi[i].className = '';}
		aLi[iNum].className = 'active';
		startMove(oEm,{width: 25 * iNum + 12},null,5);
		changeImg(iNum);

	}

	function changeImg(num,bLeft){
		var iSpan = 0;
		clearInterval(iLoop);

		arr.sort(function(){return Math.random()-0.5;})
		bLeft ? toLeft() : toRight();

		function toLeft(){
			fnReSet(num,0,arrPos);

			iLoop = setInterval(function(){
				clearTimeout(iDefer);
				startMove(arr[iSpan],{top: 0, left: 0, opacity: 100},function(){
					clearTimeout(iDefer);
					iDefer = setTimeout(function(){
						for(var i=0,len=aLi.length; i<len; i++){aLi[i].className = '';}
						aLi[num].className = 'active';
						bClk = false;
					},300);
				},iSpeed);
				iSpan++;
				if(iSpan==aSpan.length){clearInterval(iLoop);}
			},30);
		}

		function toRight(){
			iLoop = setInterval(function(){
				startMove(arr[iSpan],{top: arrPos.y[arr[iSpan].y], left: arrPos.x[arr[iSpan].x], opacity: 0},function(){
					clearTimeout(iDefer);
					iDefer = setTimeout(function(){
						fnReSet(num,100,[0,0]);
						bClk = false;
					},260);
				},iSpeed);
				iSpan++;
				if(iSpan==aSpan.length){clearInterval(iLoop);}
			},30);
		}

	}

	function fnReSet(num,iCur,pos){
	
		for(var i=0,len=aSpan.length; i<len; i++){
			aSpan[i].style.backgroundImage = 'url(' + aImg[num].src + ')';
			aSpan[i].style.opacity = iCur/100;
			aSpan[i].style.filter = 'alpha(opacity='+iCur+')';
			if(typeof pos[0] == 'number'){
				aSpan[i].style.top = pos[0] + 'px';
				aSpan[i].style.left = pos[1] + 'px';
			}else{
				aSpan[i].style.left = pos.x[aSpan[i].x] + 'px';
				aSpan[i].style.top = pos.y[aSpan[i].y] + 'px';			
			}
		}

	}

};

