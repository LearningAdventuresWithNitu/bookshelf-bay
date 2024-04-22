require('@nomicfoundation/hardhat-ethers');

const METAMASK_PRIVATE_KEY = 'YOUR_METAMASK_PRIVATE_KEY';

module.exports = {
  solidity: '0.8.20',
  paths: {
    artifacts: './frontend/src/artifacts'
  },
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287,
      accounts: [METAMASK_PRIVATE_KEY]
    }
  }
};