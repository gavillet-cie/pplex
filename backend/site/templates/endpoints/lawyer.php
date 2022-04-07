<?php
require_once $config->paths->templates . "/api/APIRenderer.php";
require_once $config->paths->templates . '/endpoints/shared/location.php';

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "keyWords" => ["field" => "keywords"],
  "firstName" => ["field" => "lawyer_first_name"],
  "lastName" => ["field" => "lawyer_last_name"],
  "lawyerTitle" => ["field" => "lawyer_title"],
  "portrait" => ["field" => "lawyer_portrait"],
  "slides" => ["field" => "lawyer_slides"],
  "email" => ["field" => "lawyer_email"],
  "phone" => ["field" => "lawyer_phone"],
  "fax" => ["field" => "lawyer_fax"],
  "status" => ["field" => "lawyer_status"],
  "entity" => ["field" => "lawyer_entity"],
  "locations" => [
    "field" => "lawyer_locations",
    "type" => "nested",
    "model" => $locationModel
  ],
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
  "description" => ["field" => "lawyer_description"],
  "education" => [
    "field" => "lawyer_education",
    "type" => "title-array",
  ],
  "memberships" => [
    "field" => "lawyer_memberships",
    "type" => "title-array",
  ],
  "positionsHeld" => [
    "field" => "lawyer_positions_held",
    "type" => "title-array",
  ],
  "rankings" => [
    "field" => "lawyer_rankings",
    "type" => "nested",
    "model" => [
      "year" => ["field" => "lawyer_ranking_year"],
      "images" => ["field" => "lawyer_ranking_images"]
    ]
  ],
  "selectedPublications" => [
    "field" => "lawyer_selected_publications",
    "type" => "title-array",
  ],
  "speeches" => [
    "field" => "lawyer_speeches",
    "type" => "title-array",
  ],
  "cases" => [
    "field" => "lawyer_cases",
    "type" => "title-array",
  ],
  "testimonials" => [
    "field" => "lawyer_testimonials",
    "type" => "title-array",
  ]
], $page);
