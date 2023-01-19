import React, { useEffect, useState } from "react"
import { convertIpfsToHttps, shortenAddress } from "@/utils/helper"
import { NFT, NFTMetaData } from "@/utils/type"
import {
	Card,
	CardHeader,
	Flex,
	Image,
	Text,
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
	CardBody,
	CardFooter,
	Button,
	useToast
} from "@chakra-ui/react"
import { BiLike, BiChat, BiShoppingBag } from "react-icons/bi"
import Blockies from "react-blockies"
import {
	BsThreeDotsVertical,
	BsEyeSlash,
	BsHandThumbsDown,
} from "react-icons/bs"
import useSignerContext from "@/context/SignerContext"
import useArchiveMarket from "@/hooks/useArchiveMarket"
import { useRouter } from "next/router"

export interface IGallertCardProps {
	nft: NFT
}

const GallertCard: React.FunctionComponent<IGallertCardProps> = ({ nft }) => {
	const [metaData, setMetaData] = useState<NFTMetaData>()
    const [displayed, setDisplayed] = useState<string>("block")
	const [isLoading, setIsLoading] = useState<boolean>(false)
    const { address } = useSignerContext()
	const { purchaseNFT } = useArchiveMarket()
    const isSellerOwner = address?.toLowerCase() === nft.owner.toLowerCase()
	const toast = useToast()
	const router = useRouter()

	const fetchMetaData = async () => {
		const metaDataResponse = await fetch(convertIpfsToHttps(nft.tokenURI))
		if (metaDataResponse.status != 200) return
		const json = await metaDataResponse.json()
		setMetaData({
			name: json.name,
			description: json.description,
			imageURL: convertIpfsToHttps(json.image),
		})
	}

	const handleNavigate = () => {
		router.push({
			pathname: `/gallery/${nft.id}`,
			query: {
				name: metaData?.name,
				description: metaData?.description,
				imageURL: metaData?.imageURL,
				owner: nft.owner,
				price: nft.price,
				tokenURI: nft.tokenURI
			},
		})
	}

	const handlePurchaseButtonClicked = async () => {
		setIsLoading(true)
		try {
			await purchaseNFT(nft)
			toast({
				title: 'Successfully purchased :)',
				description: "Wait a second and reload the page to see result.",
				status: 'success',
				duration: 2000,
				isClosable: true,
			})
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		fetchMetaData()
	}, [nft.tokenURI])

	return (
		<Card
			maxW="400px"
            // height='600px'
			padding="1rem 2rem"
			display={displayed}
			// TODO: stop hover event propagating
			_hover={{
				bg: "blackAlpha.100",
			}}
		>
			<CardHeader>
				<Flex>
					<Flex flex="1" gap="4" alignItems="center" maxW="100%">
						{/* <Avatar /> */}
                        <Blockies seed={nft.owner} />
						<Text noOfLines={1}>{shortenAddress(nft.owner)}</Text>
					</Flex>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="options"
							variant="ghost"
							icon={<BsThreeDotsVertical />}
						/>
						<MenuList>
							<MenuItem
								gap=".5rem"
								onClick={() => {
									setDisplayed("none")
								}}
							>
								<BsEyeSlash />
								Not interested
							</MenuItem>
							<MenuItem
								gap=".5rem"
								onClick={() => {
									//TODO navigate to report
								}}
							>
								<BsHandThumbsDown />
								Report
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</CardHeader>
			<CardBody cursor="pointer" onClick={handleNavigate}>
				<Text noOfLines={1}>{metaData?.description}</Text>
			</CardBody>
			<Image
				objectFit="cover"
                width='400px'
                height='300px'
				src={metaData?.imageURL}
				alt="image asset"
				cursor="pointer"
				onClick={handleNavigate}
			/>

			<CardFooter
				justify="space-evenly"
				gap=".2rem"
				flexWrap="wrap"
				sx={{
					"& > button": {
						minW: "80px",
					},
				}}
			>
				{/* <Button
					fontSize=".9rem"
					flex="1"
					variant="ghost"
					leftIcon={<BiLike />}
				>
					Like
				</Button>
				<Button
					transform="translateX(-10px)"
					fontSize=".9rem"
					flex="1"
					variant="ghost"
					leftIcon={<BiChat />}
				>
                // TODO
					Comment
            </Button> */} 
				<Button
					fontSize=".9rem"
					flex="1"
					variant="outline"
					isLoading={isLoading}
					loadingText="on the way..."
                    isDisabled={isSellerOwner}
					leftIcon={<BiShoppingBag />}
                    onClick={() => handlePurchaseButtonClicked()}
				>
					{isSellerOwner ? 'You are the owner' : `Purchase ETH ${nft.price}`}
				</Button>
			</CardFooter>
		</Card>
	)
}

export default GallertCard
