function Machine() {
  this._totalBalance = 100;
  this.readyToPlay = false;
}

Machine.prototype.currentBalance = function () {
  return this._totalBalance;
};

Machine.prototype.addCredit = function (player) {
  if(this.readyToPlay) {
    throw new Error("Machine is already in credit");
  }
  player.deductBalance();
  this._totalBalance += 3;
  this.readyToPlay = true;
};
