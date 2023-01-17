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

	const createNFT = async (tokenURI: string) => {
		const transaction = await archiveMarket.createNFT(tokenURI)
		const receipt = await transaction.wait()
		const tokenId = receipt.events[0].args.tokenId
		return tokenId
	}

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

	describe("listNFT", () => {
		const tokenURI = "https://some-token.uri"
		it("Should revert if price is zero", async () => {
			const tokenId = await createNFT(tokenURI)
			const transaction = archiveMarket.listNFT(tokenId, 0)
			await expect(transaction).to.be.revertedWith(
				"ArchiveMarket: Price must be greater than 0"
			)
		})

		it("Should be revert if not called by the owner", async () => {
			const tokenId = await createNFT(tokenURI)
			const transaction = archiveMarket
				.connect(signers[1])
				.listNFT(tokenId, 10)
			await expect(transaction).to.be.revertedWith(
				"ERC721: approve caller is not token owner or approved for all"
			)
		})

		it("Should list the token for sale if all requirements are met", async () => {
            const price = 10
            const tokenId = await createNFT(tokenURI)
            const transaction = await archiveMarket.listNFT(tokenId, price)
            const receipt = await transaction.wait()

            // ownership should be transferred to the contract
            const owenerAddress = await archiveMarket.ownerOf(tokenId)
            expect(owenerAddress).to.equal(archiveMarket.address)

            // NFTTransfer event should have correct arguments
            const args = receipt.events[2].args
            expect(args.tokenId).to.equal(tokenId)
            expect(args.from).to.equal(signers[0].address)
            expect(args.to).to.equal(archiveMarket.address)
            expect(args.tokenURI).to.equal('')
            expect(args.price).to.equal(price)
        })
	})
})
