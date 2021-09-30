<?php
function getContact($email) {
  $sanitizedEmail = wire('sanitizer')->email($email);
  return wire('pages')->get('template=contact,email='.$sanitizedEmail);
}

function updateContact($contact, $fields) {

}

function createContactPage($fields = []) {
  $contact = new Page();
  $contact->of(false);
  $contact->template = 'contact';
  $contact->parent = wire('pages')->get('/contacts/');

  return $contact;
}

function assignContactFields ($contact, $fields = []) {
  include 'sanitizer.php';

  $field = function ($name) use ($fields) {
    return isset($fields[$name]) ? $fields[$name] : NULL;
  };

  $sanitizedFirstName = wire('sanitizer')->text(
    $field("firstName"),
    $textSanitizerOptions
  );

  $sanitizedLastName = wire('sanitizer')->text(
    $field("lastName"),
    $textSanitizerOptions
  );

  $sanitizedEmail = wire('sanitizer')->email(
    $field("email")
  );

  $contact->first_name = $sanitizedFirstName;
  $contact->last_name = $sanitizedLastName;
  $contact->email = $sanitizedEmail;
}