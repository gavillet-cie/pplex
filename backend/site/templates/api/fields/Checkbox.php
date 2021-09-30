<?php
  function renderCheckbox ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    return $page->get($fieldName) ? true : false;
  }
?>