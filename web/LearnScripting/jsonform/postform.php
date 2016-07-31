<?php
/*
PRODUCT IS SOLD AS IS
NO SUPPORT PROVIDED AFTER SETUP
*/

//Requires PHP 4 or 5
//http://php.net/

//To send to multiple recepients separate by using ", ".
//Example: <input type="hidden" name="EmailTo" value="Test1@Example.com, Test2@Example.com"/>

//It is your responsibility to use a proper From address in the email. Do not use domains other than your own.

//Attempting to stop any PHP injection to protect server security.

$response_template = <<<RESPONCE
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Dawn Career Institute</title>
</head>

<body style="background-color:#ffffff; font: 13px/1 Arial, Helvetica, sans-serif; color:#fff;">
<table width="560" border="0" cellspacing="0" cellpadding="0" style="background-color:#fff;">
  <tr>
   <td colspan="2" align="left" valign="top"><a href="http://www.dawncareerinstitute.edu" target="_blank" style="padding:0px; margin:0px; border:none; text-decoration:none;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/header.jpg" alt="Dawn Career Institute" height="182" width="560" align="top" border="0" /></a></td>
  </tr>
  <tr>
    <td colspan="2" align="left" valign="top"><img src="http://www.dawncareerinstitute.edu/autorespond-email/thank-you-heading.jpg" alt="Thank You for Contacting Us!" border="0" height="68" width="560" /></td>
  </tr>
  <tr style="background:#B95926">
    <td align="left" valign="top" width="414">
     <p style="padding:0px 0px 6px 32px; font-family:arial; font-size:13px; font-weight:normal; color:#fff; line-height:18px; margin: 3px 0 6px;"><br />Since 1976, we’ve been dedicated to changing the lives of people just like you in our local community and across the United States through our online programs.</p>
      <p style="padding:0px 0px 6px 32px; font-family:arial; font-size:13px; font-weight:normal; color:#fff; line-height:18px; margin: 3px 0 6px;"><br />We’re currently reviewing your message and will reach out to you soon. In the meantime, feel free to join our online community and hear what others have to say about us.  Have questions? Give us a call at the number below!</p>
      <p style="padding:0px 0px 6px 32px; font-family:arial; font-size:13px; font-weight:normal; color:#fff; line-height:18px; margin: 3px 0 6px;"><br />We look forward to adding you to our list of successful graduates!</p>        
    </td>
    <td align="left" valign="top" width="246">
     <img src="http://www.dawncareerinstitute.edu/autorespond-email/two-DCI-graduates.jpg" height="254" width="246" alt="Two DCI Graduates"/>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="left" valign="top"><img src="http://www.dawncareerinstitute.edu/autorespond-email/sincerely.jpg" alt="Sincerely, Jena Zapata Antonini & Cheryl R. A. Zapata" border="0" height="148" width="560" /></td>
  </tr>
  <tr>
    <td colspan="2">
      <a href="tel:1-888-992-2681" style="padding:0px; margin:0px; border:none; text-decoration:none;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/call-us-today.jpg" alt="Call Us Today! 1-888-992-2681" border="0" height="122" width="302" align="top" style="padding:0px; margin:0px; border:none; text-decoration:none; float:left;"/></a>
      <a href="https://www.facebook.com/DCIedu" target="_blank" style="padding:0px; margin:0px; border:none; text-decoration:none;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/facebook.jpg" alt="DCI Facebook" border="0" height="122" width="67" align="top" style="padding:0px; margin:0px; border:none; text-decoration:none; float:left;"/></a>
      <a href="https://twitter.com/#!/DCIedu" target="_blank" style="padding:0px; margin:0px; border:none; text-decoration:none;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/twitter.jpg" alt="DCI Twitter" border="0" height="122" width="47" align="top" style="padding:0px; margin:0px; border:none; text-decoration:none; float:left;"/></a>
      <a href="http://pinterest.com/dciedu/" target="_blank" style="padding:0px; margin:0px; border:none; text-decoration:none; float:left;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/pinterest.jpg" alt="DCI Pinterest" border="0" height="122" width="47" align="top" style="padding:0px; margin:0px; border:none; text-decoration:none; float:left;"/></a>
      <a href="http://www.youtube.com/user/DawnCareerInstitute" target="_blank" style="padding:0px; margin:0px; border:none; text-decoration:none;"><img src="http://www.dawncareerinstitute.edu/autorespond-email/youtube.jpg" alt="DCI YouTube" border="0" height="122" width="97" align="top" style="padding:0px; margin:0px; border:none; text-decoration:none;"/></a>
   </td>
  </tr>
