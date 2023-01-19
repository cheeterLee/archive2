import { gql, useQuery } from "@apollo/client"
import useSignerContext from '../context/SignerContext'
import { ARCHIVE_MARKET_ADDRESS } from "@/utils/config"
import { GetListedButOwnedNFTs, GetListedButOwnedNFTsVariables } from "@/utils/type"
import { parseRawNFT } from "@/utils/helper"

const useListedButOwnedNFTs = () => {
    const { address } = useSignerContext()
    const { data } = useQuery<GetListedButOwnedNFTs, GetListedButOwnedNFTsVariables>(
        GET_LISTED_BUT_OWNED_NFTS,
        { variables: { owner: address ?? "" }, skip: !address }
    )

    const listedButOwnedNFTs = data?.nfts.map(parseRawNFT)

    return { listedButOwnedNFTs }
}

const GET_LISTED_BUT_OWNED_NFTS = gql `
    query GetListedButOwnedNFTs($owner: String!) {
        nfts(
            where: {
                to: "${ARCHIVE_MARKET_ADDRESS}"
                from: $owner
            }
        ) {
            id
            from
            to
            tokenURI
            price
        }
    }
`

export default useListedButOwnedNFTs