
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = { 
    amount: 50000,
    years: 10,
    rate: 6
  }
  expect(calculateMonthlyPayment(values)).toEqual('555.10');
});


it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 10000,
    years: 8,
    rate: .9
  };
  expect(calculateMonthlyPayment(values)).toEqual('108.00');
  // ..
});

/// etc
