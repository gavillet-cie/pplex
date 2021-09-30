<?php
function getBooking ($event, $contact) {
  $query = 'parent=/reservations/,template=reservation,booking_event='.$event.',booking_contact='.$contact;
  return wire('pages')->get($query);
}

function createBookingPage () {
  $booking = new Page();
  $booking->of(false);
  $booking->template = 'reservation';
  $booking->parent = wire('pages')->get('/reservations/');
  
  return $booking;
}

function assignBookingFields ($booking, $fields = []) {
  $booking->booking_event = $fields["event"];
  $booking->booking_contact = $fields["contact"];
  $booking->seat_number = $fields["seats"];
}