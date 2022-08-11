const fs = require("fs")

module.exports = (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	
	json.busy = !json.busy
	
	if(json.busy){
		json.busylist = []
		api.sendMessage("Busy mode on.", event.threadID)
	}else{
		json.busylist = []
		api.sendMessage("Busy mode off.", event.threadID)
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
