<?php
$this->addHookAfter('Pages::saveReady', function (HookEvent $event) {
  $page = $event->arguments("page");
  if ($page->template == "lawyer") {
    $page->title = $page->lawyer_first_name . ' ' . strtoupper($page->lawyer_last_name);
  }
});
