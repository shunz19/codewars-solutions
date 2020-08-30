<?php

// https://www.codewars.com/kata/520446778469526ec0000001

function same_structure_as(array $a, array $b): bool {
  $a = cleanArray($a);
  $b = cleanArray($b);
  return print_r($a,true) == print_r($b,true);
}

function cleanArray($array) {
  for($i = 0; $i < count($array); $i++) {
    if(is_array($array[$i])) {
      $array[$i] = cleanArray($array[$i]);
    }
    else {
      $array[$i] = "";
    }
  }
  return $array;
}

?>