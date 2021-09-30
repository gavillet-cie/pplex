<?php
function renderTitleArray($fieldModel, $page)
{
  $fieldName = $fieldModel["field"];

  $data = [];
  foreach ($page->get($fieldName) as $repeater) {
    array_push($data, $repeater->get($repeater->fields->first->name));
  }

  return $data;
}
