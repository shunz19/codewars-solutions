// https://www.codewars.com/kata/5263c6999e0f40dee200059d

function getPINs(observed) {
  // Im just too tired to make a complex way.
  var getPossibles = function(s) {
    var ret = [];
    switch(parseInt(s)) {
      case 0:
        ret = ["0","8"];
      break;
      case 1:
        ret = ["1","2","4"];
      break;
      case 2:
        ret = ["1","2","3","5"];
      break;
      case 3:
        ret = ["2","3","6"];
      break;
      case 4:
        ret = ["1","4","5","7"];
      break;
      case 5:
        ret = ["2","4","5","6","8"];
      break;
      case 6:
        ret = ["3","5","6","9"];
      break;
      case 7:
        ret = ["4","7","8"];
      break;
      case 8:
        ret = ["5","7","8","9","0"];
      break;
      case 9:
        ret = ["6","8","9"];
      break;
    }
    return ret;
  }
  var pins = [...observed];
  var possibilities = [];
  pins.map(v=>possibilities.push(getPossibles(v)));
  var result = [];
  var iterate = function(arr, index=0, pin="") {
    for(var i = 0; i < arr[index].length; i++) {
      if(index == arr.length - 1) {
        result.push(pin + arr[index][i])
      }
      else {
        iterate(arr, index+1, pin + arr[index][i])
      }
    }
  }
  iterate(possibilities)
  return result;
}