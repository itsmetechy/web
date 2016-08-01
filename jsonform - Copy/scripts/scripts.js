$(document).ready(function() {
                //start ajax request
				var formData=[];
                $.ajax({
                    url: "formdata.json",
                    //force to handle it as text
                    dataType: "text",
                    success: function(data) {						
						formData = $.parseJSON(data);    									
						$.each(formData,function()
						{							
							$('#LocationID').append("<option value="+this.ID+">" + this.DisplayValue + "</option>"); 
						}); 													
						     							  
						
                    }
                });
				$('#LocationID').change(function(){
					var optionsData='<option selected="selected" value="">Select a Program</option>';
					var hasProgram=false;
					var getValue = $(this).val();
					$.each(formData,function()
						{														
							var locationid = this.ID;							
							if(getValue == locationid){
								hasProgram =true;
								$.each(this.Curriculum,function()
								{
									optionsData +="<option>" + this.CurriculumDisplayValue + "</option>";							
								});
							}
						}); 
						
					if(hasProgram)
					{
						$("#CurriculumID").html(optionsData);
					}
							
            	});
});