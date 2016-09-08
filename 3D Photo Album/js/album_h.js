window.onload=function()
{
	var oPicTab=document.getElementById("picTab");
	var aLi=oPicTab.getElementsByTagName("li");
	var oBar=document.getElementById("scroll_bar");
	var oNext=document.getElementById("nextBtn");
	var oPrev=document.getElementById("prevBtn");
	var iZindex=aLi.length;
	var iTime = null;
	var iDelay = 4500; //自动播放间隔
	var iNow=0,	iNum = -1;

	var oMenu = getByClass('menu')[0]
	var oPage = getByClass('pages')[0];
	var oCon = getByClass('content')[0];
	var oMsg = getByClass('msg-list')[0];
	var aDt = oMsg.getElementsByTagName('dt');
	var aDd = oMsg.getElementsByTagName('dd');
	var aBtn = oPage.getElementsByTagName('a');
	var oEm = oPage.getElementsByTagName('em')[0];
	var aTips = aDt[1].getElementsByTagName('span');
	var oSpan = oPage.getElementsByTagName('span')[0];
	

	aTips[1].innerHTML = aDd.length;
	oSpan.style.width = 25 * aLi.length - 13 + 'px';

	oNext.off=oPrev.off=true;
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].arr=toCreate(aLi[i]);
		aLi[i].style.zIndex=iZindex-i;		
	}
	setCss(oBar,{$Transition:"0.3s ease width"});

	oPage.onmouseover = oCon.onmouseover = function(){
		clearInterval(iTime);
		aTips[0].innerHTML = iNow+1;
		if(this==oCon)startMove(oMsg,{height: 40},null,5);
	};

	oPage.onmouseout = oCon.onmouseout = function(){
		clearInterval(iTime);
		iTime = setInterval(autoPlay,iDelay);
		if(this==oCon)startMove(oMsg,{height: 0},null,5);
	};

	oNext.onclick=function()
	{
		if(iNow==aLi.length-1)
		{
			iNow=0;
			for(var i=0;i<aLi.length-1;i++)
			{
				startShow(aLi[i]);
			}
			oBar.style.width=iNow*25+12+"px";
			return;
		}
		var iOld=iNow;
		iNow++;
		startHide(aLi[iOld]);
		oBar.style.width=iNow*25+12+"px";
		for(var i=0; i<aDd.length; i++){aDd[i].style.display = 'none';}
		aTips[0].innerHTML = iNow+1;
		aDd[iNow].style.display = 'block';
	};

	function autoPlay()
	{
		if(iNow>=aLi.length-1)
		{
			iNum = -1;
		}
		else if(iNow<=0)
		{
			iNum = 1;
		}
		if(iNum > 0)startHide(aLi[iNow]);
		iNow += iNum;
		if(iNum < 0)startShow(aLi[iNow]);
		oBar.style.width=iNow*25+12+"px";
		for(var i=0; i<aDd.length; i++){aDd[i].style.display = 'none';}
		aTips[0].innerHTML = iNow+1;
		aDd[iNow].style.display = 'block';
	}
	iTime = setInterval(autoPlay,iDelay);
	oPrev.onclick=function()
	{
		if(iNow==0)
		{
			iNow=aLi.length-1;
			for(var i=0;i<aLi.length-1;i++)
			{
				startHide(aLi[i]);
			}
			oBar.style.width=iNow*25+12+"px";
			return;
		}
		iNow--;
		startShow(aLi[iNow]);
		oBar.style.width=iNow*25+12+"px";
		for(var j=0; j<aDd.length; j++){aDd[j].style.display = 'none';}
		aTips[0].innerHTML = iNow+1;
		aDd[iNow].style.display = 'block';
	};
};
function startHide(obj)
{
	for(var i=0;i<obj.children.length;i++)
	{
		obj.children[i].off=true;
		clearTimeout(obj.children[i].timer);
	}
	seedWalk(obj.arr,obj.children[i-1].x,obj.children[i-1].y,fnHide,50);
}
function startShow(obj)
{
	for(var i=0;i<obj.children.length;i++)
	{
		var iTop=obj.children[i].y*30;
		var iLeft=obj.children[i].x*30;
		obj.children[i].off=true;
		clearTimeout(obj.children[i].timer);
	}
	seedWalk(obj.arr,0,0,fnShow,50);
}
function toCreate(obj)
{
	var iWidth=57;
	var iHeight=42;
	var iRows=Math.floor(obj.offsetHeight/iHeight);
	var iRowLength=Math.floor(obj.offsetWidth/iWidth);
	var iLength=iRows*iRowLength;
	var sHtml="";
	var iLeft=(obj.offsetWidth-iWidth*iRowLength)/2;
	var iTop=(obj.offsetHeight-iHeight*iRows)/2;
	for(var i=0;i<iRows;i++)
	{
		for(var j=0;j<iRowLength;j++)
		{
			sHtml+="<a href='javascript:;' style='background-position:-"+j*iWidth+"px -"+i*iHeight+"px'></a>"	
		}
	}
	obj.innerHTML=sHtml;
	var aA=obj.getElementsByTagName("a");
	var aAArr=toArr(aA,iRows,iRowLength);
	for(var i=0;i<aA.length;i++)
	{
		aA[i].t=aA[i].offsetTop;
		aA[i].l=aA[i].offsetLeft;
		setCss(aA[i],{top:aA[i].t,left:aA[i].l});
	}
	for(var i=0;i<aA.length;i++)
	{
		aA[i].style.position="absolute";
		setCss(aA[i],{$Transform:"rotateX(0deg) rotateY(0deg)",borderColor:"rgba(0,0,0,0)",position:"absolute"});	
	}
	setCss(obj,{$Perspective:"500px",$TransformStyle:"preserve-3d",width:0,height:0,left:iLeft,top:iTop});
	return aAArr;
}
function toArr(oBjs,iRows,iRowLength)
{
	var aObjs=[];
	for(var i=0;i<iRows;i++)
	{
		var arr=[];
		for(var j=0;j<iRowLength;j++)
		{
			oBjs[i*iRowLength+j].x=j;
			oBjs[i*iRowLength+j].y=i;
			oBjs[i*iRowLength+j].off=true;
			arr.push(oBjs[i*iRowLength+j]);
		}
		aObjs.push(arr);
	}
	return aObjs;
}
function seedWalk(arr,x,y,fn,iDelay)
{
	if( (arr[y] && arr[y][x]) && arr[y][x].off )
	{
		if(fn)
		{
			if(fn)
			{
				fn.call(arr[y][x]);
			}
		}
		arr[y][x].off=false;
		arr[y][x].timer=setTimeout(function()
		{
			seedWalk(arr,x,y-1,fn,iDelay);
			seedWalk(arr,x,y+1,fn,iDelay);
			seedWalk(arr,x-1,y,fn,iDelay);
			seedWalk(arr,x+1,y,fn,iDelay);
		},iDelay);
	}
}
function fnShow()
{
	setCss(this,{$Transition:"1s ease-in-out all",$Transform:"rotateX(0deg) rotateY(0deg)",top:this.t,left:this.l,opacity:100,borderColor:"rgba(0,0,0,0)",boxShadow:"none"});
}
function fnHide()
{
	setCss(this,{WebkitTransition:"0.1s ease border-color,0.1s ease box-shadow,2.5s 0.1s top ease,2.5s 0.1s -webkit-transform ease,2.2s 0.1s opacity ease",MozTransition:"0.1s ease border-color,0.1s ease box-shadow,2.2s 0.1s top ease,2.2s 0.1s -moz-transform ease,2.2s 0.1s opacity ease",OTransition:"0.1s ease border-color,0.1s ease box-shadow,2.2s 0.1s top ease,2.2s 0.1s -o-transform ease,2.2s 0.1s opacity ease",transition:"0.1s ease border-color,0.1s ease box-shadow,2.2s 0.1s top ease,2.2s 0.1s transform ease,2.2s 0.1s opacity ease",borderColor:"rgba(0,0,0,0.6)",boxShadow:"0 0 20px 3px rgba(82,125,255,0.8)",top:this.t-100,$Transform:"rotateX(720deg) rotateY(540deg)",opacity:0});
}


