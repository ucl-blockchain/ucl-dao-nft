// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const recipients = require("./airdrop_recipients.json")


async function main() {
  const NFT = await hre.ethers.getContractFactory("NFT");
  const baseURI = "https://gateway.pinata.cloud/ipfs/Qmc5YEcgBBUzvDCiUX62eXp92h3B7BaDYHKsFqZZEeEvgV/";
  const contractURI = "https://gateway.pinata.cloud/ipfs/QmUSLkbvAVNGiMb3rQMUbLGk8X6v7hso1Xj4TEWXM311jH";
  const nft = await NFT.deploy(3, baseURI, contractURI);
  await nft.deployed();
  console.log(
    `nft deployed to ${nft.address}`
  );
  let txn = await nft.airdrop(recipients);  
  console.log(txn);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
