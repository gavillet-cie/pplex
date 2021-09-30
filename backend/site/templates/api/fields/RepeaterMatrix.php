<?php
  function renderRepeaterMatrix ($fieldModel, $page) {
    $nestedAPI = new API();
    $fieldName = $fieldModel["field"];
    $rawModels = $fieldModel["model"];
    $models = $rawModels ? $rawModels : [];

    $data = [];
    foreach ($page->get($fieldName) as $repeater) {
      $repeaterType = $repeater->type;
      $model = $models[$repeaterType] ? $models[$repeaterType] : [];

      array_push($data, $nestedAPI->renderDataFromModel($model, $repeater));
    }

    return $data;
  }
?>
