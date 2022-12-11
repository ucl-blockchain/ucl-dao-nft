const {expect} = require("chai");
const {ethers} = require("hardhat")

const recipients = require("../scripts/airdrop_recipients.json")

describe("NFT contract", function () {

    let nftContract, nftContractFactory;
    let owner, non_owner;
    const maxSupply = 3;
    const baseURI = "https://gateway.pinata.cloud/ipfs/Qmc5YEcgBBUzvDCiUX62eXp92h3B7BaDYHKsFqZZEeEvgV/";
    const contractURI = "https://gateway.pinata.cloud/ipfs/QmUSLkbvAVNGiMb3rQMUbLGk8X6v7hso1Xj4TEWXM311jH";

    beforeEach(async function () {
        [owner, non_owner] = await ethers.getSigners();
        nftContractFactory = await ethers.getContractFactory("NFT");
        nftContract = await nftContractFactory.deploy(maxSupply, baseURI, contractURI);
    })

    describe("Deployment", function () {

        it("Set the right supply/baseURI/contractURI", async function () {
            await expect(await nftContract.maxSupply()).to.equal(3);
            await expect(await nftContract.baseURI()).to.equal("https://gateway.pinata.cloud/ipfs/Qmc5YEcgBBUzvDCiUX62eXp92h3B7BaDYHKsFqZZEeEvgV/");
            await expect(await nftContract.contractURI()).to.equal("https://gateway.pinata.cloud/ipfs/QmUSLkbvAVNGiMb3rQMUbLGk8X6v7hso1Xj4TEWXM311jH");
        });
    });


    describe("Airdrop", function () {
        it("Should transfer tokens to recipients", async function () {
            let txn = await nft.airdrop(recipients);
        });
        it('should revert if non-owner tries to airdrop', function () {
        });
        it('should revert if the number of recipients is greater than the maxSupply', function () {
        });
        it('should revert if one of the recipients is a zero address', function () {
        });

    });

    describe("Setting Values", function () {

        it("Should update contractURI", async function () {
            let newContractURI = "hello world - contractURI";
            await nftContract.connect(owner).setContractURI(newContractURI);
            await expect(await nftContract.contractURI()).to.equal(newContractURI);
        });

        it("Should revert if non-owner tries to update contractURI", async function () {
            let newContractURI = "hello world - contractURI";
            await expect(nftContract.connect(non_owner).setContractURI(newContractURI)).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Should update baseURI", async function () {
            let newBaseURI = "hello world - baseURI";
            await nftContract.connect(owner).setBaseURI(newBaseURI);
            await expect(await nftContract.baseURI()).to.equal(newBaseURI);
        });

        it("Should revert if non-owner tries to update baseURI", async function () {
            let newBaseURI = "hello world - baseURI";
            await expect(nftContract.connect(non_owner).setBaseURI(newBaseURI)).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });
});
