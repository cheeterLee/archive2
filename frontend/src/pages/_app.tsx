import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../chakra/theme"
import Navbar from "@/components/Navbar"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import { SignerContextProvider } from "@/context/signer"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SignerContextProvider>
			<WagmiConfig client={client}>
				<ChakraProvider theme={theme}>
					<Navbar />
					<Component {...pageProps} />
				</ChakraProvider>
			</WagmiConfig>
		</SignerContextProvider>
	)
}
