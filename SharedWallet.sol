pragma solidity ^0.8.11;

contract SharedWallet {
    address public owner;
    mapping (address => uint) public spendingLimits;
    mapping (address => uint) public spendingRecords;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "You're not the owner");
        _;
    }

    function getWalletBalance () public view returns(uint) {
        return address(this).balance;
    }

    function getMyBalance () public view returns(uint) {
        if (msg.sender == owner)  { 
            return getWalletBalance();
        }

        return spendingLimits[msg.sender] - spendingRecords[msg.sender];
    }

    // only owner can set and change spending limits to the other wallets
    function setSpendingLimit (address addr, uint limit) public onlyOwner{
        spendingLimits[addr] = limit * 1 ether;
    } 

    function withdrawMoney (uint value) public {
        address payable receiver = payable(msg.sender);
        uint callerBalance = getMyBalance();
        uint valueInWei = value * 1 ether;

        // only owner can unlimited withdraw money
        if(receiver == owner) {
            spendingRecords[msg.sender] += valueInWei;
            receiver.transfer(valueInWei);
            return();
        }

        // wallets can withdraw only allowed amount of money 
        require (valueInWei < callerBalance);
        spendingRecords[msg.sender] += valueInWei;
        receiver.transfer(valueInWei);
    }

    // can be deposited by anyone
    // fallback function to recieve money 
    receive () external payable {
    }
}