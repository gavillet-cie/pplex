<?php
function getImageFields($image)
{
  $resizedImage = $image->height(1080);
  $placeholder = $resizedImage->height(30);
  $gallery = $resizedImage->height(300);

  return [
    "name" => $resizedImage->name,
    "description" => $resizedImage->description,
    "url" => $image->webp->url,
    "placeholder" => $placeholder->webp->url,
    "gallery" => $gallery->webp->url,
    "width" => $resizedImage->width,
    "height" => $resizedImage->height,
    "extention" => $resizedImage->ext,
    "fileSize" => $resizedImage->filesize,
    "focus" => $resizedImage->focus()
  ];
}

function renderImage($fieldModel, $page)
{
  $fieldName = $fieldModel["field"];
  $field = $page->get($fieldName);

  if ($field instanceof WireArray) {
    return array_map(function ($image) {
      return getImageFields($image);
    }, array_values($field->getArray()));
  } else if ($field instanceof Pageimage) {
    return getImageFields($field);
  }
}