function getCss(obj, attr)
{
	if(attr=="rotate")
	{
		return obj.rotate;
	}
	var i=parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
	var val=i?i:0;
	if(attr=="opacity")
	{
		val*=100;
	}
	return val;
}
function getPositionXy(obj)
{
	var iXY={x:0,y:0};
	while(obj)
	{
		iXY.x+=obj.offsetLeft;
		iXY.y+=obj.offsetLeft;
		obj=obj.offsetParent;
	}
	return iXY;
}
function setCss(obj,oAttr)
{
	var sAttr="";
	var arr=["Webkit","Moz","O","ms",""];
	for(sAttr in oAttr)
	{
		
		if(sAttr.charAt(0)=="$")
		{
			for(var i=0;i<arr.length;i++)
			{
				obj.style[arr[i]+sAttr.substring(1)]=oAttr[sAttr];
			}
		}
		else if(sAttr=="rotate")
		{
			obj.rotate=oAttr[sAttr];
			var a=Math.cos(obj.rotate/180*Math.PI); 
			var b=Math.sin(obj.rotate/180*Math.PI);
			var c=-Math.sin(obj.rotate/180*Math.PI);
			var d=Math.cos(obj.rotate/180*Math.PI);
			for(var i=0;i<arr.length;i++)
			{
				obj.style[arr[i]+"Transform"]="matrix("+a+","+b+","+c+","+d+","+0+","+0+")";
			}
			obj.style.filter="progid:DXImageTransform.Microsoft.Matrix( M11="+a+", M12="+c+", M21="+b+", M22="+d+",SizingMethod='auto expand')";
		}
		else
		{
			var value=oAttr[sAttr];
			switch(sAttr)
			{
				case 'width':
				case 'height':
				case 'paddingLeft':
				case 'paddingTop':
				case 'paddingRight':
				case 'paddingBottom':
					value=Math.max(value,0);
				case 'left':
				case 'top':
				case 'marginLeft':
				case 'marginTop':
				case 'marginRight':
				case 'marginBottom':
					obj.style[sAttr]=value+'px';
					break;
				case 'opacity':
					if(value<0)
					{
						value=0;
					}
					obj.style.filter="alpha(opacity:"+value+")";
					
					obj.style.opacity=value/100;
					break;
				default:
					obj.style[sAttr]=value;
			}
		}
	}
}
