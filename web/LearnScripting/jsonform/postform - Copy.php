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
//$from = urldecode($_REQUEST["EmailFrom"]);
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
//$headers .= 'From: ' . 	$from . "\r\n";
$headers .= 'Cc: ' . 	$cc . "\r\n";
$headers .= 'Bcc: ' . 	$bcc . "\r\n";


$headers_res  = 'MIME-Version: 1.0' . "\r\n";
$headers_res .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";



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
