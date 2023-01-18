import { Button } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"

export interface IConnectButtonProps {}

const ConnectButton: React.FunctionComponent<IConnectButtonProps> = (props) => {
	// State / Props
	const [hasMounted, setHasMounted] = useState(false)
	const { address, isConnected } = useAccount()
	const { connect } = useConnect({
		connector: new InjectedConnector(),
	})
	const { disconnect } = useDisconnect()

	// Hooks
	useEffect(() => {
		setHasMounted(true)
	}, [])

	// Render
	if (!hasMounted) return null

	return (
		<>
			{isConnected ? (
				<Button bg="orange.300" onClick={() => disconnect()}>
					Disconnect
				</Button>
			) : (
				<Button bg="orange.300" onClick={() => connect()}>
					Connect Wallet
				</Button>
			)}
		</>
	)
}

export default ConnectButton
