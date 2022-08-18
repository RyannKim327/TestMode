const fs = require("fs")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let body = event.body.toLowerCase()
	if(body == "√on"){
		if(event.type == "message_reply" && json.off.includes(event.messageReply.senderID)){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			let off = json.off
			let x = off.join(", ")
			x = x.replace(id + ", ", "")
			x = x.replace(", " + id, "")
			json.off = x.split(", ")
			api.sendMessage({
				body: `Bot actions are now enabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID)
		}else if(event.type == "message" && json.off.includes(event.threadID)){
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			let off = json.off
			let x = off.join(", ")
			x = x.replace(id + ", ", "")
			x = x.replace(", " + id, "")
			json.off = x.split(", ")
			api.sendMessage({
				body: `Bot actions are now enabled for ${thread.threadName}`
			}, event.threadID)
		}
	}else if(body == "√off"){
		if(event.type == "message_reply" && !json.off.includes(event.messageReply.senderID)){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			json.off.push(id)
			api.sendMessage({
				body: `Bot actions are now disabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID)
		}else if(event.type == "message" && !json.off.includes(event.threadID)){
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			json.off.push(id)
			api.sendMessage({
				body: `Bot actions are now disabled for ${thread.threadName}`
			}, event.threadID)
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
