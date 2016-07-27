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

    it('starts in an unplayable state', function() {
      expect(machine.readyToPlay).toEqual(0);
    });
  });

  describe('#addCredit', function() {
    it('adds to currentBalance', function() {
      machine.addCredit();
      expect(machine.currentBalance()).toEqual(103);
    });

    it('sets the machine to a playable state', function() {
      machine.addCredit();
      expect(machine.readyToPlay).toEqual(1);
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
      expect(machine.readyToPlay).toEqual(0);
    });
  });

  describe('#pullLever Jackpot Win', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
    });

    it('pays out full machine balance if you win the jackpot', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(0);
    });

    it('prints a message if you win the jackpot', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Win the Jackpot! Result: b,b,b,b. Winnings: £103");
    });
  });

  describe('#pullLever All Different Win', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','w','g','y'];
      });
    });

    it('pays out half machine balance if you win', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(52);
    });

    it('prints a message if you win the half jackpot', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Win! Result: b,w,g,y. Winnings: £51");
    });
  });

  describe('#pullLever Adjacent Matching Win', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','w','w','y'];
      });
    });

    it('pays out 5 times play cost if you win', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(88);
    });

    it('prints a message if you win', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Win! Result: b,w,w,y. Winnings: £15");
    });
  });

  describe('#pullLever Lose', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','w','g','b'];
      });
    });

    it('pays out nothing if you lose', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(103);
    });

    it('prints a message if you lose', function() {
      machine.addCredit();
      expect(machine.pullLever()).toEqual("You Lose! Result: b,w,g,b. New Jackpot: £103");
    });

    it('updates the jackpot if you lose', function() {
      machine.addCredit();
      machine.pullLever();
      expect(machine.currentBalance()).toEqual(103);
    });
  });

  describe('Gives free plays if balance doesn\'t cover winnings', function() {
    beforeEach(function() {
      slots.spin.and.callFake(function() {
        return ['b','b','b','b'];
      });
      machine.addCredit();
      machine.pullLever();
      slots.spin.and.callFake(function() {
        return ['b','w','w','y'];
      });
      machine.addCredit();
    });
    it ('gives 4 free play when it is £12 short', function() {
      machine.pullLever();
      expect(machine.readyToPlay).toEqual(4);
    });
    it('tells you how much you\'ve won and how many free spins you have', function() {
      expect(machine.pullLever()).toEqual("You Win! Result: b,w,w,y. Winnings: £3. You receive 4 free spins");
    });
  });
});
