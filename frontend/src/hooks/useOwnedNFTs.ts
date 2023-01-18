import useSignerContext from "@/context/signer"
import { GetOwnedNFTs, GetOwnedNFTsVariables, GetOwnedNFTs_nfts, NFT } from "@/utils/type"
import { gql, useQuery } from "@apollo/client"
import { ethers } from "ethers"

const useOwnedNFTs = () => {
    const { address } = useSignerContext()

    const { data, error, loading } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
        GET_OWNED_NFTS,
        { variables: { owner: address ?? '' }, skip: !address }
    )

    const ownedNFTs = data?.nfts.map(parsedRawNFT)

    return { ownedNFTs }
}

const parsedRawNFT = (raw: GetOwnedNFTs_nfts): NFT => {
    return {
        id: raw.id,
        owner: raw.price == '0' ? raw.to : raw.from,
        price: raw.price == '0' ? '0' : ethers.utils.formatEther(raw.price),
        tokenURI: raw.tokenURI,
    }
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