</table>

</body>
</html>
RESPONCE;

$client_template = <<<MESSAGE
        <html>
        <h1>Email Responce</h1>
        <p>test</p>
		<tr>
		<td></td>
		<td></td>
		</tr>
        </html>
MESSAGE;

//$_POST = str_replace(";", "", $_POST);

$to = urldecode($_REQUEST["EmailTo"]);
$from = "Leads@Dawncareerinstitute.edu";
$response_mail = urldecode($_REQUEST["email"]);
$subject = urldecode($_REQUEST["EmailSubject"]);
$cc = urldecode($_REQUEST["EmailCC"]);
$bcc = urldecode($_REQUEST["EmailBCC"]);

$message = '<html><table>';


foreach($_REQUEST as $key => $value) 
{
	if($key != 'EmailTo' && 
		$key != 'EmailFrom' &&  
		$key != 'EmailSubject' &&  
		$key != 'EmailCC' &&  
		$key != 'EmailBCC' &&  
		$key != 'submit' &&  
		$key != 'prompted' &&
		$key != 'returntourl')
	{
		$message .= "<tr><td>".$key . ' = ' . urldecode($value) . '</td></tr>';
	}
}

$message .= "</table></html>";
//echo '<table>';
//foreach($_REQUEST as $key => $value) 
//{
//	if($key != 'EmailTo' && 
//		$key != 'EmailFrom' &&  
//		$key != 'EmailSubject' &&  
//		$key != 'EmailCC' &&  
//		$key != 'EmailBCC' &&  
//		$key != 'submit' &&  
//		$key != 'returntourl')
//	{
//            echo '<tr>';
//            echo "<td>$key</td>";
//            echo "<td>urldecode($value)</td>";
//            echo '</tr>';
//	}
//}
//echo '<table>';

//Uncomment these for testing purposes.
/*
echo $to . '<br />';
echo $from . '<br />';
echo $subject . '<br />';
echo $cc . '<br />';
echo $bcc . '<br />';
echo $message;
*/

// Set Content Type and additional headers
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: ' . 	$from . "\r\n";
$headers .= 'Cc: ' . 	$cc . "\r\n";
$headers .= 'Bcc: ' . 	$bcc . "\r\n";


$headers_res  = 'MIME-Version: 1.0' . "\r\n";
$headers_res .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

