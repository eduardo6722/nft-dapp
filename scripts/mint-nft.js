require('dotenv').config();
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const contract = require('../artifacts/contracts/NFT.sol/NFT.json');

const web3 = createAlchemyWeb3(process.env.ALCHEMY_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNft(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(
    process.env.WALLET_PUBLIC_KEY
  );
  const tx = {
    from: process.env.WALLET_PUBLIC_KEY,
    to: contractAddress,
    nonce,
    gas: 500000,
    maxPriorityFeePerGas: 1999999987,
    data: instance.methods
      .mint(process.env.WALLET_PUBLIC_KEY, tokenURI)
      .encodeABI(),
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    process.env.WALLET_PRIVATE_KEY
  );
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.info(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

mintNft(
  '' // metadata URI goes here
);
