<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "keyWords" => ["field" => "keywords"],
  "pageDescription" => ["field" => "page_description"],
  "slides" => ["field" => "slides"],
  "description" => ["field" => "practice_areas_description"],
  "practiceAreas" => [
    "field" => "children",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "url" => ["field" => "url"],
    ]
  ]
], $page);