//XML Post Delivery

	$postUrl = 'https://www1.esmdataview.com/leadsservice/leadsservice.asmx';

    //Sample Input
    $ClientID = 12345;
    //Sample Input END
 
 
    
    //Create a DOM
    $domtree = new DOMDocument('1.0', 'UTF-8');

    //generate tags
	$UploadLeads = $domtree->createElement("UploadLeads");
    $UploadLeads = $domtree->appendChild($UploadLeads);
	
	$sleadsDocument = $domtree->createElement("sleadsDocument");
    $sleadsDocument = $UploadLeads->appendChild($sleadsDocument);
	
	
    $leadsDocument = $domtree->createElement("leadsDocument");
    $leadsDocument = $sleadsDocument->appendChild($leadsDocument);
    
    $campaignName = $domtree->createElement('campaignName');
    $campaignName->nodeValue = 'SpeedToLead'; //$campaignName from data comes here
    $campaignName = $leadsDocument->appendChild($campaignName);

    $leads = $leadsDocument->appendChild($domtree->createElement('leads'));
    $lead = $leads->appendChild($domtree->createElement('lead'));
    
	$ClientID = $domtree->createElement("ClientID");
    $ClientID->nodeValue = '10153';
    $ClientID = $lead->appendChild($ClientID);
	
	$ESM_CorporateName = $domtree->createElement("ESM_CorporateName");
    $ESM_CorporateName->nodeValue = 'Dawn Career Institute Outbound';
    $ESM_CorporateName = $lead->appendChild($ESM_CorporateName);
	
	$CampusNum = $domtree->createElement("CampusNum");
    $CampusNum->nodeValue = "";
    if($_REQUEST['LocationID']=='1687') { $CampusNum->nodeValue = '0001'; } elseif($_REQUEST['LocationID']=='32802') { $CampusNum->nodeValue = '0002'; };
    $CampusNum = $lead->appendChild($CampusNum);
	
	$CampusName = $domtree->createElement("CampusName");
    $CampusName->nodeValue = 'On Campus or Blended';
    $CampusName = $lead->appendChild($CampusName);
	
	$Client_I3_Rowid = $domtree->createElement("Client_I3_Rowid");
    $Client_I3_Rowid->nodeValue = $_REQUEST[''];
    $Client_I3_Rowid = $lead->appendChild($Client_I3_Rowid);
	
	$Phonenumber = $domtree->createElement("Phonenumber");
    $Phonenumber->nodeValue = $_REQUEST['dayphone'];
    $Phonenumber = $lead->appendChild($Phonenumber);
	
	$Phonenumber_2 = $domtree->createElement("ESM_Phonenumber2");
    $Phonenumber_2->nodeValue = $_REQUEST[''];
    $Phonenumber_2 = $lead->appendChild($Phonenumber);
	
	$Phonenumber_3 = $domtree->createElement("ESM_Phonenumber3");
    $Phonenumber_3->nodeValue = $_REQUEST[''];
    $Phonenumber_3 = $lead->appendChild($Phonenumber);

	$Phonenumber_4 = $domtree->createElement("ESM_Phonenumber3");
    $Phonenumber_4->nodeValue = $_REQUEST[''];
    $Phonenumber_4 = $lead->appendChild($Phonenumber);		
	
	$ESM_Address = $domtree->createElement("ESM_Address");
    $ESM_Address->nodeValue = $_REQUEST['address'];
    $ESM_Address = $lead->appendChild($ESM_Address);	
	
	$Address2 = $domtree->createElement("Address2");
    $Address2->nodeValue = $_REQUEST[''];
    $Address2 = $lead->appendChild($Address2);	

	$ESM_City = $domtree->createElement("ESM_City");
    $ESM_City->nodeValue = $_REQUEST['city'];
    $ESM_City = $lead->appendChild($ESM_City);	
	
	$ESM_State = $domtree->createElement("ESM_State");
    $ESM_State->nodeValue = $_REQUEST['state'];
    $ESM_State = $lead->appendChild($ESM_State);
	
	$ESM_Zip = $domtree->createElement("ESM_Zip");
    $ESM_Zip->nodeValue = $_REQUEST['zip'];
    $ESM_Zip = $lead->appendChild($ESM_Zip);	

	$ESM_Country = $domtree->createElement("ESM_Country");
    $ESM_Country->nodeValue = $_REQUEST['country'];
    $ESM_Country = $lead->appendChild($ESM_Country);	

	$ESM_Email = $domtree->createElement("ESM_Email");
    $ESM_Email->nodeValue = $_REQUEST['email'];
    $ESM_Email = $lead->appendChild($ESM_Email);	

	$CompanyName = $domtree->createElement("CompanyName");
    $CompanyName->nodeValue = $_REQUEST[''];
    $CompanyName = $lead->appendChild($CompanyName);	

	$ESM_ProgramofInterest = $domtree->createElement("ESM_ProgramofInterest");
    $ESM_ProgramofInterest->nodeValue = $_REQUEST['CurriculumName'];
    $ESM_ProgramofInterest = $lead->appendChild($ESM_ProgramofInterest);	

	$ESM_FirstName = $domtree->createElement("ESM_FirstName");
    $ESM_FirstName->nodeValue = $_REQUEST['firstname'];
    $ESM_FirstName = $lead->appendChild($ESM_FirstName);	

	$ESM_LastName = $domtree->createElement("ESM_LastName");
    $ESM_LastName->nodeValue = $_REQUEST['lastname'];
    $ESM_LastName = $lead->appendChild($ESM_LastName);	

	$ESM_LeadInquiryDate = $domtree->createElement("ESM_LeadInquiryDate");
    $ESM_LeadInquiryDate->nodeValue = date('m-d-Y h:m');
    $ESM_LeadInquiryDate = $lead->appendChild($ESM_LeadInquiryDate);	

	$ESM_MarketingVendor = $domtree->createElement("ESM_MarketingVendor");
    $ESM_MarketingVendor->nodeValue = $_REQUEST[''];
    $ESM_MarketingVendor = $lead->appendChild($ESM_MarketingVendor);	
	
	$ESM_Title = $domtree->createElement("ESM_Title");
    $ESM_Title->nodeValue = $_REQUEST[''];
    $ESM_Title = $lead->appendChild($ESM_Title);	

	$ESM_ChildFirstName = $domtree->createElement("ESM_ChildFirstName");
    $ESM_ChildFirstName->nodeValue = $_REQUEST[''];
    $ESM_ChildFirstName = $lead->appendChild($ESM_ChildFirstName);	

	$ESM_ChildLastName = $domtree->createElement("ESM_ChildLastName");
    $ESM_ChildLastName->nodeValue = $_REQUEST[''];
    $ESM_ChildLastName = $lead->appendChild($ESM_ChildLastName);	

	$ESM_ImportMethod = $domtree->createElement("ESM_ImportMethod");
    $ESM_ImportMethod->nodeValue = $_REQUEST[''];
    $ESM_ImportMethod = $lead->appendChild($ESM_ImportMethod);	

	$ESM_ImportSource = $domtree->createElement("ESM_ImportSource");
    $ESM_ImportSource->nodeValue = 'Plattform';
    $ESM_ImportSource = $lead->appendChild($ESM_ImportSource);	

	$ESM_FollowUpReason = $domtree->createElement("ESM_FollowUpReason");
    $ESM_FollowUpReason->nodeValue = $_REQUEST[''];
    $ESM_FollowUpReason = $lead->appendChild($ESM_FollowUpReason);	

	$ESM_FollowUpAgent = $domtree->createElement("ESM_FollowUpAgent");
    $ESM_FollowUpAgent->nodeValue = $_REQUEST[''];
    $ESM_FollowUpAgent = $lead->appendChild($ESM_FollowUpAgent);	

	$ESM_FollowUpDate = $domtree->createElement("ESM_FollowUpDate");
    $ESM_FollowUpDate->nodeValue = $_REQUEST[''];
    $ESM_FollowUpDate = $lead->appendChild($ESM_FollowUpDate);	

	$ESM_TextOptIn = $domtree->createElement("ESM_TextOptIn");
    $ESM_TextOptIn->nodeValue = $_REQUEST[''];
    $ESM_TextOptIn = $lead->appendChild($ESM_TextOptIn);

	$ESM_URLParameters1 = $domtree->createElement("ESM_URLParameters1");
    $ESM_URLParameters1->nodeValue = $_REQUEST[''];
    $ESM_URLParameters1 = $lead->appendChild($ESM_URLParameters1);

	$ESM_URLParameters2 = $domtree->createElement("ESM_URLParameters2");
    $ESM_URLParameters2->nodeValue = $_REQUEST[''];
    $ESM_URLParameters2 = $lead->appendChild($ESM_URLParameters2);

	$ESM_URLParameters3 = $domtree->createElement("ESM_URLParameters3");
    $ESM_URLParameters3->nodeValue = $_REQUEST[''];
    $ESM_URLParameters3 = $lead->appendChild($ESM_URLParameters3);	

	$ESM_Master_ClientID = $domtree->createElement("ESM_Master_ClientID");
    $ESM_Master_ClientID->nodeValue = $_REQUEST['21212'];
    $ESM_Master_ClientID = $lead->appendChild($ESM_Master_ClientID);	

	$ESM_Phonenumber_EWC = $domtree->createElement("ESM_Phonenumber_EWC");
    $ESM_Phonenumber_EWC->nodeValue = $_REQUEST['1'];
    $ESM_Phonenumber_EWC = $lead->appendChild($ESM_Phonenumber_EWC);	
	
	$ESM_Phonenumber_EWC_Date = $domtree->createElement("ESM_Phonenumber_EWC_Date");
    $ESM_Phonenumber_EWC_Date->nodeValue = date('m-d-Y h:m');
    $ESM_Phonenumber_EWC_Date = $lead->appendChild($ESM_Phonenumber_EWC_Date);	

	$ESM_Phonenumber_Mobile = $domtree->createElement("ESM_Phonenumber_Mobile");
    $ESM_Phonenumber_Mobile->nodeValue = $_REQUEST['0'];
    $ESM_Phonenumber_Mobile = $lead->appendChild($ESM_Phonenumber_Mobile);	

	$ESM_Phonenumber_SMSOptin = $domtree->createElement("ESM_Phonenumber_SMSOptin");
    $ESM_Phonenumber_SMSOptin->nodeValue = $_REQUEST['1'];
    $ESM_Phonenumber_SMSOptin = $lead->appendChild($ESM_Phonenumber_SMSOptin);	

	$ESM_Phonenumber2_EWC = $domtree->createElement("ESM_Phonenumber2_EWC");
    $ESM_Phonenumber2_EWC->nodeValue = $_REQUEST['1'];
    $ESM_Phonenumber2_EWC = $lead->appendChild($ESM_Phonenumber2_EWC);	

	$ESM_Phonenumber2_EWC_Date = $domtree->createElement("ESM_Phonenumber2_EWC_Date");
    $ESM_Phonenumber2_EWC_Date->nodeValue = date('m-d-Y h:m');
    $ESM_Phonenumber2_EWC_Date = $lead->appendChild($ESM_Phonenumber2_EWC_Date);	

	$ESM_Phonenumber2_Mobile = $domtree->createElement("ESM_Phonenumber2_Mobile");
    $ESM_Phonenumber2_Mobile->nodeValue = $_REQUEST['0'];
    $ESM_Phonenumber2_Mobile = $lead->appendChild($ESM_Phonenumber2_Mobile);	
	
	$ESM_Phonenumber2_SMSOptin = $domtree->createElement("ESM_Phonenumber2_SMSOptin");
    $ESM_Phonenumber2_SMSOptin->nodeValue = $_REQUEST['1'];
    $ESM_Phonenumber2_SMSOptin = $lead->appendChild($ESM_Phonenumber2_SMSOptin);	

	

	
	
    /*
     * The session below is for child elements on lead
     * Data could be from form or or static
     * Please use like $_REQUEST["EmailTo"] where  EmailTo is form input name
     */
