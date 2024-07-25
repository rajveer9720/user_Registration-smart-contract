// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCredentials {
    struct User {
        string username;
        string passwordHash;
    }

    mapping(address => User) private users;
    address[] private userAddresses;

    function register(string memory _username, string memory _passwordHash) public {
        // Only allow registration if the user is not already registered
        require(bytes(users[msg.sender].username).length == 0, "User already registered");

        users[msg.sender] = User(_username, _passwordHash);
        userAddresses.push(msg.sender);
    }

    function getUser() public view returns (string memory username, string memory passwordHash) {
        User memory user = users[msg.sender];
        require(bytes(user.username).length != 0, "User not registered");
        return (user.username, user.passwordHash);
    }

    function isRegistered() public view returns (bool) {
        return bytes(users[msg.sender].username).length != 0;
    }

    function getAllUsers() public view returns (string[] memory usernames, string[] memory passwordHashes) {
        uint256 userCount = userAddresses.length;
        string[] memory usernamesArray = new string[](userCount);
        string[] memory passwordHashesArray = new string[](userCount);

        for (uint256 i = 0; i < userCount; i++) {
            address userAddress = userAddresses[i];
            User memory user = users[userAddress];
            usernamesArray[i] = user.username;
            passwordHashesArray[i] = user.passwordHash;
        }

        return (usernamesArray, passwordHashesArray);
    }
}
