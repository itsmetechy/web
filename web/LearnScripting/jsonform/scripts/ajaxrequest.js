jQuery(document).ready(function() {
  //start ajax request
  var formId= jQuery("#formId").val();
  var formData = [];
  jQuery.ajax({
   // url: "/sites/all/themes/dci/js/formdata.txt",
	url: "formdata.txt",
    dataType: "text",
    success: function(data) {	
      var result = jQuery.parseJSON(data);
 	  formData = result[formId]==null?[]:result[formId];
	  if(formData.length > 1){
      jQuery.each(formData, function() {		
        jQuery('#LocationID').append("<option value=" + this.ID + ">" + this.DisplayValue + "</option>");		
      });
	  }else{
		 var optionsData = '<option selected="selected" value="">Select a Program</option>';
		 jQuery.each(formData[0].Curriculum, function() {
		   jQuery("#EmailSubject").val(formData[0].Subject);  
	  	  jQuery("#EmailTo").val(formData[0].emailID);
          optionsData += "<option value=" + this.CurriculumID + ">" + this.CurriculumDisplayValue + "</option>";
		});
		jQuery("#CurriculumID").html(optionsData);
	  }
	  jQuery('.spaform #CurriculumID option:eq(0)').text('Desired Service'); 
    }
  });
  // jQuery('#LocationID').append("<option>Select a Campus</option>");  

  
  
  jQuery('#LocationID').change(function() {
    var optionsData = '<option selected="selected" value="">Select a Program</option>';
    var hasProgram = false;
    var getValue = jQuery(this).val();
    jQuery.each(formData, function() {
      var locationid = this.ID;
      if (getValue == locationid) {
	  jQuery("#EmailSubject").val(this.Subject);  
	  jQuery("#EmailTo").val(this.emailID);
        hasProgram = true;
        jQuery.each(this.Curriculum, function() {
          optionsData += "<option value=" + this.CurriculumID + ">" + this.CurriculumDisplayValue + "</option>";
        });
      }
    });

    if (hasProgram) {
      jQuery("#CurriculumID").html(optionsData);
    }

  });
  
jQuery('#CurriculumID').change(function(){
jQuery('#CurriculumName').val(jQuery('#CurriculumID option:selected').text());
})
});