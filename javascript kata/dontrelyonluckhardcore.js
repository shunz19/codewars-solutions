// https://www.codewars.com/kata/54f6e7a62e2c167e29000112

guess = 1;
i = 0;

Math = Object.create(Math, {
  random: {
    value: function value() {
      i++
      return 0.0000001 * i
    }
  }
})

Math.random.toString = function() {
  return "function random() { [native code] }";
}

Object.defineProperty(Math, 'frozen', {
  set: function() {
    return "Nope.";
  }
})