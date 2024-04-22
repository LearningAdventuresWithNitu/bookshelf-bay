const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory('Library');
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();
  
  // Get and print the contract address
  const myContractDeployedAddress = await contract.getAddress();
  console.log(`Deployed to ${myContractDeployedAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});