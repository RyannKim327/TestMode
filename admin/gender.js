const fs = require("fs")

module.exports = async (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/gender.json", "utf8"))
	let data = event.body.match(regex)
	let name = data[1].toLowerCase()
	if(event.type == "message_reply"){
		let user = await api.getUserInfo(event.messageReply.senderID)
		let username = user[event.messageReply.senderID]['firstName']
		let _name = username.split(" ")
		name = _name[0].toLowerCase()
	}
	let g = data[2]
	console.log(name)
	console.log(g)
	let gender
	if(g == undefined){
		gender = -1
	}else{
		let _g = g[0]
		switch(_g){
			case "m":
			case "b":
				gender = 1
			break
			case "g":
			case "f":
			case "w":
				gender = 0
			break
			default:
				gender = -1
		}
	}
	if(json[name] == undefined){
		json[name] = gender
	}else{
		let _gender = json[name]
			switch(_gender){
			case 0:
				if(gender == 1 || gender == -1){
					json[name] = -1
				}
			break
			case 1:
				if(gender == 0 || gender == -1){
					json[name] = -1
				}
			break
		}
	}
	fs.writeFileSync("data/gender.json", JSON.stringify(json), "utf8")
	api.sendMessage("New name registered.", event.threadID)
	
	let objs = Object.keys(json)
	let msg = "{\n"
	objs.sort()
	objs.forEach(r => {
		msg += `\t"${r}": ${json[r]},\n`
	})
	
	msg += "}"
	
	let self = await api.getCurrentUserID()
	api.sendMessage(msg, self)
	
}
