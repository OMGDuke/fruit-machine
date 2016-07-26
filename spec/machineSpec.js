describe('Machine', function() {
  var machine;
  var player;

  beforeEach(function() {
    slots = jasmine.createSpyObj('slots',['spin']);
    machine = new Machine(slots);
    player = jasmine.createSpyObj('player',['receiveWinnings','insertCoin']);
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

  describe('pullLever', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
    });
    it('returns an error if the machine is not readyToPlay', function() {
      expect(function(){ machine.pullLever(player); }).toThrowError("Please insert £3 to play");
    });

    it('sets the machines readyToPlay state to false after a turn', function() {
      machine.addCredit(player);
      machine.pullLever(player);
      expect(machine.readyToPlay).toEqual(false);
    });
  });

  describe('pullLever Win', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
    });

    it('pays out if you win', function() {
      machine.addCredit(player);
      machine.pullLever(player);
      expect(machine.currentBalance()).toEqual(0);
    });

    it('prints a message if you win', function() {
      machine.addCredit(player);
      expect(machine.pullLever(player)).toEqual("You Win! Result: b,b,b,b. Winnings: £103");
    });
  });
});
