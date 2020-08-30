// https://www.codewars.com/kata/545434090294935e7d0010ab

function JQL() {
  this._select = r=>r;
  this._where = [];
  this._having = [];
  this._groupBy = [];
  this._orderBy = [];
  this.table = [];
  this.iterated = {};
  this.called = [0,0,0,0]
  var _this = this;

  this.execute = function() {
      var tmpdata = [];
      var gdata = [];

      var data = [],t;

    if (_this.table.length > 1) {
      _this.table.forEach(function () {
        data.push([]);
      });

      _this.table[0].forEach(function (row, i) {
        for (t = 0; t < _this.table.length; t++) {
          data[t].push(_this.table[t][i]);
        }
      });

      tmpdata = [];
      (function traverseTable(D, t) {
        if (D.length === 0) {
          tmpdata.push(t.slice(0));
        } else {
          for (var i = 0; i < D[0].length; i++) {
            t.push(D[0][i]);
            traverseTable(D.slice(1), t);
            t.splice(-1, 1);
          }
        }
      })(data, []);
    } else if (_this.table.length) {
      tmpdata = _this.table[0]
    } else {
      return []
    }
    if(_this._where.length) data = tmpdata.filter(v=>_this.validateWhere(v)); else data=tmpdata;
    data.sort();


    if (_this._groupBy.length > 0) {
      var T = {};

      data.forEach(function (row) {
        t = T;
        _this._groupBy.forEach(function (groupCallback) {
          var k = groupCallback(row);
          t[k] = t[k] || {};
          t = t[k];
        });
        t._data = t._data || [];
        t._data.push(row);
      });

      (function traverse(node, R) {
        if (node._data != null) {
          node._data.forEach(function (e) {
          R.push(e);
          });
        } else {
          for (var k in node) {
            k = /\d+/.test(k) ? Number(k) : k;
            var row = [k, []];
            traverse(node[k], row[1]);
            R.push(row);
          }
        }
      })(T, gdata);
      data = gdata.filter(v=>_this.isHaving(v));
    }
    for(var s of _this._orderBy) data = data.sort(s);
    return data.map(_this._select)
  }

  this.isHaving = function(row) {
    for(var f of _this._having) {
      if(!f(row)) return false;
    }
    return true;
  }

  this.validateWhere = function(i) {
    return _this._where.every(_=>_.some(u=>u(i)));
  }

  this.prepareGroup = function(data, index=0) {
    if(index>=_this._groupBy.length) return;
  }

  this.select = function(s=r=>r) {
    if(_this.called[0]) throw new Error("Duplicate SELECT");
    _this.called[0] = 1;
    _this._select = s;
    return _this;
  }

  this.from = function(...a) {
    if(_this.called[1]) throw new Error("Duplicate FROM");
    _this.called[1] = 1;
    _this.table = a;
    return _this;
  }

  this.where = function() {
    _this._where.push(Array.from(arguments));
    return _this;
  }

  this.having = function(...f) {
    _this._having = _this._having.concat(f);
    return _this;
  }

  this.groupBy = function(...f) {
    if(_this.called[2]) throw new Error("Duplicate GROUPBY");
    _this.called[2] = 1;
    _this._groupBy = f;
    return _this;
  }

  this.orderBy = function(...f) {
    if(_this.called[3]) throw new Error("Duplicate ORDERBY");
    _this.called[3] = 1;
    _this._orderBy = f;
    return _this;
  }
}



var query = function() {
  return new JQL();
};