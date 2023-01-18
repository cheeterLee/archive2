import { Box, Button } from "@chakra-ui/react"
import Blockies from "react-blockies"
import React, { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import useSignerContext from "@/context/signer"

export interface IConnectButtonProps {}

const ConnectButton: React.FunctionComponent<IConnectButtonProps> = (props) => {
	// // State / Props
	// const [hasMounted, setHasMounted] = useState(false)
	// const { address, isConnected } = useAccount()
	// const { connect } = useConnect({
	// 	connector: new InjectedConnector(),
	// })
	// const { disconnect } = useDisconnect()

	// // Hooks
	// useEffect(() => {
	// 	setHasMounted(true)
	// }, [])

	// // Render
	// if (!hasMounted) return null

	const { address, loading, connectWallet } = useSignerContext()

	if (address) {
		return (
			<Box alignContent='center' justifyItems='center'>
				<Blockies seed={address.toLowerCase()} /> 
			</Box>
		)
	}

	return (
		<>
			{/* {isConnected ? (
				<Button bg="orange.300" onClick={() => disconnect()}>
					Disconnect
				</Button>
			) : (
				<Button bg="orange.300" onClick={() => connect()}>
					Connect Wallet
				</Button>
			)} */}
			<Button bg="orange.300" onClick={() => connectWallet()}>
				{loading ? 'busy...' : 'Connect Wallet'}
			</Button>
		</>
	)
}

export default ConnectButton
