import express, { Application, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { readFileSync, unlinkSync } from "fs"
import { tmpdir } from "os"
import formidable from "formidable"
import { File, NFTStorage } from "nft.storage"

dotenv.config()
const app: Application = express()
app.use(express.json())
app.use(cors())

const client = new NFTStorage({ token: `${process.env.NFT_STORAGE_KEY}` })

app.post("/api/nft", async (req: Request, res: Response) => {
	if (req.method != "POST") {
		return res
			.status(403)
			.json({ error: `Unsupported method ${req.method}` })
	}
	try {
		// Parse req body and save image in /tmp
		const data: any = await new Promise((res, rej) => {
			const form = formidable({
				multiples: true,
				uploadDir: tmpdir(),
			})
			form.parse(req, (err: any, fields: any, files: any) => {
				if (err) rej(err)
				res({ ...fields, ...files })
			})
		})
		// Read image from /tmp
		const {
			filepath,
			originalFilename = "image",
			mimetype = "image",
		} = data.image
		const buffer = readFileSync(filepath)
		const arraybuffer = Uint8Array.from(buffer).buffer
		const file = new File([arraybuffer], originalFilename, {
			type: mimetype,
		})
		// Upload data to nft.storage
		const metadata = await client.store({
			name: data.name,
			description: data.description,
			image: file,
		})
		// Delete tmp image
		unlinkSync(filepath)
		// return tokenURI
		res.status(201).json({ uri: metadata.url })
	} catch (e) {
		console.log(e)
		return res.status(400).json(e)
	}
})

const PORT = process.env.PORT || 6001
app.listen(PORT, () => {
	console.log(`listening on PORT ${process.env.PORT} 🚀🚀🚀`)
})
