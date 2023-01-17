import { ethers } from "hardhat"

async function main() {
	const ArchiveMarket = await ethers.getContractFactory('ArchiveMarket')
	const archiveMarket = await ArchiveMarket.deploy()
	await archiveMarket.deployed()
	console.log('deployed to', archiveMarket.address)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
