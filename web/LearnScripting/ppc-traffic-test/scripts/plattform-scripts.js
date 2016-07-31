$(document).ready(function() {
	
	//this applies a phone mask to any input with class="phone-input" on all devices except android
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
		$(".phone-input, .date-input").attr('maxlength','10');
		$(".year-input").attr('maxlength','4');
		$(".zip-input").attr('maxlength','5');
	}
	else { 
		$('.phone-input').mask('(999) 999-9999');
		$('.date-input').mask('99/99/9999');
		$('.year-input').mask('9999');
		$('.zip-input').mask('99999');
	}

	//alphabetize the options in the LocationID select list in everything but FireFox
	var FIREFOX = (document.getBoxObjectFor != null || window.mozInnerScreenX != null);
	if (FIREFOX) {
		//
	} else { 
	   $('#LocationID option:eq(0)').attr('selected','selected');
		function NASort(a, b) {    
		    if (a.innerHTML == 'NA') {
		        return 1;   
		    }
		    else if (b.innerHTML == 'NA') {
		        return -1;   
		    }       
		    return (a.innerHTML > b.innerHTML) ? 1 : -1;
		};
		$('#LocationID option').sort(NASort).appendTo('#LocationID');
		//$('#LocationID option:selected').insertBefore($('#LocationID option:eq(0)'));
		$('#LocationID option:eq(0)').attr('selected','selected');
	}

	//remove the school name from the program select options
	$("#LocationID option").each(function() {
        this.innerHTML = this.innerHTML.replace("Regent University - ","");
      });

	
	//only allows number for any input with class="number-input"
	$(".number-input").keydown(function(event) {
        // Allow: backspace, delete, tab and escape
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });

	//Set the text that shows for the LocationID and CurriculumID select fields
    $('#LocationID option:eq(0)').text('Location of Interest');
	$('#CurriculumID option:eq(0)').text('Program of Interest');
	$('#LocationID').change(function() {
		if ( $('#LocationID').val() == '') {
			$('#CurriculumID option:eq(0)').text('Program of Interest');
		}
		else {
			$('#CurriculumID option:eq(0)').text('Select a Program'); 
		}
	});
	
	//make selects wider on click so that options aren't cut off in IE8
	if (navigator.userAgent.match(/MSIE\s(?!9.0)/)) {
		$("#LocationID").mousedown(function(){
				$(this).css("width", "350px");
			}).focusout(function(){
				$(this).css("width", "100%");
			}).change(function(){
				$(this).css("width", "100%");
			}); 
		$("#CurriculumID").mousedown(function(){
				$(this).css("width", "350px");
			}).focusout(function(){
				$(this).css("width", "100%");
			}).change(function(){
				$(this).css("width", "100%");
			}); 
	}
	
	$("#quick-form input, #quick-form select").mouseenter(function() {
		$(this).next("label.error").fadeOut();
	});
	
	// Inline labels for inputs
	$("#quick-form input[type=text], #quick-form input[type=tel]").attr('value', function(){return this.title}).addClass('unfilled');
	$("#quick-form input[type=text], #quick-form input[type=tel]").focus(function() {
		if (this.value == this.title)
			$(this).val('').removeClass('unfilled');
	});
	$("#quick-form input[type=text], #quick-form input[type=tel]").blur(function() {
		if (this.value == '')
			$(this).attr('value', function(){return this.title}).addClass('unfilled');
	});

	// Check input value against inline label
	$.validator.addMethod("checkLabel", function( value, element ) {
		return this.optional(element) || value != element.title;
	}, "Please enter a value.");

	$.validator.addMethod("checkPhoneValue", function(value) {
		var invalidPhoneNumbers = ['(000) 000-0000', '(111) 111-1111', '(222) 222-2222', '(333) 333-3333', "(444) 444-4444", "(555) 555-5555", "(666) 666-6666", "(777) 777-7777", "(888) 888-8888", "(999) 999-9999", "(123) 456-7890",'0000000000', '1111111111', '2222222222', '3333333333', "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999", "1234567890"];
	    return $.inArray(value, invalidPhoneNumbers) == -1;
	}, 'Please enter valid phone number.');
	
	

	// Validation
	$("#quick-form").validate({
		ignore: ":hidden",
        onclick: false,
        onfocusout: false,
        onsubmit: true,
        onkeyup: false,
        onkeydown: false,
		rules: {
			LocationID: {
				required: true
			},
			CurriculumID: {
				required: true
			},
			firstname: {
				required: true,
				checkLabel: true
			},
			lastname: {
				required: true,
				checkLabel: true
			},
			zip: {
				required: true,
				checkLabel: true
			},
			dayphone: {
				required: true,
				phoneUS: true,
				checkLabel: true,
				checkPhoneValue: true
			},
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			LocationID: "Please select a location.",
			CurriculumID: "Please select a program.",
			firstname: "Please enter your first name.",
			lastname: "Please enter your last name.",
			zip: "Please enter a Zip code.",
			dayphone: "Please enter a valid phone number.",
			email: "Please enter a valid email address."
		},
        // Use this function to force alert-box errors instead of inline labels
        showErrors: function(errorMap, errorList) {
            var errors = [];
            $.each(errorList,function(i,e) {
                errors.push(e.message);
            });
            if (errors.length) {
                window.alert(errors.join("\n"));
                $.support.placeholder = ('placeholder' in document.createElement('input'));
                if (!$.support.placeholder) {
                    $('[placeholder]').each( function() {
                        if ($(this).val() == '') $(this).val($(this).attr('placeholder'));
                    });
                }
            }
        }
	});

});
