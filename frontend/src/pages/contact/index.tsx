import React from "react"
import {
	Container,
	Heading,
	Radio,
	RadioGroup,
	Stack,
	FormControl,
	FormLabel,
	Textarea,
	Input,
	Text,
	Button,
	Flex,
} from "@chakra-ui/react"

export interface IContactPageProps {}

const ContactPage: React.FunctionComponent<IContactPageProps> = (props) => {
	const [radioValue, setRadioValue] = React.useState("1")
	let [value, setValue] = React.useState("")

	let handleInputChange = (e: any) => {
		let inputValue = e.target.value
		setValue(inputValue)
	}

	return (
		<Container
			centerContent
			style={{
				marginTop: "1.5rem",
                marginBottom: '1rem',
				padding: "2rem",
				backgroundColor: "#DFE0DF",
				height: 'auto',
				minWidth: "70vw",
                borderRadius: '.75rem',
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
			}}
		>
			<Heading>Leave us a message 😇</Heading>
			<RadioGroup
				onChange={setRadioValue}
				value={radioValue}
				colorScheme="teal"
				style={{ padding: ".5rem" }}
			>
				<Stack direction="row">
					<Radio value="1">Report</Radio>
					<Radio value="2">Advice</Radio>
				</Stack>
			</RadioGroup>
			<form style={{ padding: "1rem" }}>
				<FormControl isRequired>
					<FormLabel>Email: </FormLabel>
					<Input
						type="email"
						placeholder="Your email"
						style={{ width: "50vw", marginBottom: ".5rem" }}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Message: </FormLabel>
					<Textarea
						value={value}
						onChange={handleInputChange}
						placeholder="Your message"
						rows={15}
						style={{ width: "50vw" }}
					/>
				</FormControl>

				<Flex justifyContent='flex-end' p='1rem'>
					<Button variant="outline" colorScheme="teal">
						submit
					</Button>
				</Flex>
			</form>
		</Container>
	)
}
export default ContactPage
