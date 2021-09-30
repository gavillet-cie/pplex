<?php
function getImage ($image) {
  $resizedImage = isset($image) ? $image->height(1280)->webp : NULL;

  return isset($resizedImage) ? [
    "url" => $resizedImage->url,
    "description" => $resizedImage->description,
    "width" => $resizedImage->width,
    "height" => $resizedImage->height,
  ] : NULL;
}
?>