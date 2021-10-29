<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "firstName" => ["field" => "lawyer_first_name"],
  "lastName" => ["field" => "lawyer_last_name"],
  "lawyerTitle" => ["field" => "lawyer_title"],
  "portrait" => ["field" => "lawyer_portrait"],
  "landscapePortrait" => ["field" => "lawyer_landscape_portrait"],
  "email" => ["field" => "lawyer_email"],
  "phone" => ["field" => "lawyer_phone"],
  "fax" => ["field" => "lawyer_fax"],
  "entityAndAddress" => ["field" => "lawyer_entity_and_address"],
  "status" => ["field" => "lawyer_status"],
  "location" => [
    "field" => "lawyer_location",
    "type" => "simple-reference"
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
