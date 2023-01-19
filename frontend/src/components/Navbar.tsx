import React, { useEffect, useRef, useState } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import {
	Box,
	Flex,
	Heading,
	Link,
	IconButton,
	Button,
	Drawer,
	useDisclosure,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useColorMode,
	useToast,
} from "@chakra-ui/react"
import logo from "../../public/logo.svg"
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import Image from "next/image"
import ConnectButton from "./ConnectButton"
import { useRouter } from "next/router"

export interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const menuRef = useRef<any>()
	const { colorMode, toggleColorMode } = useColorMode()
	const toast = useToast()

	return (
		<Flex
			padding="2rem 4rem"
			background="whiteAlpha.100"
			alignItems="center"
			justifyContent="space-between"
			bg="blackAlpha.400"
			w='100vw'
		>
			<Flex alignItems="center" gap="1.5rem">
				<Box
					boxSize="2rem"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Image src={logo} alt="logo" />
				</Box>
				<Heading
					as="h1"
					display={{
						xs: "none",
						sm: "none",
						md: "none",
						lg: "flex",
						xl: "flex",
					}}
				>
					<span
						style={{
							textDecoration: "underline #ED8936",
							textUnderlineOffset: "3px",
						}}
					>
						Archive
					</span>
					.com
				</Heading>
			</Flex>
			<Flex alignItems="center" gap="2rem" fontSize="1.5rem">
				<Flex
					alignItems="center"
					gap="2rem"
					display={{
						xs: "none",
						sm: "none",
						md: "none",
						lg: "none",
						xl: "flex",
					}}
				>
					<Link href="/">Home</Link>
					<Link href="/gallery">Gallery</Link>
					<Link href="/upload">Upload</Link>
					<Link href="/dashboard">Dashboard</Link>
					<Link href="/contact">Contact</Link>
				</Flex>
				<Flex gap=".5rem">
					<IconButton
						aria-label="open menu"
						icon={<HamburgerIcon />}
						display={{
							xs: "flex",
							sm: "flex",
							md: "flex",
							lg: "flex",
							xl: "none",
						}}
						ref={menuRef}
						onClick={onOpen}
					/>
					<IconButton
						aria-label="theme"
						onClick={toggleColorMode}
						icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
					/>
					<Flex alignItems="center">
						<ConnectButton />
					</Flex>
				</Flex>
				<Drawer
					isOpen={isOpen}
					placement="top"
					onClose={onClose}
					finalFocusRef={menuRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader textAlign="center">
							Archive.com
						</DrawerHeader>

						<DrawerBody>
							<Flex
								alignItems="center"
								gap="2rem"
								flexDir="column"
							>
								<Link href="/">Home</Link>
								<Link href="/gallery">Gallery</Link>
								<Link href="/upload">Upload</Link>
								<Link href="/dashboard">Dashboard</Link>
								<Link href="/contact">Contact</Link>
							</Flex>
						</DrawerBody>

						<DrawerFooter></DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Flex>
		</Flex>
	)
}

export default Navbar
