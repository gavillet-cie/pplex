<?php
function renderNested ($fieldModel, $page) {
  $nestedAPI = new APIRenderer();
  $fieldName = $fieldModel["field"];
  $model = isset($fieldModel["model"])
    ? $fieldModel["model"] :
    [];

  $data = [];
  $field = $page->get($fieldName);
  $children = $field ? $field : [];
  
  foreach ($children as $nestedPage) {
    array_push($data, $nestedAPI->renderDataFromModel($model, $nestedPage));
  }

  return $data;
}
?>
