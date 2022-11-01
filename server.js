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
	app.post("/updates", enc, (req, res) => {
		let data = req.body.package
		if(data == undefined){
			res.end("Something went wrong.")
		}else{
			let js_ = JSON.parse(fs.readFileSync("data/updates.json", "utf8"))
			let json = js_[data]
			if(json != undefined){
				let f = {
					"version": json.ver,
					"link": json.url,
					"description": json.desc,
					"isRequired": json.req
				}
				res.end(JSON.stringify(f))
			}else{
				res.end("Not found")
			}
		}
	})
	app.listen(3000, () => {
		console.log("Listening to default port")
	})
}