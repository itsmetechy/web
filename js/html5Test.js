var questionArray = [],
	optionArray = [],
	rightAnsArray = [],
	userAnswerdArray = [],
	currentOptions = 0,
	rightAnswerCnt = 0,
	optionCnt = 0;
$(document).ready(function(){	
	$.ajax({
		type: "GET",
		url: "xml/data.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('question').each(function(){
				var questionStr = $(this).find('question_text').text();
				var answerStr = $(this).find('question_text').attr('answer');
				
				optionArray[optionCnt] = []
				userAnswerdArray[optionCnt] = []
				questionArray.push(questionStr)
				rightAnsArray.push(answerStr)
				
				$(this).find('option').each(function(){
					var option = $(this).text();
					optionArray[optionCnt].push(option)
				});
				optionCnt++
			});
			
			genetateQuiz(currentOptions)
			
			$('#nextButton').click(function(){
				var selvalue = $('input[name=radiobtn]:checked').val();
				userAnswerdArray[currentOptions].push(selvalue);
				currentOptions++
				genetateQuiz(currentOptions)
				$('#nextButton').attr('disabled',true);
				if(currentOptions == optionArray.length-1){
					 $('#nextButton').hide();
					 $('#resultButton').show();
				}
			});
				
			$('#resultButton').click(function(){
				var selvalue = $('input[name=radiobtn]:checked').val();
				userAnswerdArray[currentOptions].push(selvalue);
				var rightAnswerCnt = 0
				for(var i=0; i<rightAnsArray.length;i++){
					if(rightAnsArray[i] == userAnswerdArray[i]){
						rightAnswerCnt++
					}
				}
				$('p#resultInfo').html('You have answerd:  <b>'+rightAnswerCnt+'</b> out of  <b>' +rightAnsArray.length+'</b>')
			});
		}
	});
	
	$('body').on('change', 'input[name=radiobtn]', function(){
		$('#nextButton').attr('disabled',false);   
	});
	
});

function genetateQuiz(optionId){
	var input = '';
	for(var i = 0 ;i<optionArray[optionId].length;i++){
		input += ('<li><input type="radio" name="radiobtn" value="'+parseInt(i+1)+'"/>'+optionArray[optionId][i]+'</li>');
	}
	$('#optionContainer').html('<ul>'+input+'</ul>');
	$('#questionContainer').html(questionArray[optionId]);
}
	

