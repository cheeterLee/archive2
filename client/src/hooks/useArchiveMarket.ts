import { TransactionResponse } from "@ethersproject/abstract-provider"

type CreationValues = {
    name: string
    description: string
    image: File 
}

const useArchiveMarket = () => {
    

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
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { createNFT }
}

export default useArchiveMarket