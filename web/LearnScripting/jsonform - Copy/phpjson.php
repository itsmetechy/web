<?php

// $jsonStr = 

$fptr = fopen('test.json', 'a+');

$x = fread($fptr, 10000000);

$fptr2 = fopen('test2.json', 'a+');

$x2 = fread($fptr2, 10000000);


echo '<pre>';
print_r(json_decode($x));