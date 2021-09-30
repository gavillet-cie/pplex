<?php
function getFileContent($path) {
  $file = fopen($path, "r") or die("Unable to open file!");
  $content = fread($file, filesize($path));
  fclose($file);
  return $content;
}
?>
