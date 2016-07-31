$(function() {
		var pager = {
			selector : $("#pager ul"),
			totalPost:50,
			postPerPage:5,
			next:'Next',
			prev:'Prev',
			nextBtn : $('#next'), 
			prevBtn : $('#prev'), 
			button : $('.btn'),
			paginationbuilder:function(){
				var newList,totalPost = this.totalPost, formLi='';
								
				var liList = Array.apply(null, {length : totalPost}).map(Number.call, Number);								
				$.each(liList, function(i, val){
					formLi+= '<li><a href="pageid/'+i+'">'+i+'</a></li>';					
				});
				
				this.selector.append(formLi);
				if(liList.length > 5){
					$('ul li:gt(5)').hide();
					$('ul').prepend("<li><a href='#' id='prev' class='btn'>Prev</a></li>").append("<li><a href='#' id='next' class='btn'>Next</a></li>");
				}

			//prev.on('click', paginate );	
			},
			paginate: function(){
				console.log('tes');
			},
			perform:function(){
			
			}
		}

		pager.paginationbuilder();		
		
		console.log(pager.button.addClass('test'));
		pager.button.on('click', function(){
			alert('tes');	
		});
		
	
});