<?php
  function renderArray ($fieldModel, $page) {
    $fieldName = $fieldModel["field"];
    $exploded = explode(",", $page->get($fieldName));
    $formattedValues = array_map(function ($value) {
      $trimmedValue = trim($value);
      return is_numeric($trimmedValue) ? floatval($trimmedValue) : $trimmedValue;
    }, $exploded);

    return array_filter($formattedValues, function ($value) {
      return $value || $value == 0;
    });
  }
?>