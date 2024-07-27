const UserCredentials = artifacts.require("UserCredentials");

module.exports = async function(deployer) {
  const instance = await deployer.deploy( UserCredentials );
  console.log("UserCredentials deployed at address:", instance.address);
};
