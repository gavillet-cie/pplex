<?php
  require_once "./Default.php";
  require_once "./Nested.php";
  require_once "./Image.php";
  require_once "./File.php";
  require_once "./Password.php";
  require_once "./Checkbox.php";
  require_once "./Page.php";
  require_once "./Repeater.php";
  require_once "./RepeaterMatrix.php";
  require_once "./Array.php";
  require_once "./TemplateName.php";
  require_once "./Tag.php";
  require_once "./SimpleReference.php";
  require_once "./TitleArray.php";

  function callRenderFunction ($functionName, $fieldModel, $page) {
    $functionName = function_exists($functionName)
      ? $functionName
      : "renderDefault";

    return call_user_func($functionName, $fieldModel, $page);
  }

  function renderField ($fieldType, $fieldModel, $page) {
    $functionName = "render" . $fieldType;
    $field = callRenderFunction($functionName, $fieldModel, $page);
    return $field ? $field : NULL;
  }
