<?php
include_once "./textFormatting.php";

function getAPIFormattedURL ($rawUrl) {
  $root = false;
  $segments = []; 
  $url = strReplaceFirst(wire("pages")->get("/")->url, "", $rawUrl);
  $rawSegments = explode("/", $url);

  for ($i = 0; $i < sizeof($rawSegments); $i++) {
    $segment = $rawSegments[$i];

    if ($root) {
      array_push($segments, $segment);
    }

    if ($segment === "api") {
      $root = true;
    }
  }

  return join("/", $segments);
}