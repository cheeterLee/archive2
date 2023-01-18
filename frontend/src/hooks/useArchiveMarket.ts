import { TransactionResponse } from "@ethersproject/abstract-provider"
import { Contract } from 'ethers'
import ArchiveMarket from '../../../smart_contract/artifacts/contracts/ArchiveMarket.sol/ArchiveMarket.json'
import { useSigner } from "wagmi"

type CreationValues = {
    name: string
    description: string
    image: File 
}

const ARCHIVE_MARKET_ADDRESS = process.env.NEXT_PUBLIC_ARCHIVE_MARKET_ADDRESS as string

const useArchiveMarket = () => {
    const { data: signer } = useSigner()
    const archiveMarket = new Contract(ARCHIVE_MARKET_ADDRESS, ArchiveMarket.abi, signer!)
 
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