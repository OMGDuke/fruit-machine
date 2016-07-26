describe('Player', function() {
  var player;

  beforeEach(function() {
    player = new Player();
  });

  describe('New Player', function() {
    it('starts with £30 in their wallet', function() {
      expect(player.walletBalance()).toEqual(30);
    });
  });

  describe('#receiveWinnings', function() {
    it('adds to walletBalance', function() {
      player.receiveWinnings(50);
      expect(player.walletBalance()).toEqual(80);
    });
  });

  describe('#insertCoin', function() {
    it('reduced the players walletBalance by 3', function() {
      player.insertCoin();
      expect(player.walletBalance()).toEqual(27);
    });

    it('raises an error when you do not have enough to play', function() {
      for(var i=0; i < 10; i++){
          player.insertCoin();
      }
      expect(function(){ player.insertCoin(); }).toThrowError("You do not have enough to play");
    });
  });
});
