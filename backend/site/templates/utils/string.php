<?php
function slugify($text) {
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);
  $text = str_replace('039', '', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}

function formatSup($text) {
  $formattedText = preg_replace_callback('/([0-9])ère/', function($groups) {
    return $groups[1].'<sup>ère</sup>';
  }, $text);

  $formattedText = preg_replace_callback('/([0-9])ème/', function($groups) {
    return $groups[1].'<sup>ème</sup>';
  }, $formattedText);

  $formattedText = preg_replace_callback('/([0-9])er/', function($groups) {
    return $groups[1].'<sup>er</sup>';
  }, $formattedText);

  return $formattedText;
}
?>