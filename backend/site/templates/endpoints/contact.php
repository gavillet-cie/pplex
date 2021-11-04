<?php
require_once $config->paths->templates . "/api/APIRenderer.php";
require_once $config->paths->templates . '/endpoints/shared/location.php';

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "locations" => [
    "field" => "children",
    "type" => "nested",
    "model" => $locationModel
  ]
], $page);
