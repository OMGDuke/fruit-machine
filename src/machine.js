class Machine {
  constructor() {
    this._totalBalance = 100;
    this.readyToPlay = false;
    this.slots = slots;
  }

  currentBalance() {
    return this._totalBalance;
  }

  addCredit(player) {
    if(this.readyToPlay) { throw new Error("Machine is already in credit"); }
    player.insertCoin();
    this._totalBalance += 3;
    this.readyToPlay = true;
  }

  pullLever(player) {
    if(!this.readyToPlay) { throw new Error("Please insert £3 to play"); }
    this.readyToPlay = false;
    var slotResult = this.slots.spin();
    var outcome = this._calculateOutcome(slotResult);
    return outcome === true ? this._win(player, slotResult) : this._lose(slotResult);
  }

  _calculateOutcome(result) {
    return !!result.reduce(function(a, b){ return (a === b) ? a : NaN; });
  }

  _win(player, slotResult) {
    var winnings = this._totalBalance;
    this._payOut(player);
    return 'You Win! Result: ' + slotResult + ". Winnings: £" + winnings;
  }

  _payOut(player) {
    player.receiveWinnings(this._totalBalance);
    this._totalBalance = 0;
  }
}
