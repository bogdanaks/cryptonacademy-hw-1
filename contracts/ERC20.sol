//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

contract ERC20 {
    string public name = "Crypton";
    string public symbol = "CRYP";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function transfer() {
        
    }

    function transferFrom() {

    }

    function approve() {

    }

    function increaseAllowance() {

    }

    function decreaseAllowance() {

    }

    function mint() {

    }

    function burn() {
        
    }

    // VIEW FUNCTIONS
    function name() public view returns (string) {

    }

    function symbol() public view returns (string) {

    }

    function decimals() public view returns (uint8) {

    }

    function balanceOf(address user) public view returns (uint256) {

    }

    function totalSupply() public view returns (uint256) {

    }

    function allowance(address owner, address spender) public view returns (uint256) {

    }
}
