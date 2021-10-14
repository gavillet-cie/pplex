<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "labels" => [
    "field" => "labels",
    "type" => "nested",
    "model" => [
      "name" => ["field" => "label_name"],
      "content" => ["field" => "label_content"]
    ]
  ]
], $page);
