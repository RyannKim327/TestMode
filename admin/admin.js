const { getPrefix, commands } = require("./../config")

module.exports = (api, event) => {
	let m = ""
	let i = 1
	commands.forEach(r => {
		let data = r.data
		if(data.admin != undefined){
			if(data.admin){
				m += i + ". " + data.title + "\n~ " + data.description + "\n"
				let j = 1
				if(data.commands != undefined){
					m += "~ Queries:\n"
					data.commands.sort()
					data.commands.forEach(q => {
						m += "  " + j + ". " + getPrefix() + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ") + "\n"
						j += 1
					})
				}
				m += "\n"
				i += 1
			}
		}
	})
	api.sendMessage(m, event.threadID)
}