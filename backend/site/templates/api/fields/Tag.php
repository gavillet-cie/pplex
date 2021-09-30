<?php
  function renderTag ($fieldModel, $page) {
    if (isset($page)) {
      return [
        "title" => $page->title,
        "slug" => $page->name
      ];
    }

    return NULL;
  }
?>