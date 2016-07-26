class Machine {
  constructor(slots, player) {
    this._totalBalance = 100;
    this.readyToPlay = false;
    this.slots = slots;
    this.player = player;
  }

  currentBalance() {
    return this._totalBalance;
  }

  addCredit() {
    if(this.readyToPlay) { throw new Error("Machine is already in credit"); }
    this.player.insertCoin();
    this._totalBalance += 3;
    this.readyToPlay = true;
  }

  pullLever() {
    if(!this.readyToPlay) { throw new Error("Please insert £3 to play"); }
    this.readyToPlay = false;
    var slotResult = this.slots.spin();
    return this._calculateOutcome(slotResult);
  }

  _calculateOutcome(result) {
    var outcome = !!result.reduce(function(a, b){ return (a === b) ? a : NaN; });
    return outcome === true ? this._win(result) : this._lose(result);
  }

  _win(slotResult) {
    var winnings = this._totalBalance;
    this._payOut();
    return 'You Win! Result: ' + slotResult + ". Winnings: £" + winnings;
  }

  _payOut(player) {
    this.player.receiveWinnings(this._totalBalance);
    this._totalBalance = 0;
  }

  _lose(slotResult) {
    return 'You Lose! Result: ' + slotResult + ". New Jackpot: £" + this._totalBalance;
  }
}

module.exports = Machine;
