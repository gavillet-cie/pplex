<?php
  function renderPage ($fieldModel, $page) {
    $nestedAPI = new APIRenderer();
    $fieldName = $fieldModel["field"];
    $model = isset($fieldModel["model"])
      ? $fieldModel["model"]
      : [];

    $field = $page->get($fieldName);
    $data = [];
    
    if ($field) {
      if (isset($field->count) && $field->count > 1) {
        foreach ($field as $reference) {
          array_push($data, $nestedAPI->renderDataFromModel($model, $reference));
        }
      } else if (!isset($field->count) && !isset($fieldModel["model"])) {
        return $field->title;
      } else if (!isset($field->count) || (isset($field->count) && $field->count === 1)) {
        $data = $nestedAPI->renderDataFromModel($model, $field);
      }
    }

    return $data;
  }
?>
