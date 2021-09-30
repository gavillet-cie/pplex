<?php
function getAbsolutePath ($path) {
  return wire("input")->httpHostUrl().$path;
}
