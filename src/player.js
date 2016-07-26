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
    this._totalWallet -= 3;
  }
}
