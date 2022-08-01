const { getCommands, getPrefix } = require("./../config")

module.exports = (api, event) => {
	let message = "This is Sample Info\n\n* Command Lists *\n"
	let i = 1
	let j = 1
	getCommands.forEach(r => {
		message += i + ". " + r.data.title + "\n"
		message += "~ " + r.data.description + "\n"
		message += "Queries:\n"
		r.data.querie.forEach(q => {
			message += j + ". " + getPrefix + q
			j += 1
		})
		message += "\n"
		i += 1
		j = 1
	})
	api.sendMessage(message, event.threadID)
}