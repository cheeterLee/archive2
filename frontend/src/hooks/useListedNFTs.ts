import { gql, useQuery } from "@apollo/client"
import useSignerContext from "@/context/SignerContext"
import { ARCHIVE_MARKET_ADDRESS } from "@/utils/config"
import { GetListedNFTs, GetListedNFTsVariables } from "@/utils/type"
import { parseRawNFT } from "@/utils/helper"

const useListedNFTs = () => {
    const { address } = useSignerContext()

    const { data } = useQuery<GetListedNFTs, GetListedNFTsVariables>(
        GET_LISTED_NFTS,
        // { variables: { currentAddress: address ?? '' } }
    ) 
    
    const listedNFTs = data?.nfts.map(parseRawNFT)

    return { listedNFTs }
}

const GET_LISTED_NFTS = gql`
  query GetListedNFTs($currentAddress: String) {
    nfts(
      where: {
        to: "${ARCHIVE_MARKET_ADDRESS}"
        # from_not: $currentAddress
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
export default useListedNFTs