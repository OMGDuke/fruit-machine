function Player() {
  this._totalWallet = 30;

  Player.prototype.walletBalance = function () {
    return this._totalWallet;
  };

  Player.prototype.receiveWinnings = function (amount) {
    this._totalWallet += amount;
  };

  Player.prototype.insertCoin = function () {
    this._totalWallet -= 3;
  };

}
