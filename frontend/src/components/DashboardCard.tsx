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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

export interface IDashboardCardProps {
	nft: NFT
}

const DashboardCard: React.FunctionComponent<IDashboardCardProps> = ({
	nft,
}) => {
    const [metaData, setMetaData] = useState<NFTMetaData>()

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
                        width='400px'
                        height='300px'
                        objectFit='cover'
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">{metaData?.name}</Heading>

						<Text fontSize="md">
							{metaData?.description}
						</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter>
					<ButtonGroup spacing="2" display='flex' width='100%' justifyContent='center'>
						<Button variant="ghost" colorScheme="teal">
							View Details
						</Button>
						<Button variant="ghost" colorScheme="teal">
							List for sale
						</Button>
					</ButtonGroup>
				</CardFooter>
			</Card>
		</>
	)
}

export default DashboardCard
