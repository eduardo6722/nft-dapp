import { ethers } from 'hardhat';

async function main() {
  const contract = await ethers.getContractFactory('NFT');
  const deployment = await contract.deploy('EDART_TOKEN', 'EDT');
  console.info(`Contract deployed to ${deployment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
