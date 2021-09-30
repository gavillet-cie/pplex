<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "locations" => [
    "field" => "contact_locations",
    "type" => "nested",
    "model" => [
      "location" => ["field" => "contact_location"],
      "address" => ["field" => "contact_address"],
      "phone" => ["field" => "contact_phone"],
      "email" => ["field" => "contact_email_address"],
      "googleMap" => ["field" => "contact_google_map"]
    ]
  ]
], $page);
