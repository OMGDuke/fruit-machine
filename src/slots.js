function Slots() {

  function _slotTurn() {
    var colours = ["b", "w", "g", "y"];
    return colours[Math.floor(Math.random()*colours.length)];
  }
  Slots.prototype.spin = function () {
    return [_slotTurn(), _slotTurn(), _slotTurn(), _slotTurn()];
  };
}
