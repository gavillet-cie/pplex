<?php
require_once "./rest.php";
$statuscode = 200;
$header = Rest\Header::mimeType('json');
http_response_code($statuscode);
header($header);