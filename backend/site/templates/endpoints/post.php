<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "date" => ["field" => "post_date"],
  "author" => [
    "field" => "post_author",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "firstName" => ["field" => "lawyer_first_name"],
      "lastName" => ["field" => "lawyer_last_name"],
    ]
  ],
  "content" => ["field" => "post_content"]
], $page);
