<?php
require_once $config->paths->templates . "/api/APIRenderer.php";
require_once $config->paths->templates . '/endpoints/shared/location.php';

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "pageDescription" => ["field" => "page_description"],
  "slides" => ["field" => "slides"],
  "lawyers" => [
    "field" => "children",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "title"],
      "name" => ["field" => "name"],
      "firstName" => ["field" => "lawyer_first_name"],
      "lastName" => ["field" => "lawyer_last_name"],
      "locations" => [
        "field" => "lawyer_locations",
        "type" => "nested",
        "model" => $locationModel
      ],
      "portrait" => ["field" => "lawyer_portrait"],
      "status" => ["field" => "lawyer_status"],
      "entity" => ["field" => "lawyer_entity"],
      "lawyerTitle" => ["field" => "lawyer_title"],
      "portrait" => ["field" => "lawyer_portrait"],
      "email" => ["field" => "lawyer_email"],
      "phone" => ["field" => "lawyer_phone"],
      "fax" => ["field" => "lawyer_fax"],
      "entityAndAddress" => ["field" => "lawyer_entity_and_address"],
      "languages" => [
        "field" => "lawyer_languages",
        "type" => "title-array",
      ],
      "barAdmission" => ["field" => "lawyer_bar_admission"],
      "practiceAreas" => [
        "field" => "lawyer_practice_areas",
        "type" => "nested",
        "model" => [
          "title" => ["field" => "title"],
          "name" => ["field" => "name"],
        ]
      ],
    ]
  ]
], $page);
