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

	const createAndListNFT = async (price: number) => {
		const tokenId = await createNFT("https://some-token.uri")
		const transaction = await archiveMarket.listNFT(tokenId, price)
		await transaction.wait()
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
			expect(args.tokenURI).to.equal("")
			expect(args.price).to.equal(price)
		})
	})

	describe("cancelListing", () => {
		it("Should revert if nft is not listed for sale", async () => {
			const transaction = archiveMarket.cancelListing(9999)
			await expect(transaction).to.be.revertedWith(
				"ArvhiveMarket: NFT is not listed for sale"
			)
		})

		it("Should be revert if the caller is not the seller of the listing", async () => {
			const tokenId = await createAndListNFT(100)
			const transaction = archiveMarket
				.connect(signers[1])
				.cancelListing(tokenId)
			expect(transaction).to.be.revertedWith(
				"ArchiveMarket: You are not the seller"
			)
		})

		it("Should transfer the owneership back to the seller if all requirements are met", async () => {
			const tokenId = await createAndListNFT(100)
			const transaction = await archiveMarket.cancelListing(tokenId)
			const receipt = await transaction.wait()

			// check ownership
			const ownerAddress = await archiveMarket.ownerOf(tokenId)
			expect(ownerAddress).to.equal(signers[0].address)

			// check NFTTransfer event arguments
			const args = receipt.events[1].args
			expect(args.tokenId).to.equal(tokenId)
			expect(args.from).to.equal(archiveMarket.address)
			expect(args.to).to.equal(signers[0].address)
			expect(args.tokenURI).to.equal("")
			expect(args.price).to.equal(0)
		})
	})

	describe("purchaseNFT", () => {
		it("Should revert if NFT is not listed for sale", async () => {
			const transaction = archiveMarket.purchaseNFT(9999)
			await expect(transaction).to.be.revertedWith(
				"ArchiveMarket: NFT is not listed for sale"
			)
		})

		it("Should transfer ownership to the buyer and send the price to the seller", async () => {
			const price = 100
			const sellerProfit = Math.floor((price * 98) / 100)
			const fee = price - sellerProfit
			const initialContractBalance =
				await archiveMarket.provider.getBalance(archiveMarket.address)
			const tokenId = await createAndListNFT(price)
			await new Promise((r) => setTimeout(r, 100))
			const oldSellerBalance = await signers[0].getBalance()
			const transaction = await archiveMarket
				.connect(signers[1])
				.purchaseNFT(tokenId, { value: price })
			const receipt = await transaction.wait()

			// 2% price was kept in contract balance
			await new Promise((r) => setTimeout(r, 100))
			const newSellerBalance = await signers[0].getBalance()
			const diff = newSellerBalance.sub(oldSellerBalance)
			expect(diff).to.equal(sellerProfit)

			const newContractBalance = await archiveMarket.provider.getBalance(
				archiveMarket.address
			)
			const contractBalanceDiff = newContractBalance.sub(
				initialContractBalance
			)
			expect(contractBalanceDiff).to.equal(fee)

			// ensure NFT ownership was transferred to the buyer
			const ownerAddress = await archiveMarket.ownerOf(tokenId)
			expect(ownerAddress).to.equal(signers[1].address)

			// ensure NFTTransfer event has the correct arguments
			const args = receipt.events[1].args
			expect(args.tokenId).to.equal(tokenId)
			expect(args.from).to.equal(archiveMarket.address)
			expect(args.to).to.equal(signers[1].address)
			expect(args.tokenURI).to.equal("")
			expect(args.price).to.equal(0)
		})
	})

	describe("withdrawFunds", () => {
		it("Should revert if called by a signer other than the owner", async () => {
			const transaction = archiveMarket.connect(signers[1]).withdrawFunds()
			await expect(transaction).to.be.revertedWith(
				"Ownable: caller is not the owner"
			)
		})

		it("Should transfer all funds from the contract balance to the owner's", async () => {
			const contractBalance = await archiveMarket.provider.getBalance(
				archiveMarket.address
			)
			const initialOwnerBalance = await signers[0].getBalance()
			const transaction = await archiveMarket.withdrawFunds()
			const receipt = await transaction.wait()

			const gas = receipt.gasUsed.mul(receipt.effectiveGasPrice)

			await new Promise((r) => setTimeout(r, 100))
			const newOwnerBalance = await signers[0].getBalance()

			const transferred = newOwnerBalance
				.add(gas)
				.sub(initialOwnerBalance)
			expect(transferred).to.equal(contractBalance)
		})

		it("Should revert if contract balance is zero", async () => {
			const transaction = archiveMarket.withdrawFunds()
			await expect(transaction).to.be.revertedWith(
				"ArchiveMarket: balance is zero"
			)
		})
	})
})
