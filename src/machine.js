const PLAY_COST = 3;
class Machine {
  constructor(slots, player) {
    this._totalBalance = 100;
    this.readyToPlay = 0;
    this.slots = slots;
    this.player = player;
  }

  currentBalance() {
    return this._totalBalance;
  }

  addCredit() {
    if(this.readyToPlay) { throw new Error("Machine is already in credit"); }
    this.player.insertCoin();
    this._prepareMachine();
  }

  pullLever() {
    if(!this.readyToPlay) { throw new Error("Please insert £"+ PLAY_COST + " to play"); }
    this.readyToPlay -= 1;
    return this._calculateOutcome(this.slots.spin());
  }

  _prepareMachine() {
    this._totalBalance += PLAY_COST;
    this.readyToPlay += 1;
  }

  _calculateOutcome(result) {
    if( this._isAllMatching(result)) { return this._jackpotWin(result); }
    if( this._isAllDifferent(result)){ return this._halfJackpotWin(result); }
    if( this._isAdjacentMatching(result)){ return this._fiveTimesWin(result); }
    else { return this._lose(result); }
  }

  _isAllMatching(result) {
    return !!result.reduce(function(a, b){return (a === b) ? a : NaN;});
  }

  _isAllDifferent(result) {
    var map = {}, i, size;
    for(i = 0, size = result.length; i < size; i++) {
      if(map[result[i]]) { return false; }
      map[result[i]] = true;
    }
    return true;
  }

  _isAdjacentMatching(result) {
    var x = 0, y = 1, i, size;
    for(i = 0, size = result.length; i < size; i++) {
      if (result[x] === result[y]) { return true; }
      else { x += 1; y += 1; }
    }
  }

  _isBalanceSufficient(winnings) {
    return this._totalBalance >= winnings;
  }

  _jackpotWin(slotResult) {
    var winnings = this._totalBalance;
    this._payOut(winnings);
    return 'You Win the Jackpot! Result: ' + slotResult + ". Winnings: £" + winnings;
  }

  _halfJackpotWin(slotResult) {
    var winnings = Math.floor(this._totalBalance/2);
    this._payOut(winnings);
    return 'You Win! Result: ' + slotResult + ". Winnings: £" + winnings;
  }

  _fiveTimesWin(slotResult) {
    var winnings = PLAY_COST * 5;
    if(this._isBalanceSufficient(winnings)) {
      this._payOut(winnings);
      return 'You Win! Result: ' + slotResult + ". Winnings: £" + winnings;
    } else {
      this._compensateWins(winnings);
      var payout = this._totalBalance;
      this._payOut(this._totalBalance);
      return 'You Win! Result: ' + slotResult + ". Winnings: £" + payout + ". You receive " + this.readyToPlay + " free spins";
    }
  }

  _compensateWins(winnings) {
    this.readyToPlay += ((winnings - this._totalBalance) / 3);
  }

  _payOut(winnings) {
    this.player.receiveWinnings(winnings);
    this._totalBalance -= winnings;
  }

  _lose(slotResult) {
    return 'You Lose! Result: ' + slotResult + ". New Jackpot: £" + this._totalBalance;
  }
}

module.exports = Machine;
