(function(){
	window.onload = function(){
				var arr = [1, 3, 5, 7, 9, 11, 9, 7, 5, 3, 1];
				var circleArr = [];
				var conArr = [];
				var oSence = document.getElementById('sence');
				var oBox = document.getElementById("box");
				var oUl = document.getElementById('ring');
				var aLi = oUl.getElementsByTagName('li');
				var aBtn = document.getElementById('item').getElementsByTagName('button');
				var btnTxt = document.getElementById('btnTxt');
				var txtArea = document.getElementById('txtLabel');
				
				var s = "是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市是打发斯蒂芬哈时间老地方了就爱上的就发顺丰的哈市";
				txtArea.innerText = s;
				
				var columH = 0;
				var columNum = 0;
				
				var num = 0;
				var layer = 0;
				var word = -1;
				
				btnTxt.onclick = function(){
					if(txtArea.value != ""){
						num = 0;
						liNum = 0;
						s = txtArea.value;
						console.log(s.length);
						circleArr = [];
						oUl.innerHTML = "";
						aLi = oUl.getElementsByTagName('li');
						word = -1;
						layer = 0;
						for(var i = 4; i < 13; i++){
							num = i*i + (i+1)*(i+1);
							if(num >= s.length){
								layer = (i-1)*2+1;
								break;
							}
							layer = (i-1)*2+1;
							
						}
						
						for(var i = 0; i < layer; i++){
							if(i < (layer+1)/2){
								word += 2;
							} else {
								word -= 2;
							}
							circleArr.push(word);
						}
						num = 0;
						for(var i = 0; i < circleArr.length; i++){
							phi = 2*Math.PI/circleArr[i];
							for(var j = 0; j < circleArr[i]; j++){
								var li = document.createElement('li');

								li.innerHTML = s[num];

								num++;
								drawCircle(li, theta, phi, i, j);
								oUl.appendChild(li);
							}
						}
						
						for(var i = 0; i < aLi.length; i++){
					
							aLi[i].style.transform =  "translate3d("+aLi[i].circleX+"px, "+aLi[i].circleY+"px, "+aLi[i].circleZ+"px)  rotateY("+aLi[i].circlePhi+"rad) rotateX("+aLi[i].circleTheta+"rad)";
							
						}
								
						
					}
					
				}
				
				
				for(var i = 4; i < 13; i++){
					num = i*i + (i+1)*(i+1);
					if(num >= s.length){
						layer = (i-1)*2+1;
						break;
					}
					layer = (i-1)*2+1;
					
				}
				
				for(var i = 0; i < layer; i++){
					if(i < (layer+1)/2){
						word += 2;
					} else {
						word -= 2;
					}
					circleArr.push(word);
				}

				var theta = Math.PI/(circleArr.length-1);
				var phi = 0;
				var r = 150;
				num = 0;
				var liNum = 0;
				for(var i = 0; i < circleArr.length; i++){
					phi = 2*Math.PI/circleArr[i];
					for(var j = 0; j < circleArr[i]; j++){
						var li = document.createElement('li');

						li.innerHTML = s[num];

						num++;
						drawCircle(li, theta, phi, i, j);
						oUl.appendChild(li);
					}
				}
				
				for(var i = 0; i < aLi.length; i++){
			
					aLi[i].style.transform =  "translate3d("+aLi[i].circleX+"px, "+aLi[i].circleY+"px, "+aLi[i].circleZ+"px)  rotateY("+aLi[i].circlePhi+"rad) rotateX("+aLi[i].circleTheta+"rad)";
					aLi[i].onmouseover = function(){
						clearInterval(timer);
					};
					aLi[i].onmouseleave = function(){
						timer = setInterval(function(){
							angleX++;
							oBox.style.transform = "rotate3d(1,0.5,-1, "+angleX+"deg)";
						}, 60);
					}
				}
		
				
				
				aBtn[0].onclick = function(){
				
					console.log(aLi.length);
					for(var i = 0; i < aLi.length; i++){
		
						aLi[i].style.transform =  "translate3d("+aLi[i].circleX+"px, "+aLi[i].circleY+"px, "+aLi[i].circleZ+"px)  rotateY("+aLi[i].circlePhi+"rad) rotateX("+aLi[i].circleTheta+"rad)";
						aLi[i].onmouseover = function(){
							clearInterval(timer);
						};
						aLi[i].onmouseleave = function(){
							timer = setInterval(function(){
								angleX++;
								oBox.style.transform = "rotate3d(1,0.5,-1, "+angleX+"deg)";
							}, 60);
						}
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].style.display = "none";
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].style.display = "block";
						aLi[i].style.transform = "translate3d("+aLi[i].coneX+"px, "+aLi[i].coneY+"px, "+aLi[i].coneZ+"px)  rotateY("+aLi[i].conePhi+"rad) rotateX("+aLi[i].coneTheta+"rad)";
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].className = 'all';
						aLi[i].style.transform =  "translate3d("+aLi[i].maxCircleX+"px, "+aLi[i].maxCircleY+"px, "+aLi[i].maxCircleZ+"px)  rotateY("+aLi[i].circlePhi+"rad) rotateX("+aLi[i].circleTheta+"rad)";
						aLi[i].style.opacity = 0;
					}
					
					setTimeout(function(){
						for(var i = 0; i < aLi.length; i++){
							aLi[i].className = 'one';
							aLi[i].style.transform =  "translate3d("+aLi[i].circleX+"px, "+aLi[i].circleY+"px, "+aLi[i].circleZ+"px)  rotateY("+aLi[i].circlePhi+"rad) rotateX("+aLi[i].circleTheta+"rad)";
							aLi[i].style.opacity = 100;
						}
					}, 1000);
				}
				
					
					
				aBtn[1].onclick = function(){
					liNum = 0;
					conArr = [];
					var conNum = 0;
					for(var i = 0; i < aLi.length; i++){
						conNum += i*2-1;
						if(conNum > aLi.length){
							conNum -= 2*i-1;
							break;
						}
						conArr.push(2*i-1);
					}
				
					for(var i = 0; i < conArr.length; i++){
						phi = 2*Math.PI/conArr[i];
						for(var j = 0; j < conArr[i]; j++){
							drawCone(aLi[liNum], phi, i, j);
							liNum++;
						}
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].style.display = "none";
					}
					
					for(var i = 0; i < conNum; i++){
						aLi[i].style.display = "block";
						aLi[i].style.transform = "translate3d("+aLi[i].coneX+"px, "+aLi[i].coneY+"px, "+aLi[i].coneZ+"px)  rotateY("+aLi[i].conePhi+"rad) rotateX("+aLi[i].coneTheta+"rad)";
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].className = 'all';
						aLi[i].style.transform = "translate3d("+aLi[i].maxConeX+"px, "+aLi[i].maxConeY+"px, "+aLi[i].maxConeZ+"px)  rotateY("+aLi[i].conePhi+"rad) rotateX("+aLi[i].coneTheta+"rad)";
						aLi[i].style.opacity = 0;
					}
					
					setTimeout(function(){
						for(var i = 0; i < aLi.length; i++){
							aLi[i].className = 'one';
							aLi[i].style.transform =  "translate3d("+aLi[i].coneX+"px, "+aLi[i].coneY+"px, "+aLi[i].coneZ+"px)  rotateY("+aLi[i].conePhi+"rad) rotateX("+aLi[i].coneTheta+"rad)";
							aLi[i].style.opacity = 100;
						}
					}, 1000);
				}
				
				
				
				
				
				aBtn[2].onclick = function(){
					var theta = Math.PI/(circleArr.length-1);
					var phi = 0;
					var r = 150;
					num = 0;
					
					columH = Math.floor(aLi.length/(circleArr.length - 2));
					columNum = (circleArr.length - 2)*columH;
					liNum = 0;
					for(var i = 0; i < circleArr.length -1; i++){
						phi = 2*Math.PI/columH;
						for(var j = 0; j < columH; j++){
							drawColum(aLi[liNum], phi, i, j);
							liNum++;
						}
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].style.display = "none";
					}
					
					for(var i = 0; i < columNum; i++){
						aLi[i].style.display = "block";
						aLi[i].style.transform = "translate3d("+aLi[i].columX+"px, "+aLi[i].columY+"px, "+aLi[i].columZ+"px)  rotateY("+aLi[i].columPhi+"rad)";
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].className = 'all';
						aLi[i].style.transform = "translate3d("+aLi[i].maxColumX+"px, "+aLi[i].maxColumY+"px, "+aLi[i].maxColumZ+"px)  rotateY("+aLi[i].columPhi+"rad)";
						aLi[i].style.opacity = 0;
					}
					
					setTimeout(function(){
						for(var i = 0; i < aLi.length; i++){
							aLi[i].className = 'one';
							aLi[i].style.transform =  "translate3d("+aLi[i].columX+"px, "+aLi[i].columY+"px, "+aLi[i].columZ+"px) rotateY("+aLi[i].columPhi+"rad)";
							aLi[i].style.opacity = 100;
						}
					}, 1000);
				}
				
				aBtn[3].onclick = function(){
					
					var theta = Math.PI/(circleArr.length-1);
					var phi = 0;
					var r = 150;
					num = 0;
					columH = Math.floor(aLi.length/(circleArr.length - 2));
					columNum = (circleArr.length - 2)*columH;
					liNum = 0;
					for(var i = 0; i < circleArr.length -1; i++){
						phi = 2*Math.PI/columH;
						for(var j = 0; j < columH; j++){
							drawColum2(aLi[liNum], phi, i, j);
							liNum++;
						}
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].style.display = "none";
					}
					
					for(var i = 0; i < columNum; i++){
						aLi[i].style.display = "block";
						aLi[i].style.transform = "translate3d("+aLi[i].columX2+"px, "+aLi[i].columY2+"px, "+aLi[i].columZ2+"px)  rotateY("+aLi[i].columPhi2+"rad)";
					}
					
					for(var i = 0; i < aLi.length; i++){
						aLi[i].className = 'all';
						aLi[i].style.transform = "translate3d("+aLi[i].maxColumX2+"px, "+aLi[i].maxColumY2+"px, "+aLi[i].maxColumZ2+"px)  rotateY("+aLi[i].columPhi2+"rad)";
						aLi[i].style.opacity = 0;
					}
					
					setTimeout(function(){
						for(var i = 0; i < aLi.length; i++){
							aLi[i].className = 'one';
							aLi[i].style.transform =  "translate3d("+aLi[i].columX2+"px, "+aLi[i].columY2+"px, "+aLi[i].columZ2+"px) rotateY("+aLi[i].columPhi2+"rad)";
							aLi[i].style.opacity = 100;
						}
					}, 1000);
					
				}
				
				
				var angleX = 0;
				var timer = setInterval(function(){
					angleX++;
					oBox.style.transform = "rotate3d(1,0.5,-1, "+angleX+"deg)";
				}, 60);
				
				function drawCircle(obj, theta, phi, i, j){
					obj.circleX = r*Math.sin(theta*i)*Math.sin(phi*j)+200;
					obj.circleY = -r*Math.cos(theta*i)+200;
					obj.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
					obj.circleTheta = theta*(circleArr.length - i) - Math.PI/2;
					obj.circlePhi = phi*j;
					
					obj.maxCircleX = (r+2000)*Math.sin(theta*i)*Math.sin(phi*j)+200;
					obj.maxCircleY = -(r+2000)*Math.cos(theta*i)+200-2000;
					obj.maxCircleZ = (r+2000)*Math.sin(theta*i)*Math.cos(phi*j);
			
					
				}
				
				function drawCone(obj, phi, i, j){
					if(obj){
						obj.coneX = (2*r/conArr.length)*i*Math.tan(30*Math.PI/180)*Math.sin(phi*j)+200;
						obj.coneY = (2*r/conArr.length)*i;
						obj.coneZ = (2*r/conArr.length)*i*Math.tan(30*Math.PI/180)*Math.cos(phi*j);
						obj.coneTheta = Math.PI/6;
						obj.conePhi = phi*j;
						
						obj.maxConeX = (2*(r+2000)/conArr.length)*i*Math.tan(30*Math.PI/180)*Math.sin(phi*j)+200;
						obj.maxConeY = (2*(r+2000)/conArr.length)*i - 2000;
						obj.maxConeZ = (2*(r+2000)/conArr.length)*i*Math.tan(30*Math.PI/180)*Math.cos(phi*j);
					}
					
						
				}
				
				function drawColum(obj, phi, i, j){
					if(obj){
						obj.columX = (r/1.5)*Math.sin(phi*j)+200;
						obj.columY = 2*r/(circleArr.length)*i+50;
						obj.columZ = r/1.5*Math.cos(phi*j);
						obj.columPhi = phi*j;
						
						obj.maxColumX = ((r+2000)/1.5)*Math.sin(phi*j)+200;
						obj.maxColumY = 2*(r+2000)/(circleArr.length)*i+50 - 2000;
						obj.maxColumZ = (r+2000)/1.5*Math.cos(phi*j);
					}
					
				}
				
				function drawColum2(obj, phi, i, j){
					if(obj){
		
						obj.columX2 = (r/1.5)*Math.sin(phi*j+i*8*Math.PI/180)+200;
						obj.columY2 = 2*r/(circleArr.length)*i+50;
						obj.columZ2 = r/1.5*Math.cos(phi*j+i*8*Math.PI/180);
						obj.columPhi2 = phi*j+i*8*Math.PI/180;
						
						obj.maxColumX2 = ((r+2000)/1.5)*Math.sin(phi*j+i*8*Math.PI/180)+200;
						obj.maxColumY2 = 2*(r+2000)/(circleArr.length)*i+50 - 2000;
						obj.maxColumZ2 = (r+2000)/1.5*Math.cos(phi*j+i*8*Math.PI/180);
					}
					
				}
			}
})();