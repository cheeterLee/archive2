import useSignerContext from "@/context/SignerContext"
import { parseRawNFT } from "@/utils/helper"
import { GetOwnedNFTs, GetOwnedNFTsVariables, GetOwnedNFTs_nfts, NFT } from "@/utils/type"
import { gql, useQuery } from "@apollo/client"

const useOwnedNFTs = () => {
    const { address } = useSignerContext()
    
    const { data, error, loading } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
        GET_OWNED_NFTS,
        { variables: { owner: address ?? '' }, skip: !address }
    )
    
    const ownedNFTs = data?.nfts.map(parseRawNFT)

    return { ownedNFTs }
}

const GET_OWNED_NFTS = gql `
    query GetOwnedNFTs($owner: String!) {
        nfts(where: { to: $owner }) {
            id
            from 
            to
            tokenURI
            price
        }
    }
`

export default useOwnedNFTs