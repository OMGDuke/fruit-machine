describe('Slots', function() {
  var slots;

  beforeEach(function() {
    slots = new Slots();
  });

  describe('#spin', function() {
    it('returns an array of 4 colours', function() {
      spyOn(Math, 'random').and.returnValue(0);
      expect(slots.spin()).toEqual(["b","b","b","b"]);
    });
  });
});
