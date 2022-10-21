const fs = require("fs")

module.exports = (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	let data = event.body.match(regex)[1]
	json.lists.push(data)
	let lists = json.lists.sort()
	json.lists = lists
	api.sendMessage(`New song: ${data} added succesfully.`, event.threadID)
	fs.writeFileSync("data/songs.json",JSON.stringify(json) ,"utf8")
}