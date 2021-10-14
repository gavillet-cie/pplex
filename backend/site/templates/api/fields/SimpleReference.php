<?php
  function renderSimpleReference ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    $field = $page->get($fieldName);

    if (isset($field) && isset($field->title)) {
      return [
        "title" => $field->title,
        "name" => $field->name
      ];
    }

    return NULL;
  }
