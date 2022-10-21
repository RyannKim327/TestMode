const fs = require("fs")
const { setName } = require("./../config")
module.exports = (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let _data = event.body.match(regex)[1].split("")
	let data = _data[0].toUpperCase()
	_data.shift()
	data += _data.join("")
	json.name = data
	api.sendMessage(`New bot name set as ${data}`, event.threadID)
	setName(data)
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}