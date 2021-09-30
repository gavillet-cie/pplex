<?php
  $templateName = $page->template->name;
  $fileName = $config->paths->templates.'endpoints/'.$templateName.'.php';
  if (file_exists($fileName)) {
    include_once $config->paths->templates.'headers/success.php';
    include_once $fileName;
  } else {
    include_once $config->paths->templates.'headers/error.php';
    include_once $config->paths->templates.'404.php';
  }
?>