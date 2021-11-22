<?php
$this->addHookAfter('Pages::saveReady', function (HookEvent $event) {
  $page = $event->arguments("page");

  $defaultName = $page->localName('default');

  if ($page->template->name != 'home') {
    wire('pages')->setOutputFormatting(false);
    foreach (wire('languages') as $lang) {
      if ($lang->isDefault()) continue;
      $page->set("name$lang", $defaultName);
    }
  }

  if ($page->template == "lawyer") {
    $page->title = $page->lawyer_first_name . ' ' . $page->lawyer_last_name;
  }

  $http = new WireHttp();
  $response = $http->get("http://reverse-proxy:8080/api/purge-cache");
  if ($response !== false) {
    $this->message("Nginx cache cleared!");
  } else {
    $this->message("HTTP request failed: " . $http->getError());
  }
});

$this->addHookBefore('Pages::moved', function () {
  $http = new WireHttp();
  $response = $http->get("http://reverse-proxy:8080/api/purge-cache");
  if ($response !== false) {
    $this->message("Nginx cache cleared!");
  } else {
    $this->message("HTTP request failed: " . $http->getError());
  }
});
