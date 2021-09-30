<?php
  function renderRepeater ($fieldModel, $page) {
    $nestedAPI = new API();
    $fieldName = $fieldModel["field"];
    $rawModel = $fieldModel["model"];
    $model = $rawModel ? $rawModel : [];

    $data = [];
    foreach ($page->get($fieldName) as $repeater) {
      array_push($data, $repeater->title);
    }

    return $data;
  }
