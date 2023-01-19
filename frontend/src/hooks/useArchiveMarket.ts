import { TransactionResponse } from "@ethersproject/abstract-provider"
import { BigNumber, Contract, ethers } from "ethers"
import ArchiveMarket from "./ArchiveMarket.json"
// import { useSigner } from "wagmi"
import useSignerContext from "@/context/SignerContext"
import useOwnedNFTs from "./useOwnedNFTs"
import { ARCHIVE_MARKET_ADDRESS } from "@/utils/config"
import useListedButOwnedNFTs from "./useListedButOwnedNFTs"
import useListedNFTs from "./useListedNFTs"
import { NFT } from "@/utils/type"

type CreationValues = {
	name: string
	description: string
	image: File
}

const useArchiveMarket = () => {
	const { signer } = useSignerContext()
	const archiveMarket = new Contract(
		ARCHIVE_MARKET_ADDRESS,
		ArchiveMarket.abi,
		signer!
	)

	const createNFT = async (values: CreationValues) => {
		try {
			const data = new FormData()
			data.append("name", values.name)
			data.append("description", values.description)
			data.append("image", values.image!)
			const response = await fetch(`/api/nft`, {
				method: "POST",
				body: data,
			})
			if (response.status === 201) {
				const json = await response.json()
				console.log("tokenURI", json.uri)
				const transaction: TransactionResponse =
					await archiveMarket.createNFT(json.uri)
				await transaction.wait()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const listNFT = async (tokenId: string, price: BigNumber) => {
		const transaction: TransactionResponse = await archiveMarket.listNFT(
			tokenId,
			price
		)
		await transaction.wait()
	}

	const cancelListing = async (tokenId: string) => {
		const transaction: TransactionResponse =
			await archiveMarket.cancelListing(tokenId)
		await transaction.wait()
	}

	const purchaseNFT = async (nft: NFT) => {
		const transaction: TransactionResponse = await archiveMarket.purchaseNFT(
			nft.id, { value: ethers.utils.parseEther(nft.price) }
		)
		await transaction.wait()
	}

	const ownedNFTs = useOwnedNFTs()
	const listedButOwnedNFTs = useListedButOwnedNFTs()
	const listedNFTs = useListedNFTs()

	return {
		createNFT,
		listNFT,
		cancelListing,
		purchaseNFT,
		...ownedNFTs,
		...listedButOwnedNFTs,
		...listedNFTs,
	}
}

export default useArchiveMarket
