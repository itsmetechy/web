

(function($){
$(document).ready(function() {
	
	$(window).load(function() {
			//alert('hi');
	//$('.form-submit').click(function(){
		//if($('input.form-text').val() == " ")
	//	{
	//	$('input.form-text').attr('title' ,'search');
	//}
		//alert($('input.form-text').val());
		//if($('input.form-text').val() == " ")
	//{	//alert('me');
		//	$(this).focus();
		//	return false;
			//$("form").submit(function(e){
//                alert('submit intercepted');
//                e.preventDefault(e);
//            });
			
		//}
	
//	});
	
		
		
	if ($('.display-mobile').is(':visible')) {
		$('#block-multiblock-1 .request-form #form-title').css('cursor','default');
		$('#block-multiblock-1 .request-form .form-title').click(function(){
			$('#block-multiblock-1 .request-form #quick-form').slideToggle();	
		});
		
		$('.request-apply').click(function(){
			$('html, body').animate({scrollTop: $('#request-anchor').offset().top}, 'slow');
			$('#block-multiblock-1 .request-form #quick-form').slideDown();
		return false;	
		});
		
		$('.tb-megamenu-button').click(function(){
			$('#header,#page').toggleClass( "scroll" );
			$('html, body').animate({scrollTop: $('#page').offset().top}, 'slow');	
		});
	}
	if ($('.display-mobilemenu').is(':visible')) {
		$('#block-multiblock-3').detach().appendTo('.mean-bar .mean-nav');
		$('#block-multiblock-3').addClass('searchglass');
		$('#block-tb-megamenu-main-menu').remove();
	}
	return false;
	});
	
	$('#block-system-main-menu .menu').wrap('<div class="content"></div>');
	
	
	//this applies a phone mask to any input with class="phone-input" on all devices except android
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
		$("#dayphone, #evephone").attr('maxlength','10');
		$("#zip").attr('maxlength','5');
	}
	else { 
		$('#dayphone, #evephone').mask('(999) 999-9999');
		$('#zip').mask('99999');
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
		$('#LocationID option:selected').insertBefore($('#LocationID option:eq(0)'));
		$('#LocationID option:eq(0)').attr('selected','selected');
	}

	//remove the school name from the program select options
	$("#LocationID option").each(function() {
        this.innerHTML = this.innerHTML.replace("School Name Goes Here - ","");
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
   // $('#LocationID option:eq(0)').text('Select a Campus');
	 $('#LocationID').append("<option>Select a Campus</option>");
	//$('#CurriculumID option:eq(0)').text('Select a Program');
	$('#LocationID').change(function() {
		console.log($('#LocationID').val());
		if ( $('#LocationID').val() == 'Select a Campus') {			
			$('#CurriculumID').empty().append('<option>Please select</option>');
			$('#CurriculumID option:eq(0)').text('Please select');
		}
		else {
			$('#CurriculumID option:eq(0)').text('Select a Program'); 
		}
	});
	$('.apply #LocationID option:eq(0)').text('Preferred Campus');
	//$('.visit #CurriculumID option:eq(0)').text('Select a Program');
	$('.apply #LocationID').change(function() {
		if ( $('.apply #LocationID').val() == '') {
			$('.apply #CurriculumID option:eq(0)').text('Select a Location first');
		}
		else {
			$('.apply #CurriculumID option:eq(0)').text('Select a Program'); 
		}
	});
	$('.visit #LocationID option:eq(0)').text('Location of Interest');
	//$('.visit #CurriculumID option:eq(0)').text('Select a Program');
	$('.visit #LocationID').change(function() {
		if ( $('.visit #LocationID').val() == '') {
			$('.visit #CurriculumID option:eq(0)').text('Select a Location first');
		}
		else {
			$('.visit #CurriculumID option:eq(0)').text('Select a Program'); 
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
	
	$(".qcf #quick-form input, .qcf #quick-form select, .full-form input, .full-form select, .share #quick-form input").mouseenter(function() {
		$(this).next("label.error").fadeOut();
	});
	
	// Inline labels for inputs
	$(".qcf #quick-form input[type=text], .full-form input[type=text], .share #quick-form input[type=text],.qcf #quick-form input[type=tel], .full-form input[type=tel], .share #quick-form input[type=tel]").attr('value', function(){return this.title}).addClass('unfilled');
	$(".qcf #quick-form input[type=text], .full-form input[type=text], .share #quick-form input[type=text],.qcf #quick-form input[type=tel], .full-form input[type=tel], .share #quick-form input[type=tel]").focus(function() {
		if (this.value == this.title)
			$(this).val('').removeClass('unfilled');
	});
	$(".qcf #quick-form input[type=text], .full-form input[type=text], .share #quick-form input[type=text],.qcf #quick-form input[type=tel], .full-form input[type=tel], .share #quick-form input[type=tel]").blur(function() {
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
	$(".qcf #quick-form").validate({
		ignore: ":hidden",
		rules: {
			LocationID: {
				required: true
			},
			CurriculumID: {
				required: true
			},
			/*prompted: {
				required: true
			},*/
			dayphone: {
				required: true,
				phoneUS: true,
				checkLabel: true,
				checkPhoneValue: true
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
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			LocationID: "!",
			CurriculumID: "!",
			/*prompted: "!",*/
			dayphone: "!",
			firstname: "!",
			lastname: "!",
			zip: "!",
			email: "!",
		}
	});
	
	
	$(".share #quick-form").validate({
		ignore: ":hidden",
		rules: {
			LocationID: {
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
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			firstname: "!",
			lastname: "!",
			email: "!",
		}
	});
	
	
	
	// Validation
	$(".full-form #quick-form.contact").validate({
		ignore: ":hidden",
		rules: {
			LocationID: {
				required: true
			},
			CurriculumID: {
				required: true
			},
			gradyear: {
				required: true
			},
			dayphone: {
				required: true,
				phoneUS: true,
				checkLabel: true,
				checkPhoneValue: true
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
			address: {
				required: true,
				checkLabel: true
			},
			city: {
				required: true,
				checkLabel: true
			},
			state: {
				required: true
			},
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			LocationID: "!",
			CurriculumID: "!",
			gradyear: "!",
			dayphone: "!",
			firstname: "!",
			lastname: "!",
			zip: "!",
			address: "!",
			city: "!",
			state: "!",
			email: "!",
		}
	});
	
	
	
	// Validation
	$(".full-form #quick-form.visit").validate({
		ignore: ":hidden",
		rules: {
			LocationID: {
				required: true
			},
			CurriculumID: {
				required: true
			},
			gradyear: {
				required: true
			},
			dayphone: {
				required: true,
				phoneUS: true,
				checkLabel: true,
				checkPhoneValue: true
			},
			firstname: {
				required: true,
				checkLabel: true
			},
			BestTimetoCall: {
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
			address: {
				required: true,
				checkLabel: true
			},
			city: {
				required: true,
				checkLabel: true
			},
			state: {
				required: true
			},
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			LocationID: "!",
			CurriculumID: "!",
			gradyear: "!",
			dayphone: "!",
			BestTimetoCall: "!",
			firstname: "!",
			lastname: "!",
			zip: "!",
			address: "!",
			city: "!",
			state: "!",
			email: "!",
		}
	});
	
	
	
	// Validation
	$(".full-form #quick-form.apply").validate({
		ignore: ":hidden",
		rules: {
			LocationID: {
				required: true
			},
			CurriculumID: {
				required: true
			},
			dayphone: {
				required: true,
				phoneUS: true,
				checkLabel: true,
				checkPhoneValue: true
			},
			firstname: {
				required: true,
				checkLabel: true
			},
			BestTimetoCall: {
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
			address: {
				required: true,
				checkLabel: true
			},
			city: {
				required: true,
				checkLabel: true
			},
			state: {
				required: true
			},
			email: {
				required: true,
				email: true,
				checkLabel: true
			}
		},
		messages: {
			LocationID: "!",
			CurriculumID: "!",
			dayphone: "!",
			BestTimetoCall: "!",
			firstname: "!",
			lastname: "!",
			zip: "!",
			address: "!",
			city: "!",
			state: "!",
			email: "!",
		}
	});
	
	
	// Validation
	$("#search-block-form--2, #search-block-form").validate({
		ignore: ":hidden",
		rules: {
			search_block_form: {
				required: true,
				checkLabel: true
			}
		},
		messages: {
			search_block_form: "!",
		}
	});
	
	
	$('.accordion-contain h3').click(function () {
		$(this).next('div').slideToggle();
		$(this).toggleClass("active");
		$(".accordion-contain h3").not(this).next(".accordion-content").slideUp("slow");
		//$(".disclosure-title").not(this).removeClass("active");
	});

	
	$('.mean-container a.meanmenu-reveal').click(function () {
		$('html, body').animate({scrollTop: $('#page').offset().top}, 'fast');
		$('#block-multiblock-3').toggle();
		$('#block-multiblock-3').addClass('searchglass');
	});
	
	$('#block-multiblock-3').click(function () {
		$('#block-multiblock-3').removeClass('searchglass');
	});
	
	$('#block-multiblock-3 input.form-text').removeAttr('title');
	
	
	$('#tabs div.tab-box').hide();
	$('#tabs div.tab-box:first').show();
	$('#tabs ul li:first').addClass('active');
 
	$('#tabs ul li a').click(function(){
		$('#tabs ul li').removeClass('active');
		$(this).parent().addClass('active');
			var currentTab = $(this).attr('href');
		$('#tabs div.tab-box').hide();
		$(currentTab).show();
		return false;
	});
	
if($(window).width() <= 768){
$( ".drop-content-icon.icon_1" ).wrap( "<a href='programs'></a>" );
$( ".drop-content-icon.icon_2" ).wrap( "<a href='student-and-career-services'></a>" );
$( ".drop-content-icon.icon_3" ).wrap( "<a href='contact-us'></a>" );
}

});
})(jQuery);
