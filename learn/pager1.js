$(function() {
		function Pager() {
			this.selector = $("#pager ul");
			this.totalPost = 50;
			this.postPerPage = 5;
			this.next = 'Next';
			this.prev = 'Prev';
			this.nextBtn = 'next'; 
			this.prevBtn = 'prev'; 
			this.button = '.btn';
			this.paginationbuilder = function(){
				var newList,totalPost = this.totalPost, formLi='';
				var liList = Array.apply(null, {length : totalPost}).map(Number.call, Number);							
				$.each(liList, function(i, val){
					formLi+= '<li><a href="pageid/'+i+'">'+i+'</a></li>';					
				});
				
				this.selector.append(formLi);
				if(liList.length > 5){
					$('ul li').eq(0).addClass('current');
					$('ul li:gt('+this.postPerPage+')').hide();
					$('ul').prepend("<li><a href='#' id='prev' class='btn'>Prev</a></li>").append("<li><a href='#' id='next' class='btn'>Next</a></li>");
				}
			},
			this.movePaginate = function(dir){
				var numSet = this.totalPost / this.postPerPage, current = this.selector.find('li.current'), currentIndex = current.index();
				(dir === 'next')? this.moveForward(current, currentIndex, numSet):this.moveBackward(current, currentIndex, numSet);
				console.log(currentIndex);
			}			
			this.moveForward = function (current, currentIndex,  numSet){
				(currentIndex >=2)?$('#prev').show(): $('#prev').show();
				current.removeClass('current').next().addClass('current');
			}
			this.moveBackward = function(current, currentIndex, numSet){
				(currentIndex <=2)?$('#prev').hide(): $('#prev').show();
				current.removeClass('current').prev().addClass('current');
			}

		}
		var paginate = new Pager();
		paginate.paginationbuilder();
		
		$(paginate.button).on('click', function(e){
			var dir = $(this).attr('id'), $this = $(this);
			paginate.movePaginate(dir);
			e.preventDefault();
		});
	
});