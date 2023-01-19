// nft
export type NFT = {
    id: string
    owner: string
    price: string
    tokenURI: string
}

// meta data stored in ipfs
export type NFTMetaData = {
	name: string
	description: string
	imageURL: string
}

// get owned nfts
export interface GetOwnedNFTs_nfts {
	__typename: "NFT"
	id: string
	from: any
	to: any
	tokenURI: string
	price: any
}

export interface GetOwnedNFTs {
	nfts: GetOwnedNFTs_nfts[]
}

export interface GetOwnedNFTsVariables {
	owner: string
}


