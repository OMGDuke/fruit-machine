describe('Machine', function() {
  var machine;
  var player;

  beforeEach(function() {
    slots = jasmine.createSpyObj('slots',['spin']);
    player = jasmine.createSpyObj('player',['receiveWinnings','insertCoin']);
    machine = new Machine(slots, player);
  });

  describe('New Machine', function() {
    it('starts with £100 inside', function() {
      expect(machine.currentBalance()).toEqual(100);
    });
  });

  describe('#addCredit', function() {
    it('adds to currentBalance', function() {
      machine.addCredit();
      expect(machine.currentBalance()).toEqual(103);
    });

    it('sets the machine to a playable state', function() {
      machine.addCredit();
      expect(machine.readyToPlay).toEqual(true);
    });
    it('returns an error if the machine is readyToPlay', function() {
      machine.addCredit();
      expect(function(){ machine.addCredit(); }).toThrowError("Machine is already in credit");
    });
  });

  describe('pullLever', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
    });
    it('returns an error if the machine is not readyToPlay', function() {
      expect(function(){ machine.pullLever(); }).toThrowError("Please insert £3 to play");
    });

    it('sets the machines readyToPlay state to false after a turn', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.readyToPlay).toEqual(false);
    });
  });

  describe('#pullLever Win', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
    });

    it('pays out if you win', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(0);
    });

    it('prints a message if you win', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Win! Result: b,b,b,b. Winnings: £103");
    });
  });

  describe('#pullLever Lose', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','w','w','b'];
      });
    });

    it('pays out nothing if you lose', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(103);
    });

    it('prints a message if you lose', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Lose! Result: b,w,w,b. New Jackpot: £103");
    });
  });
});
