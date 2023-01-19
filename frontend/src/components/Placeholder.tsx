import { QuestionOutlineIcon } from "@chakra-ui/icons"
import {
	IconButton,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	Text,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	Stack,
} from "@chakra-ui/react"
import React from "react"
import Image from "next/image"
import CoolDog from "../../public/cool.png"

export interface IPlaceHolderProps {}

const PlaceHolder: React.FunctionComponent<IPlaceHolderProps> = (props) => {
	return (
		<>
			<Stack alignItems="center" justifyContent="center" padding="5rem">
				<Text fontSize="1.2rem">
					Please connect your wallet to view :)
				</Text>
				<Image src={CoolDog} alt="cool dog" />
			</Stack>
			<Popover>
				<PopoverTrigger>
					<IconButton
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
							Connect to crypto wallet first before uploading your
							asset!
						</PopoverFooter>
					</PopoverContent>
				</Portal>
			</Popover>
		</>
	)
}

export default PlaceHolder
