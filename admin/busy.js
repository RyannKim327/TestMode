const fs = require("fs")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(event.body == "√clearbusy" && json.busy){
		json.busylist = []
		api.sendMessage("Busy lists cleared.", event.threadID)
	}else if(event.body == "√busy"){
		json.busy = !json.busy
		
		if(json.busy){
			json.busylist = []
			api.sendMessage("Busy mode on.", event.threadID)
		}else{
			json.busylist = []
			api.sendMessage("Busy mode off.", event.threadID)
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
