<?php
require_once $config->paths->templates . "/api/APIRenderer.php";
require_once $config->paths->templates . '/endpoints/shared/location.php';

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "pageDescription" => ["field" => "page_description"],
  "keyWords" => ["field" => "keywords"],
  "slides" => ["field" => "slides"],
  "locations" => [
    "field" => "children",
    "type" => "nested",
    "model" => $locationModel
  ]
], $page);
