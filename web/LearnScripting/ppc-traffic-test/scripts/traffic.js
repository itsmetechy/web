(function($) {


    $(document).ready(function() {

        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }

        // Checking query string for PPC
        var targetSource = getUrlParameter('SearchEngine');
        var getSession = localStorage.getItem("source");

        //Getting default values on load
        var defaultId = $('#FormID').val();
        var defaultcampaignId = $('#CampaignID').val();
        var defaultVendorId = $('#VendorID').val();
        console.log('Default formid on this page is '+defaultId);

        //Setting up global var and some values
        var extract_formId, defaultId, extract_vendorId = 38999,
            extract_campaignId = 6360;

        //Checking both scenarios, first time visitor using query string & user come back after browse through all the pages using session
        if (targetSource || getSession == 'PPC') {
            if (typeof(Storage) !== "undefined") {
                var resultJSON = '{"6368":"6966","6501":"6990","6211":"6989","6502":"6991"}';
                var result = $.parseJSON(resultJSON);
                $.each(result, function(k, v) {
                    if (k == defaultId) {
                        extract_formId = v;
                    }
                });


                //Setting up cookies
                localStorage.setItem("source", "PPC");
                localStorage.setItem("campaignId", extract_campaignId);
                localStorage.setItem("vendorId", extract_vendorId);
                localStorage.setItem("formId", extract_formId);
                //console.log('40 based on url defa' + defaultId, 'cId' + extract_campaignId, 'ven' + vendorId);
            } else {
                console.log('Oops! Something went wrong');
            }
        }


        //Getting stored cookies
        var getSession = localStorage.getItem("source");
        var campaignId = localStorage.getItem("campaignId");
        var vendorId = localStorage.getItem("vendorId");
        var formId = localStorage.getItem("formId");


        //Drive PPC values only if session as PPC
        console.log('Yes Session has  '+ getSession + '. Hence, Changing the form id to '+ formId);
        if (getSession == 'PPC') {
            $('#VendorID').val(vendorId);
            $('#CampaignID').val(campaignId);
            if (formId != 'undefined') {
                $('#FormID').val(formId);
                // console.log('69 based on form defined defa'+defaultId, 'cId'+ extract_campaignId,'ven'+ vendorId );
            } else {
                $('#FormID').val(defaultId);
                $('#CampaignID').val(defaultcampaignId);
                $('#VendorID').val(defaultVendorId);
                // console.log('72 based on form undefined defa'+defaultId, 'cId'+ extract_campaignId,'ven'+ vendorId );
            }

            //Triggering JSON values against new ID's
            var triggerData = document.createElement('script');
            triggerData.setAttribute('src', 'https://webservices.plattformad.com/cfe/JSON.ashx?JSONAction=FormProgramsExtended&formid=' + formId + '&CurriculumCategoryID=3');
            document.body.appendChild(triggerData);

            var createScript = document.createElement('script');
            createScript.setAttribute('id', 'loadScript');
            createScript.setAttribute('src', 'http://webservices.plattformad.com/cfe/scripts/JSONObjectCurriculumHandlerCID.js');
            document.body.appendChild(createScript);

            var __ProgramPleaseSelectText = "Program of Interest";
            var __LocationPleaseSelectText = "Preferred Location";
            _LocationID = null;
            ValidateScriptLoaded();

        }



        function ValidateScriptLoaded() {
            setTimeout(function() {
                if (_LocationID != null) {
                    LoadCurriculumDropdown();
                } else {
                    ValidateScriptLoaded();
                }
            }, 500);
        }

        function LoadCurriculumDropdown() {
            InitCurriculumDropDown('LocationID', 'CurriculumID');
            //Set the text that shows for the LocationID and CurriculumID select fields
            $('#LocationID option:eq(0)').text('Location of Interest');
            $('#CurriculumID option:eq(0)').text('Program of Interest');
            $('#LocationID').change(function() {
                if ($('#LocationID').val() == '') {
                    $('#CurriculumID option:eq(0)').text('Program of Interest');
                } else {
                    $('#CurriculumID option:eq(0)').text('Select a Program');
                }
            });
        }

        //InitCurriculumDropDown('LocationID','CurriculumID');            

    });
})(jQuery);