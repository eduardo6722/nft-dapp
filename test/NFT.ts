import { expect } from 'chai';
import { ethers } from 'hardhat';
import { NFT } from '../typechain-types';

describe('NFT', function () {
  let deployed: NFT;
  async function deployContract() {
    const nft = await ethers.getContractFactory('NFT');
    const deploy = await nft.deploy('EDART_TOKEN', 'EDT');

    return deploy;
  }

  this.beforeAll(async () => {
    deployed = await deployContract();
  });

  describe('Deployment', () => {
    it('Should check if the contract was deployed', async function () {
      expect(deployed.address).to.exist;
    });
  });

  describe('Mint', () => {
    it('Should mint a new NFT', async () => {
      const [account] = await ethers.getSigners();
      const uri = 'https://example/id123.json';
      const transaction = await deployed.mint(account.address, uri);
      expect(transaction.hash).to.exist;
    });
  });
});
