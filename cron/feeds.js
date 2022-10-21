const fs = require("fs")

module.exports = (api, admins) => {
	let data = JSON.parse(fs.readFileSync("data/feedback.json", "utf8"))
	for(let r = 0; r < data.data.length; r++){
		admins.forEach(s => {
			api.sendMessage(data.data[r].msg, s)
		})
		data.data[r] = undefined
	}
	fs.writeFileSync("data/feedback.json", JSON.stringify(data), "utf8")
}