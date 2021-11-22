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
      "date" => ["field" => "publication_date"],
      "practiceAreas" => [
        "field" => "publication_practice_areas",
        "type" => "nested",
        "model" => [
          "title" => ["field" => "title"],
          "name" => ["field" => "name"]
        ]
      ],
      "author" => [
        "field" => "publication_author",
        "type" => "nested",
        "model" => [
          "title" => ["field" => "title"],
          "name" => ["field" => "name"],
          "firstName" => ["field" => "lawyer_first_name"],
          "lastName" => ["field" => "lawyer_last_name"],
        ],
      ],
      "file" => ["field" => "publication_file"]
    ]
  ]
], $page);
