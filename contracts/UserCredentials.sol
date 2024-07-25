// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCredentials {
    struct User {
        string username;
        bytes32 passwordHash;
    }

    mapping(address => User) private users;

    function register(string memory _username, string memory _password) public {
        require(bytes(users[msg.sender].username).length == 0, "User already exists");
        users[msg.sender] = User(_username, keccak256(abi.encodePacked(_password)));
    }

    function getUser(address _user) public view returns (string memory username) {
        return users[_user].username;
    }

    function verifyPassword(address _user, string memory _password) public view returns (bool) {
        return users[_user].passwordHash == keccak256(abi.encodePacked(_password));
    }
}
