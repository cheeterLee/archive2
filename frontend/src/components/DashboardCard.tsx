import useArchiveMarket from "@/hooks/useArchiveMarket"
import { convertIpfsToHttps } from "@/utils/helper"
import { NFT, NFTMetaData } from "@/utils/type"
import {
	Card,
	CardBody,
	Stack,
	Heading,
	Divider,
	CardFooter,
	ButtonGroup,
	Button,
	Image,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import React, { useEffect, useRef, useState } from "react"

export interface IDashboardCardProps {
	nft: NFT
}

const DashboardCard: React.FunctionComponent<IDashboardCardProps> = ({
	nft,
}) => {
	const onSale = nft.price != "0"
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [metaData, setMetaData] = useState<NFTMetaData>()
	const [sellPrice, setSellPrice] = useState<string>("0.01")
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { listNFT } = useArchiveMarket()

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

	const handleSaleButtonClicked = () => {
		if (onSale) {
			handleCancelListing()
		} else {
			onOpen()
		}
	}

	const handleDetailButtonClicked = () => {}

	const handleSellConfirmed = async () => {
		const wei = ethers.utils.parseEther(sellPrice)
		console.log('price', wei)
		setIsLoading(true)
		try {
			await listNFT(nft.id, wei)
			onClose()
		} catch (error) {
			console.log(error)
		}
	}

	const handleCancelListing = () => {}

	useEffect(() => {
		fetchMetaData()
	}, [nft.tokenURI])

	return (
		<>
			<Card maxW="sm">
				<CardBody>
					<Image
						src={metaData?.imageURL}
						alt="Green double couch with wooden legs"
						borderRadius="lg"
						width="400px"
						height="300px"
						objectFit="cover"
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">{metaData?.name}</Heading>

						<Text fontSize="md">{metaData?.description}</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter>
					<ButtonGroup
						spacing="2"
						display="flex"
						width="100%"
						justifyContent="center"
					>
						<Button
							variant="ghost"
							colorScheme="teal"
							onClick={() => handleDetailButtonClicked()}
						>
							View Details
						</Button>
						<Button
							variant="ghost"
							colorScheme="teal"
							onClick={() => handleSaleButtonClicked()}
						>
							{onSale ? "Cancel Listing" : "List for sale"}
						</Button>
						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent style={{ marginTop: "15rem" }}>
								<ModalHeader>
									Enter the price in ETH :)
								</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<NumberInput
										defaultValue={0.01}
										min={0.01}
										step={0.01}
										name={'sellPrice'}
										value={sellPrice}
										onChange={priceString => setSellPrice(priceString)}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</ModalBody>
								<ModalFooter>
									<Button
										variant="ghost"
										colorScheme="pink"
										isLoading={isLoading}
										loadingText='Confriming...'
										onClick={() => handleSellConfirmed()}
									>
										Confirm
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</ButtonGroup>
				</CardFooter>
			</Card>
		</>
	)
}

export default DashboardCard
