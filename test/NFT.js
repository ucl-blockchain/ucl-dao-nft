const { expect } = require("chai");
const { ethers } = require("hardhat")

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
            await nftContract.connect(owner).airdrop(recipients);

            for (let i = 0; i < 3; i++) {
                let tokenHolder = await nftContract.getOwnershipData(i);
                expect(tokenHolder[0]).to.equal(recipients[i]);
            }
        });

        it('should revert if non-owner tries to airdrop', async function () {
            await expect(nftContract.connect(non_owner).airdrop(recipients)).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it('should revert if the number of recipients is greater than the maxSupply', async function () {
            let newRecipients = Array(maxSupply + 1).fill(owner.address);
            await expect(nftContract.connect(owner).airdrop(newRecipients)).to.be.revertedWith("Max supply reached");
        });

        it('should revert if one of the recipients is a zero address', async function () {
            let newRecipients = [ethers.constants.AddressZero];
            await expect(nftContract.connect(owner).airdrop(newRecipients)).to.be.revertedWith("Can't mint to zero address");
        });

    });

    describe("Setting Values", function () {

        let newBaseURI = "new baseURI";
        let newContractURI = "new contractURI";

        it("Should update contractURI", async function () {
            await nftContract.connect(owner).setContractURI(newContractURI);
            await expect(await nftContract.contractURI()).to.equal(newContractURI);
        });

        it("Should revert if non-owner tries to update contractURI", async function () {
            await expect(nftContract.connect(non_owner).setContractURI(newContractURI)).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Should update baseURI", async function () {
            await nftContract.connect(owner).setBaseURI(newBaseURI);
            await expect(await nftContract.baseURI()).to.equal(newBaseURI);
        });

        it("Should revert if non-owner tries to update baseURI", async function () {
            await expect(nftContract.connect(non_owner).setBaseURI(newBaseURI)).to.be.revertedWith("Ownable: caller is not the owner");
        });

    });
});
