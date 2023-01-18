import useSignerContext from "@/context/signer"
import { GetOwnedNFTs, GetOwnedNFTsVariables } from "@/utils/type"
import { gql, useQuery } from "@apollo/client"
import { use } from "react"

const useOwnedNFTs = () => {
    const { address } = useSignerContext()

    const { data, error, loading } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
        GET_OWNED_NFTS,
        { variables: { owner: address ?? '' }, skip: !address }
    )

    const ownedNFTs = data?.nfts

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