<?php
function getEvent ($name) {
  include "sanitizer.php";
  $sanitizedName = wire("sanitizer")->text($name, $textSanitizerOptions);
  return wire("pages")->get("template=event,name=".$sanitizedName);
}

function getRemainingSeats ($event) {
  $alreadyBookedSeats = 0;
  foreach ($event->booking_list as $booking) {
    $alreadyBookedSeats += floatval($booking->seat_number);
  }

  // Add a fallback in case the "seat_number" variable is not set
  $seatNumber = $event->seat_number ? $event->seat_number : 0;
  return $seatNumber - $alreadyBookedSeats;
}

function getEventPayementType ($event) {
  if ($event && !$event instanceof NullPage) {
    return ["online", "onsite", "free"][max(0, floatval($event->payement_type) - 1)];
  }

  return NULL;
}

function getEventPrices ($event) {
  if ($event && !$event instanceof NullPage) {
    return array_map(function ($price) {
      return [
        "title" => $price->title,
        "price" => $price->price
      ];
    }, $event->prices->getArray());
  }

  return NULL;
}