<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "homeSlider" => [
    "field" => "home_slider",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "home_title"],
      "image" => ["field" => "home_image"]
    ]
  ]
], $page);
