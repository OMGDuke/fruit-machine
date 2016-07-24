function Machine(slots) {
  this._totalBalance = 100;
  this.readyToPlay = false;
  this.slots = slots;

  Machine.prototype.currentBalance = function () {
    return this._totalBalance;
  };

  Machine.prototype.addCredit = function (player) {
    if(this.readyToPlay) { throw new Error("Machine is already in credit"); }
    player.insertCoin();
    this._totalBalance += 3;
    this.readyToPlay = true;
  };

  Machine.prototype.pullLever = function (player) {
    if(!this.readyToPlay) { throw new Error("Please insert £3 to play"); }
    this.readyToPlay = false;
    var outcome = _calculateOutcome(this.slots.spin());
    return outcome === true ? _win(player) : _lose;
  };

  function _calculateOutcome(result) {
    return !!result.reduce(function(a, b){ return (a === b) ? a : NaN; });
  }

  function _win(player) {
    _payOut(player);
    return 'You win';
  }

  function _payOut(player) {
    player.receiveWinnings(this._totalBalance);
    this._totalBalance = 0;
  }
}
