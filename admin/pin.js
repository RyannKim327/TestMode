const fs = require("fs")
const { getPrefix } = require("./../config")
module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/pin.json", "utf8"))
	if(event.body == (getPrefix() + "clearpin")){
		json[event.threadID] = undefined
		console.log("hi")
	}else{
		let msg = event.messageReply
		if(json[event.threadID] == undefined)
			json[event.threadID] = {}
		let p = json[event.threadID]
		json[event.threadID].senderID = msg.senderID
		json[event.threadID].body = msg.body
		if(msg.attachments != undefined){
			json[event.threadID].attachments = []
			let att = msg.attachments
			console.log(att)
			for(let i = 0; i < att.length; i++){
				let ext = ""
				if(att[i].type == "photo"){
					ext = ".jpg"
					json[event.threadID].attachments.push({
						name: att[i].name + ext,
						url: att[i].largePreviewUrl
					})
				}else if(att[i].type == "animated_image"){
					ext = ".gif"
					json[event.threadID].attachments.push({
						name: att[i].name + ext,
						url: att[i].facebookUrl
					})
				}else if(att[i].type == "audio"){
					json[event.threadID].attachments.push({
						name: att[i].filename.replace(/\.mp4/gi, ".mp3"),
						url: att[i].url
					})
				}else if(att[i].type == "video"){
					json[event.threadID].attachments.push({
						name: att[i].filename,
						url: att[i].url
					})
				}
			}
		}
	}
	api.sendMessage("Pinned message set.", event.threadID)
	fs.writeFileSync("data/pin.json", JSON.stringify(json), "utf8")
}
