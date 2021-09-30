<?php
function getRows ($images) {
  $index = 0;
  $rowNum = 3;
  $rows = [];
  $row = [];
  
  foreach ($images as $image) {
    $index ++;
    array_push($row, $image->height(400)->pim2Load('grayscale')->grayscale()->pimSave()->url);  

    if ($index % $rowNum === 0) {
      array_push($rows, $row);
      $row = [];
    }
  }
  
  if (sizeof($row) > 0) {
    array_push($rows, $row);
  }

  return $rows;
}
