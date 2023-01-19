import GalleryCard from "@/components/GalleryCard"
import PlaceHolder from "@/components/Placeholder"
import useSignerContext from "@/context/SignerContext"
import useArchiveMarket from "@/hooks/useArchiveMarket"
import { Box, Divider, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react"
import React from "react"

export interface IGalleryPageProps {}

const GalleryPage: React.FunctionComponent<IGalleryPageProps> = (props) => {
	const { signer } = useSignerContext()
    const { listedNFTs } = useArchiveMarket()
    const isLoading = signer && !listedNFTs

	return (
        <Box padding="1rem 3rem" display='flex' flexDirection='column' alignItems='center'>
			<Heading as="h4" size="md" padding='1rem'>
				All NFTs for sale 🕶 - {listedNFTs?.length}
			</Heading>
			<Divider />
			{isLoading && (
				<Stack gap=".2rem" padding="2rem">
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
					<Skeleton height="5rem" width='80vw' />
				</Stack>
			)}
			
            
			<Flex padding='1rem .5rem' gap='1.5rem' flexWrap='wrap'>
				{!isLoading &&
					
					listedNFTs?.map((nft) => (
						<GalleryCard key={nft.id} nft={nft} />
				))}
			</Flex>
		</Box>
    )
}

export default GalleryPage
