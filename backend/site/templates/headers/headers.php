<?php
require_once $config->paths->templates . '/api/rest.php';

$JSONheader = Rest\Header::mimeType('json');
header($JSONheader);
header('Strict-Transport-Security: max-age=0;', true);
header('Access-Control-Allow-Origin: *', true);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET', true);
header('Access-Control-Allow-Headers: Content-Type', true);
header_remove('Pragma');
header_remove('pragma');
header_remove('cache-control');
header_remove('Cache-Control');
header_remove('Set-Cookie');
header_remove('set-cookie');
header_remove('Strict-Transport-Security');
header_remove('strict-transport-security');
header_remove('Expires');
header_remove('expires');
