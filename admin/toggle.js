const fs = require("fs")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	json.status = !json.status
	if(json.status){
		api.sendMessage("Bot service for non vip users is now active.", event.threadID)
	}else{
		api.sendMessage("Bot service for non vip users is now deactivated.", event.threadID)
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
