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

// get listed but owned nfts
export interface GetListedButOwnedNFTs_nfts {
	__typename: "NFT"
	id: string
	from: any
	to: any
	tokenURI: string
	price: any
}

export interface GetListedButOwnedNFTs {
	nfts: GetListedButOwnedNFTs_nfts[]
}

export interface GetListedButOwnedNFTsVariables {
	owner: string
}

// get listed nfts
export interface GetListedNFTs_nfts {
	__typename: "NFT"
	id: string
	from: any
	to: any
	tokenURI: string
	price: any
}

export interface GetListedNFTs {
	nfts: GetListedNFTs_nfts[]
}

export interface GetListedNFTsVariables {
	currentAddress: string
}
