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
			if(usr[user]['name']){
				data.names[user] = usr[user]['name'].replace(/\W/gi, " ").trim()
			}
		}
		fs.writeFileSync("data/gpt.json", JSON.stringify(data, null, 2), "utf-8")
	}
}

const processes = async (api, event, prefix) => {
	let current = 0
	const check = () => {
		if(current < commands.length){
			const command = commands[current]
			if(command.command){
				command.command = regex(command.command, prefix)
				if(!command.script.toLowerCase().includes("fallback")){
					if(command.command.test(event.body)){
						require(`./user/${command.script}`)(api, event, event.body.match(command.command))
					}else{
						current++
						check()
					}
				}
			// }else{
			// 	current++
			// 	check()
			}
		}else{
			require("./user/fallback")(api, event, prefix)
		}
	}
	check()
}

require("ws3-fca")({
	appState: JSON.parse(fs.readFileSync("appstate.json", "utf-8"))
}, async (error, api) => {
		if(error) return logs.err("Login", error)
		let started = false
		logs.log("Login", "Logged in successfully")
		if(fs.existsSync("commands.json")){
			const commands_ = JSON.parse(fs.readFileSync("commands.json", "utf-8"))
			commands = commands_
		}

		if(fs.existsSync(`${__dirname}/temp`)){
			fs.rm(`${__dirname}/temp`, { recursive: true }, (e) => {
				fs.mkdirSync(`${__dirname}/temp`)
			})
		}else{
			fs.mkdirSync(`${__dirname}/temp`)
		}

		api.setOptions({
			listenEvents: true,
			selfListen: true
		})

		api.listen(async (error, event) => {
			if(error) return logs.err("Listener", error)
			if(!started){
				logs.log("Listener", "Listening")
				started = !started
			}
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
