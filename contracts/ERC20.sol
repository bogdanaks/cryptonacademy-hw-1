//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract ERC20 {
    string public name = "Crypton";
    string public symbol = "CRYP";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**decimals;
    address public owner;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _amount) external returns (bool status) {
        require(_amount > 0, "Amount must be greater than 0");
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool status) {
        require(_amount > 0, "Amount must be greater than 0");
        allowance[_from][msg.sender] -= _amount;
        balanceOf[_from] -= _amount;
        balanceOf[_to] += _amount;
        return true;
    }

    function approve(address _spender, uint256 _amount) external returns (bool status) {
        require(_amount > 0, "Amount must be greater than 0");
        allowance[msg.sender][_spender] = _amount;
        return true;
    }

    function increaseAllowance(address _spender, uint256 _amount) external returns (bool status) {
        require(_amount > 0, "Amount must be greater than 0");
        allowance[msg.sender][_spender] += _amount;
        return true;
    }

    function decreaseAllowance(address _spender, uint256 _amount) external returns (bool status) {
        require(_amount > 0, "Amount must be greater than 0");
        uint256 subAmount = allowance[msg.sender][_spender] - _amount;
        require(subAmount > 0, "Total allowance must be greater than 0");
        allowance[msg.sender][_spender] -= _amount;
        return true;
    }

    function mint(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        totalSupply += _amount;
    }

    function burn(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        totalSupply -= _amount;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the owner");
        _;
    }
}
