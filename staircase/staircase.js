// from https://github.com/hadrienj/StaircaseJS/blob/master/Staircase.js

function Staircase(stairs) {
    this.stairs = {};
    for (var i in stairs) {
        this.stairs = stairs;

        if (typeof stairs.firstVal==="undefined") {
            throw new Error("No firstVal specified for staircase.");
        }
        this.stairs.values = [stairs.firstVal];

        this.stairs.up = stairs.up || 1;
        this.stairs.direction = stairs.direction || -1; // -1 means lower val is harder.
        this.stairs.operation = stairs.operation || 'add';
        this.stairs.successiveGood = 0;
        this.stairs.successiveBad = 0;
        this.stairs.sameStairCount = 0;
        this.stairs.verbosity = stairs.verbosity || 0;
        if (this.stairs.verbosity) {
            console.log("Built staircase with " +
                this.stairs.up + "-up, " + this.stairs.down + "-down and " +
                "a factor of " + this.stairs.factor + ", (" + this.stairs.operation + ").");
        }
    }
}

Staircase.prototype.getNext = function(n = 1) {
    return this.stairs.values[this.stairs.values.length - n];
}

Staircase.prototype.addResponse = function(resp) {
    
}