/*    
    if ($ClientID){
        $clientId = $domtree->createElement('ClientID');
        $clientId->nodeValue = $ClientID;
        $lead->appendChild($clientId);
    }
*/
/*
foreach($_REQUEST as $key => $value) 
{
	if($key != 'EmailTo' && 
		$key != 'EmailFrom' &&  
		$key != 'EmailSubject' &&  
		$key != 'EmailCC' &&  
		$key != 'EmailBCC' &&  
		$key != 'submit' &&  
		$key != 'returntourl')
	{
		//$message .= "<tr><td>".$key . ' = ' . urldecode($value) . '</td></tr>';
        $clientId = $domtree->createElement($key);
        $clientId->nodeValue = urldecode($value);
        $lead->appendChild($clientId);
	}
}
*/
$header_curl = array(
        "Content-Type: text/xml",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
        "SOAPAction: \"http://education-sales.net/UploadLeads\"",
        "Content-length: ".strlen($sPostfields),
);

    //save as XML document
    $document = $domtree->saveXML();   
    
    //CURL operations to post data to URL
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, $postUrl);
    curl_setopt($ch,CURLOPT_POST, count($document));
    curl_setopt($ch,CURLOPT_POSTFIELDS, $document);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header_curl);
    $result = curl_exec($ch);
    curl_close($ch);

	echo "<pre/>";print_r($document); exit;   // Print to check


