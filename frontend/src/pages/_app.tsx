import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../chakra/theme"
import Navbar from "@/components/Navbar"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"
import { SignerContextProvider } from "@/context/SignerContext"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL as string

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	uri: GRAPH_URL,
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SignerContextProvider>
			<ApolloProvider client={apolloClient}>
				<WagmiConfig client={client}>
					<ChakraProvider theme={theme}>
						<Navbar />
						<Component {...pageProps} />
					</ChakraProvider>
				</WagmiConfig>
			</ApolloProvider>
		</SignerContextProvider>
	)
}
