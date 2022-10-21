const express = require("express")
const fs = require("fs")
const parser = require("body-parser")
const app = express()
const enc = parser.urlencoded({extended: false})

module.exports = () => {
	app.use(express.static("public"))
	app.get("/", (req, res) => {
		res.send("Developed by RyannKim327")
	})
	app.post("/feed", enc, (req, res) => {
		let json = JSON.parse(fs.readFileSync("data/feedback.json", "utf8"))
		json.data.push({
			msg: req.body.error,
			toRead: true
		})
		console.log(req.body.error)
		fs.writeFileSync("data/feedback.json", JSON.stringify(json), "utf8")
		res.end("Feedback sent")
	})
	app.listen(3000, () => {
		console.log("Listening to default port")
	})
}