const UserCredentials = artifacts.require("UserCredentials");

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = "0x317dd8dA7dF3AdAcd880a374614E84F3D3b8fCE4"; // Update this line with the actual address
    const userCredentials = await UserCredentials.at(contractAddress); // Use the address to create an instance

    const username = "testuser";
    const password = "";

    // Check if the user already exists
    const existingUser = await userCredentials.getUser(accounts[0]);
    
    if (existingUser !== "") {
      console.log("User already exists with username:", existingUser);

      // Verify the password
      const isPasswordCorrect = await userCredentials.verifyPassword(accounts[0], password);
      console.log("Is password correct?", isPasswordCorrect);
    } else {
      // Register a new user if it does not exist
      await userCredentials.register(username, password, { from: accounts[0] });
      console.log("User registered");

      // Get the username
      const newUsername = await userCredentials.getUser(accounts[0]);
      console.log("Username:", newUsername);
    }

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
