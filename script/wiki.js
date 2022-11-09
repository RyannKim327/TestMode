const axios = require("axios")
const fs = require("fs")
const http = require("https")

let wiki = async (q) => {
	let result = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Wiki]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api, event, regex) => {
	let body = event.body.match(regex)[1]
	let data = await wiki(body)
	if(data == undefined || data == null){
		api.sendMessage("An error occured", event.threadID)
	}else if(data.title == undefined || data.title == "N/A"){
		api.sendMessage("Document was not found.", event.threadID)
	}else{
		let message = `Title ${data.title}\n~ ${data.description}\n    ${data.extract}\nSource: Wikipedia (${data.content_urls.mobile.page})`
		if(data.originalimage == undefined){
			api.sendMessage(message, event.threadID)
		}else{
			let file = fs.createWriteStream("temp/" + body.replace(/\s/gi, "_") + ".jpg")
			let name = `${__dirname}/../temp/${body.replace(/\s/gi, "_")}.jpg`
			http.get(data.originalimage.source, (r) => {
				r.pipe(file)
				file.on("finish", () => {
					api.sendMessage({
						body: message,
						attachment: fs.createReadStream(name).on("end", async () => {
							if(fs.existsSync(name)){
								fs.unlink(name, (e) => {})
							}
						})
					}, event.threadID, (e, m) => {
						if(e){
							if(fs.existsSync(name)){
								fs.unlink(name, (e) => {})
							}
							api.sendMessage(message, event.threadID)
						}
					})
				})
			})
		}
	}
}