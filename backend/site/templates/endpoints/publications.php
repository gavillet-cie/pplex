<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "publications" => [
    "field" => "children",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "url" => ["field" => "url"],
    ]
  ]
], $page);
