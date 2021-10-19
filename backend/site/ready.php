<?php
$this->addHookAfter('Pages::saveReady', function (HookEvent $event) {
  $page = $event->arguments("page");
  if ($page->template == "lawyer") {
    $page->title = $page->lawyer_first_name . ' ' . strtoupper($page->lawyer_last_name);
  }

  $http = new WireHttp();
  $response = $http->get("http://reverse-proxy:8080/api/purge-cache");
  if ($response !== false) {
    $this->message("Nginx cache cleared!");
  } else {
    $this->message("HTTP request failed: " . $http->getError());
  }
});
