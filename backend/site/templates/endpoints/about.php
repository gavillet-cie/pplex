<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "description" => ["field" => "about_description"],
  "swisslex" => ["field" => "about_swisslex"],
  "rankings" => [
    "field" => "about_rankings",
    "type" => "nested",
    "model" => [
      "year" => ["field" => "about_ranking_year"],
      "images" => ["field" => "about_ranking_images"]
    ]
  ],
  "keywords" => [
    "field" => "about_keywords",
    "type" => "title-array",
  ],
  "sections" => [
    "field" => "about_sections",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "about_section_title"],
      "description" => ["field" => "about_section_description"]
    ]
  ],
], $page);
