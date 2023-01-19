import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Flex,
	Heading,
	Image,
	Stack,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

export interface IDetailPageProps {}

const DetailPage: React.FunctionComponent<IDetailPageProps> = (props) => {
	const router = useRouter()

	const {
		query: { name, description, imageURL, owner, price, tokenURI },
	} = router

    const stateProps = { name, description, imageURL, owner, price, tokenURI }
	const imageUrl = imageURL as string // 💩 typescript, always warning
	
	return (
		<Flex
			flexDirection={{
				xs: "column",
				sm: "column",
				md: "row",
				lg: "row",
				xl: "row",
			}}
			justify="center"
			p="1.5rem 1rem"
		>
			<Box p="1rem 2rem">
				<Card maxW="xl">
					<CardBody>
						<Image
							src={imageUrl}
							alt="image"
							borderRadius="lg"
						/>
						<Stack mt="6" spacing="3">
							<Heading size="md" textAlign="center">
								{stateProps.description}
							</Heading>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter display="flex" justifyContent="center">
						<ButtonGroup spacing="2">
							<Button variant="solid" colorScheme="blue">
								Buy now
							</Button>
							<Button variant="ghost" colorScheme="blue">
								Add to cart
							</Button>
						</ButtonGroup>
					</CardFooter>
				</Card>
			</Box>
			<Box>
				<Tabs isFitted variant="enclosed">
					<TabList mb="1em">
						<Tab>Description</Tab>
						<Tab>Transaction History</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Flex>
	)
}

export default DetailPage
