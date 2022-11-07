const fs = require("fs")
const scan = require("pls-img-txt")
const request = require("request")

module.exports = async (api, event) => {
	let a = event.messageReply.attachments
	if(a.length > 0){
		if(a[0].type != "photo")
			return api.sendMessage("I can't find any image here.", event.messageReply.threadID)
		let msg = event.messageID.replace(/\./gi, "")
		let file = fs.createWriteStream(`${msg}.jpg`)
		let r = request(a[0].url)
		r.pipe(file)
		r.on("close", async () => {
			api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
			let s = await scan(`./${msg}.jpg`) 
			api.sendMessage(s.result, event.threadID, (e) => {
				if(fs.existsSync(`${__dirname}/../${msg}.jpg`)){
					fs.unlink(`${__dirname}/../${msg}.jpg`, (e) => {})
				}
			}, event.messageReply.messageID)
		})
	}else{
		api.sendMessage("I can't find any image here.", event.messageReply.threadID)
	}
	api.setMessageReaction("", event.messageID, (e) => {}, true)
}