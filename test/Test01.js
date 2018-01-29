var FundRaising = artifacts.require("FundRaising14");

contract('FundRaising14', function (accounts) {

    it('the owner is allowed to set days limit', function() {
       return myContract = FundRaising.deployed().then(
           function (instance) {
               return instance.setDaysCount.call(accounts[0], 14);
           }).then(function (isAllowed) {
               assert.equal(isAllowed, true, 'the owner was allowed');
       })
    });


    it('the other user is not allowed to set days limit', function() {
        return myContract = FundRaising.deployed().then(
            function (instance) {
                return instance.setDaysCount.call(accounts[1], 14);
            }).then(function (isAllowed) {
            assert.equal(isAllowed, false, 'the other user was not allowed');
        })
    });

    it('user is not allowed to withdraw funds if specific time has not passed or if the amount is higher than available', function() {
        return myContract = FundRaising.deployed().then(
            function (instance) {
                return instance.withdraw.call(accounts[1], 100);
            }).then(function (isAllowed) {
            assert.equal(isAllowed, false, 'the other user was not allowed to withdraw');
        })
    });


});