function startMove(obj,json,endFn,num){
	clearInterval(obj.timer);

	obj.timer=setInterval(function(){
		doMove(obj,json,endFn,num);
	},30);

	function doMove(obj,json,endFn,num){
		var iCur=0;
		var bStop=true;

		var iNum = num || 8;
		
		for(var attr in json){
			if(attr=='opacity'){
				iCur=Math.round(getStyle(obj,attr)*100);					
			}else{
				iCur=parseInt(getStyle(obj,attr))||0;				
			}
			
			var iSpeed=(json[attr]-iCur)/iNum;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(iCur!=json[attr]){
				bStop=false;
			}
			
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity='+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop){
			clearInterval(obj.timer);
			if(endFn){
				endFn.call(obj);
			}
		}
		
	}
}

function getStyle(obj,attr){

	return obj.currentStyle ? parseFloat(obj.currentStyle[attr]) : parseFloat(getComputedStyle(obj,false)[attr]);

}

function getByClass(sClass,oParent){

	var parent = oParent || document;
	var aEles = parent.getElementsByTagName('*');
	var re = new RegExp('\\b' + sClass + '\\b');
	var arr = [];

	for(var i=0; i<aEles.length; i++){	
		if(re.test(aEles[i].className))arr.push(aEles[i]);
	}

	return arr;
}
