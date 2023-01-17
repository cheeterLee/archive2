import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Text,
	Stack,
	Image,
	useToast,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	IconButton,
	Portal,
	Divider,
	Badge,
	Textarea,
} from "@chakra-ui/react"
import React, { FormEvent, useState } from "react"
import { CustomDropzone } from "../components"

import { QuestionOutlineIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { useAccount } from "wagmi"

export interface IUploadPageProps {}

const UploadPage: React.FunctionComponent<IUploadPageProps> = (props) => {
	// chakra toast
	const toast = useToast()
	// upload image file captured from CustomDropzone
	const [uploadImage, setUploadImage] = useState<any>(null)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	// state for loading
	const [isLoading, setIsLoading] = useState(false)

	const { isConnected } = useAccount()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log({ "name": name, "description": description, "image": uploadImage })

		// console.log("submitting....")
		// setIsLoading(true)
		// try {
		// 	// upload file to ipfs
		// 	// communicate with blockchain
		// 	toast({
		// 		title: "Successfully submitted :)",
		// 		status: "success",
		// 		isClosable: true,
		// 	})
		// } catch (error) {
		// 	toast({
		// 		title: "Failed to submit :(",
		// 		status: "error",
		// 		isClosable: true,
		// 	})
		// }
		// setIsLoading(false)
		// setCaption("")
	}

	return (
		<Flex
			p="3rem"
			justifyContent="center"
			flexDirection="column"
			alignItems="center"
		>
			{isConnected ? (
				<Flex
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
				>
					<Heading as="h4" size="md">
						Drag and drop the phote you want upload{" "}
						<Badge colorScheme="green">FAST</Badge>
					</Heading>
					<Text>
						Your asset will be stored on IPFS and visible on Eth
						blockchain.
					</Text>
					<Divider />

					<form onSubmit={handleSubmit}>
						<Flex alignItems='center' gap='.5rem' flexDirection={{ xs: 'column', sm: 'column', md: "row", lg: 'row', xl: 'row' }}>
							{uploadImage === null ? (
								<CustomDropzone
									setUploadImage={setUploadImage}
								/>
							) : (
								<Image
									p="2rem"
									w="300px"
									h="400px"
									objectFit="cover"
									src={URL.createObjectURL(uploadImage)}
								/>
							)}

							<Stack width='300px'>
								<Input
									placeholder="Give it a name..."
									onChange={(e) => setName(e.target.value)}
									value={name}
									isRequired
									width='100%'
									marginTop='10px'
								/>
								<Textarea 
									placeholder="Give it a description..."
									onChange={e => setDescription(e.target.value)}
									value={description}
									size='md'
									rows={15}
									isRequired
									width='100%'
								/>
							</Stack>
						</Flex>
						<Flex justifyContent='flex-end'>

						<Button
							isLoading={isLoading}
							loadingText="submitting..."
							type="submit"
							marginTop='5px'
							width='10rem'
							variant='solid'
							backgroundColor='green.200'
						>
							Submit
						</Button>
						</Flex>
					</form>
				</Flex>
			) : (
				<div>Please connect wallet to upload</div>
			)}
			<Popover>
				<PopoverTrigger>
					<IconButton
						zIndex={20}
						position="fixed"
						right="10"
						bottom="10"
						aria-label="question"
						icon={<QuestionOutlineIcon />}
					/>
				</PopoverTrigger>
				<Portal>
					<PopoverContent>
						<PopoverArrow />
						<PopoverHeader>Tips 💡</PopoverHeader>
						<PopoverCloseButton />
						<PopoverFooter>
							Connect to crypto wallet first before uploading your
							asset!
						</PopoverFooter>
					</PopoverContent>
				</Portal>
			</Popover>
		</Flex>
	)
}

export default UploadPage
