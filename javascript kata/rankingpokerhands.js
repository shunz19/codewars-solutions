// https://www.codewars.com/kata/5739174624fc28e188000465

var Result = { "win": 1, "loss": 2, "tie": 3 }

function PokerHand(hand) {
  var Card = (()=> {
    function Card(s) {
      var c = s[0];
      switch(c) {
        case "A":
          c=13;
        break;
        case "J":
          c=10;
        break;
        case "Q":
          c=11;
        break;
        case "K":
          c=12;
        break;
        case "T":
          c=9
        break;
        default:
          c=parseInt(c) - 1;
        break;
      }
      this.number = c;
      this.suit = s[1];
    }
    return Card;
  })();
  this.cards = hand.split(" ").map(v=>new Card(v));

  var cards = {};
  this.cards.map(v=> {
    cards[v.number] ? cards[v.number]++ : cards[v.number] = 1;
  })
  this.mappedCards = cards;

  if(this.isFlush()) {
    this.strength = 6;
    if(this.isRoyal()) {
      this.strength+=4;
    }
    else if(this.isStraight()) {
      this.strength+=3;
    }
  }
  else if(this.isStraight()) {
    this.strength=5;
  }
  else {
    switch(this.getHighestKind()) {
      case 1:
        this.strength = 1;
      break;
      case 2:
        if(this.getPairs().length == 1) {
          this.strength = 2;
        }
        else {
          this.strength = 3;
        }
      break;
      case 3:
        if(this.getPairs().length == 1) {
          this.strength = 7
        }
        else {
          this.strength = 4;
        }
      break;
      case 4:
        this.strength = 8;
      break;
    }
  }
}

PokerHand.prototype.getPairs = function() {
  return Object.entries(this.mappedCards).sort((a,b)=>b[1]-a[1]).filter(v=>v[1]==2).map(v=>{v[0]=parseInt(v[0]); return v})
}

PokerHand.prototype.getThreeOfAKind = function() {
  return Object.entries(this.mappedCards).sort((a,b)=>b[1]-a[1]).filter(v=>v[1]==3).map(v=>{v[0]=parseInt(v[0]); return v})[0]
}

PokerHand.prototype.getFourOfAKind = function() {
  return Object.entries(this.mappedCards).sort((a,b)=>b[1]-a[1]).filter(v=>v[1]==4).map(v=>{v[0]=parseInt(v[0]); return v})[0]
}

PokerHand.prototype.getHighestKind = function() {
  return Object.entries(this.mappedCards).map(v=>v[1]).sort((a,b)=>b-a)[0];
}

PokerHand.prototype.getNumbers = function() {
  return Object.entries(this.mappedCards).reverse().map(v=>parseInt(v[0]))
}

PokerHand.prototype.getHighestNumberInPairs = function() {
  return this.getPairs().sort((a,b)=>b[0]-a[0])[0][0]
}

PokerHand.prototype.getHighestNumber = function() {
  var number = 0;
  this.cards.map(v=> {
    number += v.number;
  })
  return number;
}

PokerHand.prototype.isStraight = function() {
  var straight = false;
  var straightCount;
  var _this = this;
  this.cards.map(v=> {
    straightCount = true;
    for(var i = 1; i <= 4; i++) {
      if(!_this.hasNumber(v.number + i)) {
        straightCount = false;
        break;
      }
    }
    if(straightCount) straight = true;
  })
  return straight;
}

PokerHand.prototype.hasNumber = function(number) {
  var has = false;
  if(number > 13) number -= 13;
  this.cards.map(v=> {
    if(v.number == number) has = true;
  })
  return has;
}

PokerHand.prototype.isRoyal = function() {
  var isRoyal = false;
  this.cards.map(v=> {
    if(v.number != 1 || v.number < 10) isRoyal = false;
  })
  return isRoyal
}

PokerHand.prototype.isFlush = function() {
  var isFlush = true;
  this.cards.map((v,i,a) => {
    if(i == 0) return;
    if(v.suit != a[i - 1].suit) isFlush = false;
  })
  return isFlush;
}

PokerHand.prototype.compareHighest = function(hand) {
  var t1 = this.getNumbers();
  var t2 = hand.getNumbers();
  var my = t1.filter(v=>!t2.includes(v));
  var his = t2.filter(v=>!t1.includes(v));
  var beated;
  for(var i of my) {
    beated = false;
    for(var j of his) {
      if(beated) continue;
      if(i <= j) beated = true;
    }
    if(!beated) return Result.win
  }
  for(var i of his) {
    beated = false;
    for(var j of my) {
      if(beated) continue;
      if(i <= j) beated = true;
    }
    if(!beated) return Result.loss
  }
  return Result.tie;
}

PokerHand.prototype.compareWith = function(hand){
  if(this.strength == hand.strength) {
    switch(this.strength) {
      case 1:case 5:case 6:case 9:
        return this.compareHighest(hand);
      break;
      case 2:
        var my = this.getPairs()[0];
        var his = hand.getPairs()[0];
        if(my[0] == his[0]) {
          return this.compareHighest(hand);
        }
        else if(my[0] > his[0]) {
          return Result.win;
        }
        else {
          return Result.loss;
        }
      break;
      case 3:
        var my = this.getHighestNumberInPairs();
        var his = hand.getHighestNumberInPairs();
        if(my == his) {
          return this.compareHighest(hand);
        }
        else if(my > his) {
          return Result.win;
        }
        else {
          return Result.loss;
        }
      break;
      case 4:
        var my = this.getThreeOfAKind();
        var his = hand.getThreeOfAKind();
        if(my[0] == his[0]) {
          return this.compareHighest(hand);
        }
        else if(my[0] > his[0]) {
          return Result.win;
        }
        else {
          return Result.loss;
        }
      break;
      case 7:
        var my = this.getThreeOfAKind();
        var his = hand.getThreeOfAKind();
        if(my[0] == his[0]) {
          my = this.getPairs();
          his = hand.getPairs();
          if(my[0] == his[0]) {
            return Result.tie;
          }
          else if(my[0] > his[0]) {
            return Result.win;
          }
          else {
            return Result.loss;
          }
        }
        else if(my[0] > his[0]) {
          return Result.win;
        }
        else {
          return Result.loss;
        }
      break;
      case 8:
        var my = this.getFourOfAKind();
        var his = hand.getFourOfAKind();
        if(my[0] == his[0]) {
          return this.compareHighest(hand);
        }
        else if(my[0] > his[0]) {
          return Result.win;
        }
        else {
          return Result.loss;
        }
      break;
      case 10:
        return Result.tie;
      break;
    }
  }
  else if(this.strength > hand.strength) {
    return Result.win
  }
  else {
    return Result.loss
  }
}