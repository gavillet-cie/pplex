<?php
function strReplaceFirst ($from, $to, $content) {
  $from = '/'.preg_quote($from, '/').'/';
  return preg_replace($from, $to, $content, 1);
}

function dashesToCamelCase ($string, $capitalizeFirstCharacter = false) {
    $str = str_replace('-', '', ucwords($string, '-'));
    if (!$capitalizeFirstCharacter) {
        $str = lcfirst($str);
    }
    return $str;
}

function normalize ($string) {
  $table = array(
    "Š"=>"S", "š"=>"s", "Ð"=>"D", "d"=>"d", "Ž"=>"Z", "ž"=>"z", "C"=>"C", "c"=>"c", "C"=>"C", "c"=>"c",
    "À"=>"A", "Á"=>"A", "Â"=>"A", "Ã"=>"A", "Ä"=>"A", "Å"=>"A", "Æ"=>"A", "Ç"=>"C", "È"=>"E", "É"=>"E",
    "Ê"=>"E", "Ë"=>"E", "Ì"=>"I", "Í"=>"I", "Î"=>"I", "Ï"=>"I", "Ñ"=>"N", "Ò"=>"O", "Ó"=>"O", "Ô"=>"O",
    "Õ"=>"O", "Ö"=>"O", "Ø"=>"O", "Ù"=>"U", "Ú"=>"U", "Û"=>"U", "Ü"=>"U", "Ý"=>"Y", "Þ"=>"B", "ß"=>"Ss",
    "à"=>"a", "á"=>"a", "â"=>"a", "ã"=>"a", "ä"=>"a", "å"=>"a", "æ"=>"a", "ç"=>"c", "è"=>"e", "é"=>"e",
    "ê"=>"e", "ë"=>"e", "ì"=>"i", "í"=>"i", "î"=>"i", "ï"=>"i", "ð"=>"o", "ñ"=>"n", "ò"=>"o", "ó"=>"o",
    "ô"=>"o", "õ"=>"o", "ö"=>"o", "ø"=>"o", "ù"=>"u", "ú"=>"u", "û"=>"u", "ý"=>"y", "ý"=>"y", "þ"=>"b",
    "ÿ"=>"y", "R"=>"R", "r"=>"r",
  );
   
  return strtr($string, $table);
}

function slugify ($string) {
  return strtolower(normalize(str_replace(" ", "-", $string)));
}

function stripPunctuation ($string) {
  return preg_replace('/[^a-z]+/i', " ", $string);
}