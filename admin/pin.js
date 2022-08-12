const fs = require("fs")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(event.type == "message_reply"){
		if(event.messageReply.body == "")
			json.pin.message[event.threadID] = undefined
			json.pin.sender[event.threadID] = undefined
		}else{
			json.pin.message[event.threadID] = event.messageReply.body
			json.pin.sender[event.threadID] = event.messageReply.senderID
		}
		if(json.pin.message[event.threadID] == undefined){
			api.sendMessage("Pinned message.", event.threadID, event.messageReply.messageID)
		}else{
			api.sendMessage("New pinned message.", event.threadID, event.messageReply.messageID)
		}
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
	}else{
		if(json.pin.message[event.threadID] == undefined){
			api.sendMessage("There is no pinned message here.", event.threadID)
		}else{
			let id = parseInt(json.pin.sender[event.threadID])
			let user = await api.getUserInfo(id)
			api.sendMessage({
				body: `Here is the pinned message sent by ${user[id]['name']}\n\n~ ${json.pin.message[event.threadID]}`
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID)
		}
	}
}
