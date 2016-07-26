function Machine(slots) {
  this._totalBalance = 100;
  this.readyToPlay = false;
  this.slots = slots;

  this._payout = function(player) {
    player.receiveWinnings(this._totalBalance);
    this._totalBalance = 0;
  };

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
    var slotResult = this.slots.spin();
    var outcome = _calculateOutcome(slotResult);
    return outcome === true ? _win(player, slotResult) : _lose(slotResult);
  };

  function _calculateOutcome(result) {
    return !!result.reduce(function(a, b){ return (a === b) ? a : NaN; });
  }

  function _win(player, slotResult) {
    var winnings = this._totalBalance;
    this._payOut(player);
    return 'You Win! Result: ' + slotResult + ". Winnings: £" + winnings;
  }
}
