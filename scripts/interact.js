const path = require('path');
const Web3 = require('web3');

// Adjust to your Ganache or Ethereum node URL
const web3 = new Web3('http://127.0.0.1:7545');

// Adjust the path as necessary
const abiPath = path.resolve(__dirname, '../build/contracts/UserCredentials.json');
const abi = require(abiPath).abi;

// Replace with your deployed contract address
const contractAddress = '0xcE96F962827cee25dcA4528E7D39fd59EA982a7B';

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

async function registerUser(account, username, passwordHash, firstname, lastname, email, referral) {
    try {
        await contract.methods.register(username, passwordHash, firstname, lastname, email, referral)
            .send({ from: account });
        console.log(`User ${username} registered from account ${account}`);
    } catch (error) {
        console.error(`Error registering user ${username}:`, error);
    }
}

async function getUser(account) {
    try {
        const user = await contract.methods.getUser(account).call();
        console.log(`User details for account ${account}:`, user);
    } catch (error) {
        console.error(`Error getting user details for account ${account}:`, error);
    }
}

async function getAllUsers() {
    try {
        const users = await contract.methods.getAllUsers().call();
        console.log('All registered users:', users);
    } catch (error) {
        console.error('Error getting all users:', error);
    }
}

module.exports = async function (callback) {
    try {
        // Get accounts from the Ethereum node
        const accounts = await web3.eth.getAccounts();

        // Register users
        await registerUser(accounts[0], 'user1', 'passwordHash1', 'FirstName1', 'LastName1', 'email1@example.com', accounts[1]);
        await registerUser(accounts[1], 'user2', 'passwordHash2', 'FirstName2', 'LastName2', 'email2@example.com', accounts[0]);
        await registerUser(accounts[2], 'user1', 'passwordHash1', 'FirstName1', 'LastName1', 'email1@example.com', accounts[1]);
        await registerUser(accounts[3], 'user2', 'passwordHash2', 'FirstName2', 'LastName2', 'email2@example.com', accounts[0]);

        // Retrieve a single user's details
        await getUser(accounts[0]);

        // Retrieve all users
        await getAllUsers();

        callback();
    } catch (error) {
        console.error(error);
        callback(error);
    }
};
