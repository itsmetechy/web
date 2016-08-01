<?php

	$to_email = $_REQUEST['email'];
	$to_email = "sivashankar.kuppusamy@qfor.com";
	if ($to_email != "") {
		$msg = "First line of text\nSecond line of text";
		echo "bbb---".mail($to_email,"Request Info",$msg);
	}

?>