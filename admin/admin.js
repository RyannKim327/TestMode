const { getPrefix, commands } = require("./../config")

module.exports = (api, event) => {
	let m = ""
	for(let x = 0; x < commands.length; x++){
		let y = commands[x]
		if(y.admin != undefined){
			if(y.admin){
				m += (x + 1) + ". " + y.title + "\n"
				m += "-> " + y.description + "\nQueries:\n"
				for(let i = 0; i < y.commands; i++){
					m += "  " + getPrefix() + y.commands[i] + "\n"
				}
			}
		}
	}
	api.sendMessage(m, event.threadID)
}