const UserCredentials = artifacts.require("UserCredentials");

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = "0x556F24DA1141f0C912a465D7Fe99B4a2CF4706df"; // Update with the actual address
    const userCredentials = await UserCredentials.at(contractAddress);

    const username = "testuser3443";
    const passwordHash = "hashed_testpassword34434"; // Provide a hashed password

    // Check if user is already registered
    const isRegistered = await userCredentials.isRegistered.call({ from: accounts[0] });

    if (isRegistered) {
      console.log("User already registered:");
      const [registeredUsername, registeredPasswordHash] = await userCredentials.getUser.call({ from: accounts[0] });
      console.log("Username:", registeredUsername);
      console.log("Password hash:", registeredPasswordHash);
    } else {
      // Register a new user
      await userCredentials.register(username, passwordHash, { from: accounts[0] });
      console.log("User registered");

      // Get the user information after registration
      const [newUsername, newPasswordHash] = await userCredentials.getUser.call({ from: accounts[0] });
      console.log("Username after registration:", newUsername);
      console.log("Password hash after registration:", newPasswordHash);
    }

    // Get all users and log in JSON format
    const [usernames, passwordHashes] = await userCredentials.getAllUsers.call();
    const allUsers = usernames.map((username, index) => ({
      username,
      passwordHash: passwordHashes[index]
    }));

    console.log("All registered users:", JSON.stringify(allUsers, null, 2));

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
