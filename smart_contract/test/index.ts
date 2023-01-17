import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe("ArchiveMarket", () => {
	let archiveMarket: Contract
	let signers: SignerWithAddress[]

	before(async () => {
		// deploy ArchiveMarket contract
		const ArchiveMarket = await ethers.getContractFactory("ArchiveMarket")
		archiveMarket = await ArchiveMarket.deploy()
		await archiveMarket.deployed()
		signers = await ethers.getSigners()
	})

	describe("createNFT", () => {
		it("Should create an NFT with correct owener address and tokenURI", async () => {
            // call createNFT function
			const tokenURI = "https://some-token.uri"
			const transaction = await archiveMarket.createNFT(tokenURI)
			const receipt = await transaction.wait()
            const tokenId = receipt.events[0].args.tokenId

            // assert created NFT's token uri is same as the one passed into createNFT
            const mintedTokenURI = await archiveMarket.tokenURI(tokenId)
            expect(mintedTokenURI).to.equal(tokenURI)

            // assert created NFT's owner is same as the one called createNFT
            const owenerAddress = await archiveMarket.ownerOf(tokenId)
            const currentAddress = await signers[0].getAddress()
            expect(owenerAddress).to.equal(currentAddress)

            // assert NFTTransfer event has correct arguments
            const args = receipt.events[1].args
            expect(args.tokenId).to.equal(tokenId)
            expect(args.from).to.equal(ethers.constants.AddressZero)
            expect(args.to).to.equal(owenerAddress)
            expect(args.tokenURI).to.equal(tokenURI)
            expect(args.price).to.equal(0)
		})
	})
})
