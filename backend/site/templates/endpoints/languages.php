<?php
  $langs = [];

  foreach($languages as $language) {
    $lang = [
      "title" => $language->title,
      "name" => $language->name,
    ];

    array_push($langs, $lang);
  }

  echo json_encode($langs);
?>