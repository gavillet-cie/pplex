<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "locations" => [
    "field" => "children",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "address" => ["field" => "location_address"],
      "phone" => ["field" => "location_phone"],
      "email" => ["field" => "location_email"],
      "googleMap" => ["field" => "location_google_map"]
    ]
  ]
], $page);
