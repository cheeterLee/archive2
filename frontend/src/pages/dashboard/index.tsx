import useArchiveMarket from "@/hooks/useArchiveMarket"
import React from "react"
import {
	Box,
	Flex,
	Stack,
	Divider,
	Text,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react"
import Blockies from "react-blockies"
import useSignerContext from "@/context/signer"
import PlaceHolder from "@/components/Placeholder"
import DashboardCard from "@/components/DashboardCard"

export interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {
	const { ownedNFTs, listedButOwnedNFTs } = useArchiveMarket()
	const { address } = useSignerContext()
	// console.log(ownedNFTs)
	console.log(listedButOwnedNFTs)
	

	if (!address) {
		return <PlaceHolder />
	}

	return (
		<Box w="100%" h="100%">
			<Stack padding="1.5rem 2rem">
				<Flex justifyContent="center" alignItems="center" gap=".7rem">
					<Box>
						<Blockies seed={address!.toLowerCase()} />
					</Box>
					<Text>{address}</Text>
				</Flex>
				<Divider />
				<Flex>
					<Tabs isFitted variant="enclosed" width="100vw">
						<TabList mb="1em">
							<Tab>Owned</Tab>
							<Tab>Listed for sale</Tab>
						</TabList>
						<TabPanels>
							<TabPanel display='flex' flexWrap='wrap' justifyContent='center' gap='1rem'>
								{ownedNFTs?.map((nft) => (
                                    <DashboardCard key={nft.id} nft={nft} />
								))}
							</TabPanel>
							<TabPanel>
								<p>two!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>
			</Stack>
			<Box></Box>
		</Box>
	)
}

export default DashboardPage
