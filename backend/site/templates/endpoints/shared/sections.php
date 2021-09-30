<?php
require_once $config->paths->templates."/endpoints/shared/utils.php";
require_once $config->paths->templates."/api/APIRenderer.php";

function getSections($sections) {
  $temp = array_map(function ($section) {
    switch($section->type) {
      case 'text':
      case 'heading':
        return [
          "type" => $section->type,
          "text" => $section->text
        ];

      case 'image':
        return [
          "type" => $section->type,
          "image" => getImage($section->image)
        ];

      case 'grid':
        return [
          "type" => $section->type,
          "images" => array_map(function ($image) {
            return [
              "image" => getImage($image->image),
              "reference" => !$image->project_reference instanceof NullPage ? [
                "title" => $image->project_reference->title,
                "name" => $image->project_reference->name
              ] : NULL,
              "width" => $image->width,
              "height" => $image->height,
              "left" => $image->left
            ];
          }, $section->grid->getArray())
        ];

      case 'gallery':
        return [
          "type" => $section->type,
          "images" => array_map(function ($image) {
            return [
              "image" => getImage($image->image),
              "reference" => !$image->project_reference instanceof NullPage ? [
                "title" => $image->project_reference->title,
                "name" => $image->project_reference->name
              ] : NULL,
            ];
          }, $section->gallery->getArray())
        ];
      
      default:
        return [
          "type" => $section->type
        ];
    };
  }, $sections->getArray());

  return array_column($temp, null);
}