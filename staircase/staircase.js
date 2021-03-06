// from https://github.com/hadrienj/StaircaseJS/blob/master/Staircase.js

function Staircase(stairs) {
    this.stairs = {};
    for (var i in stairs) {
        this.stairs = stairs;

        if (typeof stairs.firstVal==="undefined") {
            throw new Error("No firstVal specified for staircase.");
        }
        if (typeof stairs.factor === "undefined") {
            throw new Error("No factor specified for staircase.");
        }
        this.stairs.values = [stairs.firstVal];

        this.stairs.up = stairs.up || 1;
        this.stairs.operation = stairs.operation || 'add';
        this.stairs.successiveGood = 0;
        this.stairs.successiveBad = 0;
        this.stairs.verbosity = stairs.verbosity || 0;
        if (this.stairs.verbosity) {
            console.log("Built staircase with " +
                this.stairs.up + "-up, " + this.stairs.down + "-down and " +
                "a factor of " + this.stairs.factor + ", (" + this.stairs.operation + ").");
        }
    }
    this.timings = {
      easier: { // easier is 'increase time'
        add: {
          // pass
        },
        multiply: function(stair) {
          if (stair.successiveBad >= stair.up) {
            stair.successiveBad = 0;
            var newVal = Math.floor(stair.values[stair.values.length - 1] * stair.factor);
            if (stair.verbosity > 0) {
              console.log("Decreasing stair difficulty. Setting new value to " + newVal + "ms.");
            }
            return newVal;
          }
          else {
            return stair.values[stair.values.length - 1];
          }
        }
      },
      harder: { // harder is 'deacrease time'
        add: {
          // pass
        },
        multiply: function(stair) {
          if (stair.successiveGood >= stair.down) {
            stair.successiveGood = 0;
            var newVal = Math.floor(stair.values[stair.values.length - 1] / stair.factor);
            if (stair.verbosity > 0) {
              console.log("Increasing stair difficulty. Settin new value to " + newVal + "ms.");
            }
            return newVal;
          }
          else {
            return stair.values[stair.values.length - 1];
          }
        }
      }
    }
}

Staircase.prototype.getValue = function(n = 1) {
    return this.stairs.values[this.stairs.values.length - n];
}

Staircase.prototype.addResponse = function(resp) {
    if (resp) {
      this.stairs.successiveBad = 0;
      this.stairs.successiveGood++;
    }
    else {
      this.stairs.successiveBad++;
      this.stairs.successiveGood = 0;
    }
    this.stairs.values[this.stairs.values.length] = this.chooseNextVal(resp);
}

Staircase.prototype.chooseNextVal = function(resp) {
    var stair = this.stairs;
    var ans = (resp) ? 'harder' : 'easier';
    // console.log("ans: ", ans);
    // console.log(this.stairs);
    return this.timings[ans][stair.operation](stair);
}