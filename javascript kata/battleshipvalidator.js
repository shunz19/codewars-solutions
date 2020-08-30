// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7

function validateBattlefield(f) {
console.log(f)
  // adding new array from first and last to avoid error
  f.push([]);
  f.unshift([]);
  var x,y,c,w,p,
  battleship=0,
  cruisers=0,
  destroyers=0,
  submarines=0
  
  for(var i = 1; i < f.length - 2; i++) {
    for(var j = 0; j < f.length - 2; j++) {
      if(f[i][j] == 1) {
        
        // Checking if square has a neighbor diagonally
        if(f[i-1][j-1] == 1 ||
          f[i-1][j+1] == 1 ||
          f[i+1][j-1] == 1 ||
          f[i+1][j+1] == 1) return false;
        
        x = false;
        y = false;
        
        // Check if square has a neighbor horizontally
        if(f[i][j-1] == 1 || f[i][j+1] == 1) x = true;
        
        // Check if square has a neighbor vertically
        if(f[i-1][j] == 1 || f[i+1][j] == 1) y = true;
        
        // check if square has neighbor horizontally and vertically
        if(x && y) return false;
        
        // checking the battleship type
        c = 0;
        w = true;
        if(x) {
          // counting horizontal neighbors
          p = j;
          while(w) {
            if(f[i][p] == 1) {
              c++;
              p++;
            }
            else {
              w = false;
            }
          }
          w = true;
          p = j - 1;
          while(w) {
            if(f[i][p] == 1) {
              c++;
              p--;
            }
            else {
              w = false;
            }
          }
        }
        else {
          // Counting vertical neighbors
          p = i;
          while(w) {
            if(f[p][j] == 1) {
              c++;
              p++;
            }
            else {
              w = false;
            }
          }
          w = true;
          p = i - 1;
          while(w) {
            if(f[p][j] == 1) {
              c++;
              p--;
            }
            else {
              w = false;
            }
          }
        }

        // incrementing the type
        switch(c) {
          case 1:
            submarines++
            break;
          case 2:
            destroyers++;
            break;
          case 3:
            cruisers++;
            break;
          case 4:
            battleship++;
            break;
          default:
            return false;
            break;
        }
      }
    }
  }
  if(battleship != 4 ||
    cruisers != 2*3 ||
    destroyers != 3*2 ||
    submarines != 4) return false;
  return true;
}