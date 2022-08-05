const yt = require("youtubei.js")
const fs = require("fs")

const gender = require("./../utils/gender")

module.exports = async (api, event, regex) => {
	let name = `${__dirname}/../${event.threadID}.mp3`
	if(fs.existsSync(name)){
		api.sendMessage("Lemme finish the earlier request please.", event.threadID)
	}else{
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		const youtube = await new yt()
		let body = event.body.match(regex)[1]
		let result = await youtube.search(body)
		if(result.videos.length > 0){
			if(result.videos[0].id == undefined){
				api,sendMessage("Something went wrong.", event.threadID)
			}else{
				const info = await youtube.getDetails(result.videos[0].id)
				if(info.title == undefined){
					api.sendMessage("An Error Occured", event.threadID)
				}
				let file = fs.createWriteStream(`${event.threadID}.mp3`)
				let message = ""
				let f = youtube.download(result.videos[0].id, {
					format: "mp4",
					quality: "tiny",
					type: "audio",
					audioQuality: "lowest",
					audioBitrate: "550"
				})
				f.pipe(file)
				f.on("start", () => {
					api.setMessageReaction("⌛", event.messageID, (e) => {}, true)
				})
				f.on("end", async () => {
					let user = await api.getUserInfo(event.senderID)
					let username = user[event.senderID]['name']
					let g = gender(username)['eng']
					message += `Here's your request ${g} {username}. A song entitled ${info.title}, uploaded by ${info.metadata.channel_name} on a platform called youtube.`
					api.sendMessage({
						body: message,
						attachment: fs.createReadStream(name).on("end", async () => {
							if(fs.existsSync(name)){
								fs.unlink(name, (e) => {
									if(e) return console.error(`Error [Youtue Music]: ${e}`)
									api.setMessageReaction("", event.messageID, (e) => {}, true)
								})
							}
						})
					})
				})
			}
		}else{
			api.sendMessage("There is no results found.", event. threadID)
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}
	}
}
