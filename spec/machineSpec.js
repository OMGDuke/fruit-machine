describe('Machine', function() {
  var machine;
  var player;

  beforeEach(function() {
    machine = new Machine();
    player = jasmine.createSpyObj('player',['deductBalance']);
  });

  describe('New Machine', function() {
    it('starts with £100 inside', function() {
      expect(machine.currentBalance()).toEqual(100);
    });
  });

  describe('#addCredit', function() {
    it('adds to currentBalance', function() {
      machine.addCredit(player);
      expect(machine.currentBalance()).toEqual(103);
    });
    it('sets the machine to a playable state', function() {
      machine.addCredit(player);
      expect(machine.readyToPlay).toEqual(true);
    });
    it('returns an error if the machine is readyToPlay', function() {
      machine.addCredit(player);
      expect(function(){ machine.addCredit(player); }).toThrowError("Machine is already in credit");
    });
  });
});
