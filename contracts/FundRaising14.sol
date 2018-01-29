pragma solidity ^0.4.4;

contract FundRaising14 {
    mapping (address => uint) balances;
    mapping (address => uint) ledger;
    uint internal daysCount;
    address private creator;

    function FundRaising14() public {
        creator = msg.sender;
        daysCount = 14;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    function deposit(uint amount) public {
        //cannot deposit value by other contract: tx.origin used
        balances[tx.origin] += amount;
        if(ledger[tx.origin] == 0) {
            ledger[tx.origin] = now;
        }
        Transfer(this, msg.sender, amount);
    }
    
    modifier checkAvailableAmount(uint amount) {
        require(amount <= balances[msg.sender]);
        _;
    }
    
    modifier checkSinceFirstDeposit(uint daysCountCheck) {
        require(ledger[msg.sender] + (daysCountCheck * 1 days) > now);
        _;
    }
    
    modifier onlyWhenCreatorAddress {
        require(msg.sender == creator);
        _;
    }
    
    function setDaysCount(uint daysToSet) public
    onlyWhenCreatorAddress()
    returns (uint)
    {
        daysCount = daysToSet;
        return daysToSet;
    }
    
    function withdraw(uint amount) public 
    checkSinceFirstDeposit(daysCount)
    checkAvailableAmount(amount)  
    returns (uint returnAmount)
    {
        balances[msg.sender] -= amount;
        if(!msg.sender.send(amount)) {
            revert();
        }

        return amount;
    }
    
    
}