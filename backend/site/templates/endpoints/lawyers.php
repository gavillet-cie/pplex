<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "lawyers" => [
    "field" => "children",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "firstName" => ["field" => "lawyer_first_name"],
      "lastName" => ["field" => "lawyer_last_name"],
      "portrait" => ["field" => "lawyer_portrait"],
      "status" => ["field" => "lawyer_status"]
    ]
  ]
], $page);
