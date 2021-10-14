<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "file" => ["field" => "publication_file"],
  "date" => ["field" => "publication_date"],
  "practiceArea" => [
    "field" => "publication_practice_area",
    "type" => "simple-reference"
  ],
  "author" => [
    "field" => "publication_author",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "firstName" => ["field" => "lawyer_first_name"],
      "lastName" => ["field" => "lawyer_last_name"],
    ]
  ]
], $page);
