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


