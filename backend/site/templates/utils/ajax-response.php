<?php
function sendAjaxResponse ($type, $data) {
  echo json_encode(getAjaxResponse($type, $data));
}

function getAjaxResponse ($type, $data) {
  return [
    "type" => $type,
    "data" => $data
  ];
}