<?php
require_once $config->paths->templates . "/utils/textFormatting.php";
require_once $config->paths->templates . "/api/fields/index.php";

class APIRenderer
{
  private function getFieldType($fieldName)
  {
    $field = wire("fields")->get($fieldName);
    $rawFieldType = isset($field)
      ? $field->type
      : "";

    return str_replace("Fieldtype", "", $rawFieldType);
  }

  private function traverseModel($rootModel, $page)
  {
    if (!$page instanceof NullPage && $page) {
      $directory = [];
      foreach ($rootModel as $label => $model) {
        if (is_array($model)) {
          $isDirectory = isset($model["directory"])
            ? isset($model["directory"])
            : false;

          if ($isDirectory) {
            $directory[$label] = $this->traverseModel($model, $page);
          } else {
            if (isset($model["computed"])) {
              $computedValue = $model["computed"];
              $directory[$label] = $computedValue;
            } else if (isset($model["field"])) {
              $fieldName = $model["field"];
              $fieldType = isset($model["type"])
                ? ucfirst(dashesToCamelCase($model["type"]))
                : $this->getFieldType($fieldName);

              $directory[$label] = renderField($fieldType, $model, $page);
            } else {
              $directory[$label] = NULL;
            }
          }
        }
      }
      return $directory;
    }

    return NULL;
  }

  public function renderDataFromModel($model, $page)
  {
    return $this->traverseModel($model, $page);
  }

  public function renderJSONFromModel($model, $page, $admin = false)
  {
    if (!$admin || ($admin && wire("user")->isLoggedin())) {
      $data = $this->renderDataFromModel($model, $page);
      echo json_encode($data);
    } else {
      echo json_encode([
        "error" => "API Error",
        "type" => "You probably need to login to see this page"
      ]);
    }
  }
}
