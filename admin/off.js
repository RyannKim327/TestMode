const fs = require("fs")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let body = event.body.toLowerCase()
	if(body == "√on"){
		if(event.type == "message_reply"){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			json.off = json.off.replace(id + ", ", "")
			api.sendMessage({
				body: `Bot actions are now enabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID)
		}else{
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			json.off = json.off.replace(id + ", ", "")
			api.sendMessage({
				body: `Bot actions are now enabled for ${thread.threadName}`,
			}, event.threadID)
		}
	}else if(body == "√off"){
		if(event.type == "message_reply"){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			json.off += id + ", "
			api.sendMessage({
				body: `Bot actions are now enabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID)
		}else{
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			json.off += id + ", "
			api.sendMessage({
				body: `Bot actions are now enabled for ${thread.threadName}`,
			}, event.threadID)
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
