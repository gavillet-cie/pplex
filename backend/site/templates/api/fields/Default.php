<?php
  function renderDefault ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    return $page->get($fieldName);
  }
?>
