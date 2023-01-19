import useArchiveMarket from "@/hooks/useArchiveMarket"
import React from "react"
import {
	Box,
	Flex,
	Stack,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Button,
	Heading,
	Text,
} from "@chakra-ui/react"
import Blockies from "react-blockies"
import useSignerContext from "@/context/signer"
import PlaceHolder from "@/components/Placeholder"

export interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {
	const { ownedNFTs } = useArchiveMarket()
	const { address } = useSignerContext()
	console.log(ownedNFTs)
	
    if (!address) {
        return <PlaceHolder />
    }

    return (
        <Box w="100%" h="100%">
            <Stack padding='1.5rem 2rem'>
                <Flex justifyContent='center' alignItems='center' gap='.7rem'>
                    <Box>
                        <Blockies seed={address!.toLowerCase()} />
                    </Box>
                    <Text>{address}</Text>
                </Flex>
            </Stack>
            <Box></Box>
        </Box>
    )
}

export default DashboardPage
