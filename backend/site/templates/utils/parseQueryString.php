<?php
function parseQueryString ($string) {
  $array = explode("=", $string);
  $queryString = [];

  $key = NULL;
  $index = 1;
  foreach ($array as $item) {
    $modulo = $index % 2;

    if ($modulo === 1) {
      $key = urldecode($item);
    } else {
      $queryString[$key] = urldecode($item);
    }

    $index ++;
  }
  
  return $queryString;
}