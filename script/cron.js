const fs = require("fs")
const { getAdmins } = require("./../config")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	const self = api.getCurrentUserID()
	if(event.body.includes("off cron")){
		json.offcron.push(event.threadID)
		let thread = await api.getThreadInfo(event.threadID)
		if(!thread.isGroup || getAdmins().includes(event.senderID)){
			api.sendMessage("Turned Off Cron Activities.", event.threadID)
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}