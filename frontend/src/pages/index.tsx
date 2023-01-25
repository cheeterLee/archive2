import Head from "next/head"
import bg from "../../public/bg.jpg"
import { Model } from "../model/Eth"
import { Canvas } from "@react-three/fiber"
import { ContactShadows } from "@react-three/drei"
import {
	Button,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	useToast
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { useEffect } from "react"

export default function Home() {
	const router = useRouter()
	const handleNavigate = () => {
		router.push("/gallery")
	}
	const toast = useToast()

	useEffect(() => {
		if (!window.ethereum) {
			toast({
				position: 'top',
				title: "No wallet detected",
				description: "Please install Metamask for better user experience :)",
				status: "warning",
				duration: 7000,
				isClosable: true,
			})
		}
	}, [])

	return (
		<>
			<Head>
				<title>Archive.com</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<div
				style={{
					position: "fixed",
					top: "13vh",
					left: "0",
					right: "0",
					bottom: "0",
					zIndex: -1,
					backgroundColor: "#5e5a5a",
					backgroundImage: `url(${bg.src})`,
					backgroundBlendMode: "multiply",
					backgroundSize: "cover",
				}}
			>
				<Canvas>
					<ambientLight color="#ffa940" intensity={0.9} />
					<pointLight position={[0, 1, 1]} />
					<pointLight position={[-10, -10, -10]} color="#fa8c16" />
					<spotLight
						position={[-2, 1, 32]}
						angle={0.2}
						intensity={1}
					/>
					<ContactShadows
						scale={12}
						blur={4}
						opacity={1}
						far={100}
						position={[0, -0.001, 0]}
					/>
					<Model />
				</Canvas>
				<div
					style={{
						position: "fixed",
						top: "13vh",
						left: "0",
						right: "0",
						bottom: "0",
						display: "flex",
						justifyContent: "center",
						alignItems: "end",
						padding: "5rem 1rem",
					}}
				>
					<Button
						onClick={handleNavigate}
						variant="outline"
						colorScheme="orange"
						style={{
							padding: "1rem 2rem",
						}}
					>
						Explore our gallery
					</Button>
				</div>
				<Popover>
					<PopoverTrigger>
						<IconButton
							variant='outline'
							color='#EACB83'
							colorScheme='#EACB83'
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
								Connect to crypto wallet first before uploading
								your asset!
							</PopoverFooter>
						</PopoverContent>
					</Portal>
				</Popover>
			</div>
		</>
	)
}
