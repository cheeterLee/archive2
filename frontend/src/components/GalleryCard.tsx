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
} from "@chakra-ui/react"
import { BiLike, BiChat, BiShoppingBag } from "react-icons/bi"
import Blockies from "react-blockies"
import {
	BsThreeDotsVertical,
	BsEyeSlash,
	BsHandThumbsDown,
} from "react-icons/bs"
import useSignerContext from "@/context/SignerContext"

export interface IGallertCardProps {
	nft: NFT
}

const GallertCard: React.FunctionComponent<IGallertCardProps> = ({ nft }) => {
	const [metaData, setMetaData] = useState<NFTMetaData>()
    const [displayed, setDisplayed] = useState<string>("block")
    const { address } = useSignerContext()
    const isSellerOwner = address?.toLowerCase() === nft.owner.toLowerCase()

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

	const handleClick = () => {}

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
			<CardBody cursor="pointer" onClick={handleClick}>
				<Text noOfLines={1}>{metaData?.description}</Text>
			</CardBody>
			<Image
				objectFit="cover"
                width='400px'
                height='300px'
				src={metaData?.imageURL}
				alt="image asset"
				cursor="pointer"
				onClick={handleClick}
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
                    isDisabled={isSellerOwner}
					leftIcon={<BiShoppingBag />}
                    onClick={() => console.log('clicked')}
				>
					{isSellerOwner ? 'You are the owner' : 'Purchase'}
				</Button>
			</CardFooter>
		</Card>
	)
}

export default GallertCard
