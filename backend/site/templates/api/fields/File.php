<?php
  function getFileFields ($file) {
    return [
      "name" => $file->name,
      "description" => $file->description,
      "url" => $file->url,
      "extention" => $file->ext,
      "fileSize" => $file->filesize
    ];
  }

  function renderFile ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    $field = $page->get($fieldName);

    if ($field instanceof WireArray) {
      return array_map(function ($file) {
        return getFileFields($file);
      }, array_values($field->getArray()));
    } else if ($field instanceof Pagefile) {
      return getFileFields($field);
    }
  }
?>