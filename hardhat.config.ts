import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import('dotenv');

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY as string],
    },
  },
};

export default config;