//Star Post Delivery

$postUrl = 'https://stars.trainingmasters.com:81/INBLEADS.pgm';

$getCurriculamValue = array('11495'=>'100000000001','566007'=>'100000000001','563967'=>'100000000001','566105'=>'10000000001','566713'=>'100000000001','11491'=>'100000000001','334178'=>'100000000001','566008'=>'100000000002','11494'=>'100000000000','401240'=>'100000000001','401254'=>'100000000003', '568645'=>'100000000005', '401255'=>'100000000004');

$postValues = array(
'task'=>'endadd',
'SelComp'=>'DTCI',
'SelResponse'=>'P',
'ReturnURL'=>'',
'BNJJTX'=>$_REQUEST['firstname'],
'BNJKTX'=>'',
'BNJITX'=>$_REQUEST['lastname'],
'BNQ0NB'=>$_REQUEST['dayphone'],
'BNJLTX'=>$_REQUEST['address'],
'BNJMTX'=>'',
'BNJNTX'=>$_REQUEST['city'],
'BNC0CD'=>$_REQUEST['state'],
'BNC1CD'=>$_REQUEST['zip'],
'BNQ6NB'=>$getCurriculamValue[$_REQUEST['CurriculumID']],
'BNC2CD'=>'',//$_REQUEST['DeliverCode']
'BNHXCD'=>'', //$_REQUEST['CampaignId'],
'LM5EM1'=>$_REQUEST['email'],
'LMBEST'=>'Yes',
'ESMPOST'=>'N',
'BNJOTX'=>'',
'PLATAFFL'=>''
);
echo "<pre/>";print_r($postValues); exit;

    //CURL operations to post data to URL
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL, $postUrl);
    curl_setopt($ch,CURLOPT_POST, count($postValues));
    curl_setopt($ch,CURLOPT_POSTFIELDS, $postValues);
    $result = curl_exec($ch);
    curl_close($ch);

// Send Mail
$mailresponse = mail($to, $subject, $message, $headers);

//send responce
$subject = "dawn";
$sendResponce = mail($response_mail, $subject, $response_template, $headers_res);




if($mailresponse == 0)
	echo 'Send Mail encountered an error.';
else 
	echo 'Mail Sent Successfully';

header( 'Location: ' . urldecode($_REQUEST["returntourl"]) ) ;

?>
