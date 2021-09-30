<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "method" => ["field" => "about_method"],
  "confidentiality" => ["field" => "about_confidentiality"],
  "clientBase" => ["field" => "about_client_base"],
  "clientService" => ["field" => "about_client_service"],
  "rankings" => ["field" => "about_rankings"],
], $page);
