<?php

namespace Rockett\Support;

final class ParseFloat
{
  public static function asString($float, string $format = '%.1F'): string
  {
    return sprintf($format, (float) $float);
  }
}
