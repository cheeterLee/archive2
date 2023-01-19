import { ethers } from "ethers"
import { GetOwnedNFTs_nfts, NFT } from "./type"

export const convertIpfsToHttps = (url: string) => {
    if (!url.startsWith("ipfs://")) {
        throw new Error("invalid ipfs url")
    }
    const cid = url.substring(7)
    return `https://ipfs.io/ipfs/${cid}`
}

export const shortenAddress = (address: string) => {
    const start = address.substring(0, 5)
    const end = address.substring(address.length - 4)
    return `${start}...${end}`
}

export const parseRawNFT = (raw: GetOwnedNFTs_nfts): NFT => {
    return {
        id: raw.id,
        owner: raw.price == '0' ? raw.to : raw.from,
        price: raw.price == '0' ? '0' : ethers.utils.formatEther(raw.price),
        tokenURI: raw.tokenURI,
    }
}