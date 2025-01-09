const fs = require("fs")

const logs = require("./utils/logs")
const { read, save } = require("./utils/preferences")
const regex = require("./utils/regex")

let commands = []

const setCommand = (command) => {
	commands.push(command)
}

const gptname = async (api, event) => {
	if(event.senderID){
		const data = JSON.parse(fs.readFileSync("data/gpt.json"))
		const user = event.senderID
		if(!Object.keys(data.names).includes(user)){
			const usr = await api.getUserInfo(user)
			data.names[user] = usr[user]['name']
		}
		fs.writeFileSync("data/gpt.json", JSON.stringify(data, null, 2), "utf-8")
	}
}

const processes = async (api, event, prefix) => {
	let current = 0
	const check = () => {
		const command = commands[current]
		command.command = regex(command.command, prefix)
		if(command.command.test(event.body)){
			require(`./user/${command.script}`)(api, event, event.body.match(command.command))
		}else{
			if(current <= commands.length){
				if(current < commands.length){
					current++
				}
				check()
			}else{
				// TODO: Create a fallback here
			}
		}
	}
	check()
}

require("ws3-fca")({
	appState: JSON.parse(fs.readFileSync("appstate.json", "utf-8"))
}, async (error, api) => {
		if(error) return logs.err("Login", error)

		logs.log("Login", "Logged in successfully")
		if(fs.existsSync("commands.json")){
			const commands_ = JSON.parse(fs.readFileSync("commands.json", "utf-8"))
			commands = commands_
		}

		api.setOptions({
			listenEvents: true,
			selfListen: true
		})

		api.listen(async (error, event) => {
			if(error) return logs.err("Listener", error)
			logs.log("Listener", "Listening")
			
			const botData = read()
			
			gptname(api, event)

			if(event.body){
				// TODO: To create a process for checking the commands
				if(event.body.startsWith(botData.prefix)){
					processes(api, event, botData.prefix)
				}
			}
		})
})
