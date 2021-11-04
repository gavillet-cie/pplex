<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "address" => ["field" => "locationt_address"],
  "phone" => ["field" => "locationt_phone"],
  "email" => ["field" => "locationt_email"],
  "googleMap" => ["field" => "locationt_google_map"]
], $page);
