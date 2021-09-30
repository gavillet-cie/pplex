<?php
function renderText(
  $text,
  $fileName,
  $back = "./static/fonts/TOMuteFAOutline-Back.otf",
  $front = "./static/fonts/TOMuteFAOutline-Front.otf",
  $size = 200,
  $padding = 1
){
  $maxLettersPerLines = 15;
  $words = explode(" ", $text);
  $final = "";
  
  $lineLetterCount = 0;
  foreach ($words as $word) {
    $numLetters = strlen($word);
    
    if ($lineLetterCount + $numLetters > $maxLettersPerLines) {
      $final .= "\n".$word;
      $lineLetterCount = 0;
    } else {
      $final .= " ".$word;
    }
    $lineLetterCount += $numLetters;
  }
  $width = $height = $offsetX = $offsetY = 0;
  // get the font height.
  $normalBounds = ImageTTFBBox($size, 0, $front, "W");
  $normalFontHeight = abs($normalBounds[7]-$normalBounds[1]);
  $bounds = ImageTTFBBox($size, 0, $front, "]");
  $fontHeight = abs($bounds[7]-$bounds[1]);
  $lineOffset = 30;
  $lineHeight = $fontHeight + $lineOffset;
  
  // determine bounding box.
  $lines = explode("\n", $final);
  $bounds = ImageTTFBBox($size, 0, $front, $final);
  $imageWidth = 3000;
  $imageHeight = sizeof($lines) * $lineHeight;
  $offsetY = $fontHeight;
  $offsetX = 0;
  $image = imagecreate($imageWidth, $imageHeight - $lineOffset + $padding + 10);
  $background = ImageColorAllocate($image, 0, 0, 0);
  $backColor = ImageColorAllocate($image, 255, 255, 255);
  $frontColor = ImageColorAllocate($image, 0, 0, 0);
  ImageColorTransparent($image, $background);
  ImageInterlace($image, true);
  $offsetY = 0;
  foreach ($lines as $line) {
    $bounds = ImageTTFBBox($size, 0, $front, trim($line));
    $width = abs($bounds[4]-$bounds[6]);
    $height = abs($bounds[7]-$bounds[1]);
    ImageTTFText($image, $size, 0, ($imageWidth - $width) / 2, $padding + $normalFontHeight + $offsetY, $backColor, $back, trim($line));
    ImageTTFText($image, $size, 0, ($imageWidth - $width) / 2, $padding + $normalFontHeight + $offsetY, $frontColor, $front, trim($line));
    $offsetY += $lineHeight;
  }
  imagealphablending($image, true);
  imagesavealpha($image, true);
  imagePNG($image, $fileName);
}
//======helper function==========
if(!function_exists("mb_substr_replace")){
  function mb_substr_replace($string, $replacement, $start, $length = null, $encoding = "UTF-8") {
    if (extension_loaded("mbstring") === true){
      $string_length = (is_null($encoding) === true) ? mb_strlen($string) : mb_strlen($string, $encoding);
      
      if ($start < 0) {
        $start = max(0, $string_length + $start);
      } else if ($start > $string_length) {
        $start = $string_length;
      }
      
      if ($length < 0) {
        $length = max(0, $string_length - $start + $length);
      } else if ((is_null($length) === true) || ($length > $string_length)) {
        $length = $string_length;
      }
      
      if (($start + $length) > $string_length) {
        $length = $string_length - $start;
      } 
      
      if (is_null($encoding) === true) {
        return mb_substr($string, 0, $start) . $replacement . mb_substr($string, $start + $length, $string_length - $start - $length);
      }
      return mb_substr($string, 0, $start, $encoding) . $replacement . mb_substr($string, $start + $length, $string_length - $start - $length, $encoding);
    }
    return (is_null($length) === true) ? substr_replace($string, $replacement, $start) : substr_replace($string, $replacement, $start, $length);
  }
}