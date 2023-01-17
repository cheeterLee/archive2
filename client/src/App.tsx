import { Box } from "@chakra-ui/react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Navbar } from "./components"
import { Home, Upload, Gallery, Dashboard, Contact, ImageDetail } from "./pages"
import { WagmiConfig, createClient } from "wagmi"
import { getDefaultProvider } from "ethers"

const client = createClient({
	autoConnect: true,
	provider: getDefaultProvider(),
})

export default function App() {
	return (
		<WagmiConfig client={client}>
			<Box>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="/gallery/:id" element={<ImageDetail />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Box>
		</WagmiConfig>
	)
}
