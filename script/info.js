const { commands, getPrefix, getName } = require("./../config")

module.exports = async (api, event) => {
	let creds = [
		"Salvador",
		"John Jeremy Antiguo",
		"Earl Shine Sawir",
		"John Paul Caigas",
		"John Roy Lapida Calimlim",
		"Lester Navarra",
		"Jerson Carin",
		"Rovie Francisco",
		"Ken Jovenie Samonte",
		"Mark Kevin Manalo",
		"Mart Anthony Salazar",
		"Eljohn Mago",
		"Jovanny De Leon",
		"LuanRT",
		"Schemavery",
		"VanBanLaNhat",
		"Labs Bible",
		"Zenquotes",
		"AnimeQuotes",
		"OpenAI",
		"Tabs Ultimate Guitar",
		"DroidModifs",
		"And to all developers of the API used for this project."
	]
	let myID = await api.getCurrentUserID()
	let user = await api.getUserInfo(myID)
	let message = "Hello I am " + user[myID]['name'] + " you may also call me " + getName() + " your friendly facebook bot. Here are my commands that you may used to execute if you want to use my service.\n\n"
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
		let show = true
		if(data.show != undefined)
			show = data.show
		if(!data.admin && show && data.game && data.game != undefined){
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
	message += "\nCredits to the following:\n"
	i = 1
	creds.forEach(r => {
		message += i + ". " + r + "\n"
		i += 1
	})
	api.sendMessage(message, event.threadID)
}
