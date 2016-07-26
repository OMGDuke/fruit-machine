class Slots {

  _slotTurn() {
    var colours = ["b", "w", "g", "y"];
    return colours[Math.floor(Math.random()*colours.length)];
  }

  spin() {
    return [this._slotTurn(), this._slotTurn(), this._slotTurn(), this._slotTurn()];
  }
}

module.exports = Slots;
