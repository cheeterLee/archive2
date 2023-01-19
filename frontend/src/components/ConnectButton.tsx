import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react"
import Blockies from "react-blockies"
import React, { useState, useEffect, useMemo } from "react"
import useSignerContext from "@/context/SignerContext"
import { shortenAddress } from "@/utils/helper"

export interface IConnectButtonProps {}

const ConnectButton: React.FunctionComponent<IConnectButtonProps> = (props) => {
	const { address, loading, connectWallet } = useSignerContext()
	const { isOpen, onOpen, onClose } = useDisclosure()

	if (address) {
		const parsedAddress = shortenAddress(address)

		return (
			<Box
				display="flex"
				alignItems="center"
				justifyItems="center"
				gap=".55rem"
			>
				<Button bg="orange.300" onClick={onOpen}>
					{parsedAddress}
				</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							blah
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Button variant="ghost">Secondary Action</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				<Blockies seed={address.toLowerCase()} />
			</Box>
		)
	}

	return (
		<>
			<Button bg="orange.300" onClick={() => connectWallet()}>
				{loading ? "busy..." : "Connect Wallet"}
			</Button>
		</>
	)
}

export default ConnectButton
