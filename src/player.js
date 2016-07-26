class Player {
  constructor() {
    this._totalWallet = 30;
  }

  walletBalance() {
    return this._totalWallet;
  }

  receiveWinnings(amount) {
    this._totalWallet += amount;
  }

  insertCoin() {
    if(this._totalWallet < 3) { throw new Error("You do not have enough to play"); }
    this._totalWallet -= 3;
  }
}

module.exports = Player;
