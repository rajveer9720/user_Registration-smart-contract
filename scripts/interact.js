const UserCredentials = artifacts.require("UserCredentials");

module.exports = async function(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = "0x181B43058fBe2582e4f6a2e6DaD23046f99657Db"; // Update with the actual address
    const userCredentials = await UserCredentials.at(contractAddress);

    const username = "testuser3443";
    const passwordHash = "hashed_testpassword34434"; // Provide a hashed password
    const firstname = "Test";
    const lastname = "User";
    const email = "testuser@example.com";
    const referral = accounts[1]; // Assuming account[1] referred account[0]

    // Check if user is already registered
    const isRegistered = await userCredentials.isRegistered.call({ from: accounts[0] });

    if (isRegistered) {
      console.log("User already registered:");
      const [registeredUsername, registeredPasswordHash, registeredFirstname, registeredLastname, registeredEmail, registeredReferral] = await userCredentials.getUser.call({ from: accounts[0] });
      console.log("Username:", registeredUsername);
      console.log("Password hash:", registeredPasswordHash);
      console.log("Firstname:", registeredFirstname);
      console.log("Lastname:", registeredLastname);
      console.log("Email:", registeredEmail);
      console.log("Referral:", registeredReferral);
    } else {
      // Register a new user
      await userCredentials.register(username, passwordHash, firstname, lastname, email, referral, { from: accounts[0] });
      console.log("User registered");

      // Get the user information after registration
      const [newUsername, newPasswordHash, newFirstname, newLastname, newEmail, newReferral] = await userCredentials.getUser.call({ from: accounts[0] });
      console.log("Username after registration:", newUsername);
      console.log("Password hash after registration:", newPasswordHash);
      console.log("Firstname after registration:", newFirstname);
      console.log("Lastname after registration:", newLastname);
      console.log("Email after registration:", newEmail);
      console.log("Referral after registration:", newReferral);
    }

    // Get all users and log in JSON format
    const [usernames, passwordHashes, firstnames, lastnames, emails, referrals] = await userCredentials.getAllUsers.call();
    const allUsers = usernames.map((username, index) => ({
      username,
      passwordHash: passwordHashes[index],
      firstname: firstnames[index],
      lastname: lastnames[index],
      email: emails[index],
      referral: referrals[index]
    }));

    console.log("All registered users:", JSON.stringify(allUsers, null, 2));

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
