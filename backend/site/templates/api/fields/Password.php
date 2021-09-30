<?php
  function renderPassword ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    return $page->get($fieldName);
  }
?>