<?php
  require_once $config->paths->templates.'/api/rest.php';

  $JSONheader = Rest\Header::mimeType('json');
  header($JSONheader);
  header('Strict-Transport-Security: max-age=0;', true);
  header('Access-Control-Allow-Origin: *', true);
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS', true);
  header('Access-Control-Allow-Headers: Content-Type', true);
  header_remove('Pragma');
  header_remove('pragma');
  header_remove('cache-control');
  header_remove('Cache-Control');
