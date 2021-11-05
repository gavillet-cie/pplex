<?php
require_once $config->paths->templates . "/api/APIRenderer.php";

$apiRenderer = new APIRenderer();
echo $apiRenderer->renderJSONFromModel([
  "title" => ["field" => "title"],
  "name" => ["field" => "name"],
  "url" => ["field" => "url"],
  "slides" => ["field" => "slides"],
  "description" => ["field" => "practice_area_description"],
  "lawyerSubTitle" => ["field" => "practice_area_lawyer_sub_title"]
], $page);
