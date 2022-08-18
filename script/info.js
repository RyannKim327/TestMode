const { commands, getPrefix, getName, getFullName } = require("./../config")

module.exports = (api, event) => {
	let message = "Hello I am " + getFullName() + " you may also call me " + getName() + " your friendly facebook bot. Here are my commands that you may used to execute if you want to use my service.\n\n"
	let i = 1
	message += "List of Commands:\n"
	commands.forEach(r => {
		let data = r.data
		if(!data.admin && !data.game){
			message += i + ". " + data.title + "\n~ " + data.description + "\n"
			let j = 1
			if(data.queries != undefined){
				message += "~ Queries:\n"
				data.queries.sort()
				data.queries.forEach(q => {
					message += "  " + j + ". " + getName() + ", " + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ") + "\n"
					j += 1
				})
			}
			j = 1
			if(data.commands != undefined){
				data.commands.sort()
				message += "~ Commands:\n"
				data.commands.forEach(q => {
					message += "  " + j + ". " + getPrefix() + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ").replace(/(\$)/gi, "") + "\n"
					j += 1
				})
			}
			message += "\n"
			i += 1
		}
	})
	message += "\nGame Commands:\n"
	i = 1
	commands.forEach(r => {
		let data = r.data
		if(!data.admin && data.game && data.game != undefined){
			message += i + ". " + data.title + "\n~ " + data.description + "\n"
			let j = 1
			data.commands.sort()
			data.commands.forEach(q => {
				j += 1
				message += j + ". " + getPrefix() + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ").replace(/(\$)/gi, "") + "\n"
			})
			message += "\n"
			i += 1
		}
	})
	api.sendMessage(message, event.threadID)
}
