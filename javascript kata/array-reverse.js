// https://www.codewars.com/kata/55de9c184bb732a87f000055

function reverse(arr) {
  var temp;
  for(var i = 0; i < arr.length / 2; i++) {
    temp = arr[i]
    arr[i] = arr[arr.length-1-i];
    arr[arr.length-1-i] = temp;
  }
}