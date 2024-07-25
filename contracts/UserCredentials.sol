// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCredentials {
    struct User {
        string username;
        string passwordHash;
        string firstname;
        string lastname;
        string email;
        address referral;
    }

    mapping(address => User) private users;
    address[] private userAddresses;

    event UserRegistered(
        address indexed userAddress,
        string username,
        string firstname,
        string lastname,
        string email,
        address referral
    );

    function isRegistered() public view returns (bool) {
        return bytes(users[msg.sender].username).length > 0;
    }

    function register(
        string memory _username,
        string memory _passwordHash,
        string memory _firstname,
        string memory _lastname,
        string memory _email,
        address _referral
    ) public {
        require(!isRegistered(), "User already registered");

        User memory newUser = User({
            username: _username,
            passwordHash: _passwordHash,
            firstname: _firstname,
            lastname: _lastname,
            email: _email,
            referral: _referral
        });

        users[msg.sender] = newUser;
        userAddresses.push(msg.sender);

        emit UserRegistered(msg.sender, _username, _firstname, _lastname, _email, _referral);
    }

    function getUser() public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        address
    ) {
        require(isRegistered(), "User not registered");

        User memory user = users[msg.sender];
        return (
            user.username,
            user.passwordHash,
            user.firstname,
            user.lastname,
            user.email,
            user.referral
        );
    }

    function getAllUsers() public view returns (
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        address[] memory
    ) {
        uint256 userCount = userAddresses.length;
        
        string[] memory usernames = new string[](userCount);
        string[] memory passwordHashes = new string[](userCount);
        string[] memory firstnames = new string[](userCount);
        string[] memory lastnames = new string[](userCount);
        string[] memory emails = new string[](userCount);
        address[] memory referrals = new address[](userCount);

        for (uint256 i = 0; i < userCount; i++) {
            address userAddress = userAddresses[i];
            User memory user = users[userAddress];

            usernames[i] = user.username;
            passwordHashes[i] = user.passwordHash;
            firstnames[i] = user.firstname;
            lastnames[i] = user.lastname;
            emails[i] = user.email;
            referrals[i] = user.referral;
        }

        return (usernames, passwordHashes, firstnames, lastnames, emails, referrals);
    }
}
