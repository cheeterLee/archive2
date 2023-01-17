"use client"

import Navbar from "@/components/Navbar"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../chakra/theme"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<WagmiConfig client={client}>
					<ChakraProvider theme={theme}>
						<Navbar />
						{children}
					</ChakraProvider>
				</WagmiConfig>
			</body>
		</html>
	)
}
