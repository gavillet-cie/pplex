<?php
function clamp($number, $minValue, $maxValue) {
  return max($minValue, min($maxValue, $number)); 
}