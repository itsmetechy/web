$(document).ready(function () {
			var canvas;
			var context;
			var numRows=6;
			var numCols=6;	
			
			var colorValues = [];
			canvas=document.getElementById('colorGrid');
			context=canvas.getContext('2d');
			canvas.addEventListener("click",getMousePoint,false);
			lineSpacing = canvas.width/numRows;

			var gx;
			var gy;
			/* generate random unique colors*/
			function randomColor() {
				return ('#' + Math.floor(Math.random() * 16777215).toString(16));
			}
			function checkUniqness(rancolor){
				for(var i = 0; i < colorValues.length; i++) {
					if(colorValues[i] == rancolor) return true;
				}
				return false;      
			}
			function generateUniqueColor() {   
				var tempColor;
				do
				{
					tempColor = randomColor();            
				} 
				while(checkUniqness(tempColor));
				colorValues.push(tempColor);
				return tempColor;
			}
			/*==================================================*/
			
			function fill(s,gx,gy){
				context.fillStyle = s;
				context.fillRect(gx, gy , lineSpacing, lineSpacing);
			}
			for(var i=0;i<numRows;i++){
				for(var j=0;j<numCols;j++)
					{
						gx=i*lineSpacing;
						gy=j*lineSpacing;
						var color = generateUniqueColor();          
						fill(color, gx, gy);			
					}
			}
		});
		/* get color code from colorgrid on mouse click */
		function getMousePoint(e){
			 // getting user coordinates
			var x = e.offsetX;
			var y = e.offsetY;			
			// getting image data and RGB values
			var canvas = document.getElementById("colorGrid");
			var context= canvas.getContext('2d');
			var img_data = context.getImageData(x, y, 1, 1).data;			
			var R = img_data[0];
			var G = img_data[1];
			var B = img_data[2];  
			var rgb = R + ',' + G + ',' + B; 
			alert(rgb);
		}