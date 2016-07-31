$.widget( "fx.customselect", {
	options: {
		helptext:	true,
		ddwidth:	'auto',
		hidecss:	false
	},
	_create: function() {
		var	textOption = this.element.find('select').data('textoption'),
			fakeSelect = '',
			$appendElement = '';

		/*Hide select boxes -- Configurable*/
		if(this.options.hidecss === false){
			this.element.find('select').hide();
		}

		/*helptext option -- Configurable*/
		if(this.options.helptext === false){
			textOption = this.element.find('select option').first().text();
		}

		fakeSelect += '<div class="fake-select">';
		if( this.element.find('select').attr('disabled') ){
			fakeSelect += '<div class="option-resize disabled"><div class="bg">' + textOption + '</div></div>';
		}else{
			fakeSelect += '<div class="option-resize"><div class="bg">' + textOption + '</div><div class="option-list"></div></div>';
		}
//		fakeSelect += '<div class="option-list">';
//		fakeSelect += '</div>';
//		fakeSelect += '</div>';
		this.element.append(fakeSelect);

		this.element.find("select option").each(function(){
			/*
			 * Passes star rating data from option to custom drop select
			 * */
			$appendElement = $('<div class="select-list-item" rel="'+ $(this).val() +'">'+ $(this).text() +'</div>');
			$appendElement.attr({
				'data-rating': $(this).attr('data-rating'),
				'data-rating-max': $(this).attr('data-rating-max')
			});
			$(this).parent().parent().find('.option-list').append($appendElement);
		});

		/*ddwidth option -- Configurable*/
	//	if(this.options.ddwidth === 'auto'){
//			this.element.find('.option-list').css('width','100%');
//		}

		this._addEvents();
	},
	_addEvents: function() {
		/*Show-Hide Dropdown*/
		this.element.on("click", ".option-resize", function(event){
			var $this = $(this);

			if ( !($this.hasClass('disabled')) ){

				if ( !($this.hasClass('option-open')) ){
					$('.custom-select').find('.option-resize').removeClass('option-open scrollVisible');
					$('.custom-select').find('.option-list').hide();
					$this.addClass('option-open');
					$this.parents('.custom-select').find('.option-list').slideDown(function(){
						if($(this).get(0).scrollHeight > $(this).height()){
							$(this).addClass("scrollVisible");
						}
					});
				}else{
					$this.parents('.custom-select').find('.option-list').slideUp();
					$this.removeClass('option-open');
				}
			}
		});

		/*Select Option*/
		this.element.on('click', '.select-list-item', function(event){
			var $this = $(this),
				parent = $this.parents('.custom-select'),
				itemIndex = $this.index(),
				selectedOption = $(parent.find('select option')[itemIndex]);

			parent.find('.option-resize').addClass('option-selected').find('.bg').html($this.html());
			$this.parent().hide();
			parent.find('select option').removeAttr('selected');
			selectedOption.attr('selected', 'selected');
			parent.find('select').val(selectedOption.val()).trigger('change');
			parent.find('.option-resize').removeClass('option-open');
		});
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;
		this._update();
	},
	_update: function() {

	},
	
	updateCS: function() {
		if(this.options.helptext === true){
			textOption = this.element.find('select').data('textoption');
		}else{
			textOption = this.element.find('select option').first().text();
		}
		
		if( this.element.find('select').attr('disabled') ){
			this.element.find('.option-resize').addClass("disabled");
		}
		this.element.find('.option-resize').removeClass('option-selected');
		this.element.find('option:selected').removeAttr('selected');
		this.element.find('.option-resize .bg').html(textOption);
	},

	destroy: function() {
		this.element
			.find('select').show();

		this.element
			.find('.fake-select').remove();

		// call the base destroy function
		$.Widget.prototype.destroy.call( this );
	}
});
$(function(){
	var insidedd = false;
	
	/*Is Over Dropdown*/
	$('.custom-select').hover(function () {
		insidedd = true;
	}, function () {
		insidedd = false;
	});
	
	/*Click Outside Handler*/
	$('body').on('click', function(event){
		if (!insidedd) {
			//$('.option-list').slideUp('fast');
			$('.option-list').hide();
			$('.option-resize').removeClass('option-open');
		}
	});
});
$(window).load(function(){
	$('.option-resize .bg').each(function(){
	var checkModel = $(this).text();
	switch(checkModel)
	{
		case 'Select models':
			$(this).parent().addClass('modelSelect');
		break;
		case 'Select year':
			$(this).parent().addClass('yearSelect');
		break;
		case 'Select trim':
		$(this).parent().addClass('trimSelect');
		break;
	}
});
});