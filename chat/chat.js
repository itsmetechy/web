(function($){

	$(function(){
			//Assigning Variables
		var $container = $('.chat_container'),
		 	$type_text = $('.type_text'),
		 	$button = $('button'),
		 	$self = 'You: ',
		 	$sender = 'ChatBox: ';

		 	//var chatboxMessage = [ "Hey what's your name?", ""]


		 //start
		 $container.html('<span>'+ $sender +'</span>' + 'Hey what is your name?');
		 $type_text.keypress(function(event){
			if(event.which == 13) {
				var message = $(this).val(),
					emptyField = $(this).val(' '),
					mainHistory = $container.html();

				$container.html(mainHistory + '<br> <span>'+ $self +'</span>' +  message);
				receiveMessage(message);
				$container.scrollTop($container.prop('scrollHeight'));
			}

			function receiveMessage(message){		
				$container.delay(5000).html(mainHistory + '<br> <span>'+ $sender +'</span> Hey ' +  message + ' Whats up!!');
			}


			$button.on('click', function(){

			});	 	

		 })
	});	
})(jQuery)