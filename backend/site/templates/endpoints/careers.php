<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "slides" => ["field" => "slides"],
  "description" => ["field" => "career_description"],
  "currentVacancies" => [
    "field" => "career_current_vacancies",
    "type" => "nested",
    "model" => [
      "title" => ["field" => "career_vacancy_title"],
      "description" => ["field" => "career_vacancy_description"]
    ]
  ]
], $page);
