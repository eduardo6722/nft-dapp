import { expect } from 'chai';
import { ethers } from 'hardhat';
import { NFT } from '../typechain-types';

describe('NFT', function () {
  const name = 'EDART_TOKEN';
  const symbol = 'EDT';
  let deployed: NFT;
  async function deployContract() {
    const nft = await ethers.getContractFactory('NFT');
    const deploy = await nft.deploy(name, symbol);

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

    it('Should match the symbol', async () => {
      const _symbol = await deployed.symbol();
      expect(_symbol).to.be.equal(symbol);
    });

    it('Should match the name', async () => {
      const _name = await deployed.name();
      expect(_name).to.be.equal(name);
    });
  });
});
