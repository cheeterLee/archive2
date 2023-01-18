import { TransactionResponse } from "@ethersproject/abstract-provider"
import { Contract } from 'ethers'
import ArchiveMarket from '../../../smart_contract/artifacts/contracts/ArchiveMarket.sol/ArchiveMarket.json'
import { useSigner } from "wagmi"

type CreationValues = {
    name: string
    description: string
    image: File 
}

const VITE_ARCHIVE_MARKET_ADDRESS = import.meta.env.VITE_ARCHIVE_MARKET_ADDRESS as string

const useArchiveMarket = () => {
    const { data: signer } = useSigner()
    const archiveMarket = new Contract(VITE_ARCHIVE_MARKET_ADDRESS, ArchiveMarket.abi, signer!)
 
    const createNFT = async (values: CreationValues) => {
        try {
            const data = new FormData()
            data.append("name", values.name)
            data.append("description", values.description)
            data.append("image", values.image!)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/nft`, {
                method: "POST",
                body: data,
            })
            if (response.status === 201) {
                const json = await response.json()
                console.log('tokenURI', json.uri)
                const transsaction: TransactionResponse = await archiveMarket.createNFT(json.uri)
                await transsaction.wait()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { createNFT }
}

export default useArchiveMarket