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

$this->addHookBefore('ProcessPageEdit::buildFormView', function (HookEvent $event) {
  $event->arguments(0, str_replace('/api', '', $event->arguments[0]));
});

$this->addHookAfter('ProcessPageListActions::getActions', function (HookEvent $event) {
  $newReturn = [];
  foreach ($event->return as $key => $item) {
    if ($key === 'view') {
      $item['url'] = str_replace('/api', '', $item['url']);
    }

    $newReturn[$key] = $item;
  }

  $event->return = $newReturn;
});
