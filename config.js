const fca = require("fca-unofficial")
const regex = require("./utils/regex")

let commands = []
let prefix = ""
let options = {}
let admins = []

let add = (_callback, _data) => {
	if(_data.title != undefined && _data.title != ""){
		commands.push({
			script: _callback,
			data: {
				title: _data.title,
				description: _data.description || "No Description Stated.",
				queries: _data.queries ||,
				type: _data.message_type || "message"
				hasArgs: _data.hasArgs || false,
				admin: _data.admin || false,
				test: _data.test || false
			}
		})
	}
}

let setPrefix = (_prefix) => {
	prefix = _prefix
}

let setOptions = (opts) => {
	options = {
		listenEvents: opts.listenEvents || true,
		selfListen: opts.selfListen || false,
		markAsRead: opts.markAsRead || false
	}
}

let getAdmins = () => {
	return admins
}

let getCommands = () => {
	return commands
}

let getPrefix = () => {
	return prefix
}

const start = () => {
	fca({
		appState: JSON.parse(process.env['state'])
	}, async (e, api) => {
		if(e) return console.error(`Error [API]: ${e}`)
		
		const self = await api.getCurrentUserID()
		api.sendMessage("Bot Activated.", self)
		admins.push(self)
		
		api.setOptions(options)
		api.listen(async (e, event) => {
			let {
				body,
				messageID
				senderID,
				threadID,
				type
			} = event
			
			commands.forEach(r => {
				
				let script = require("./script/" + r.script)
				let reg = regex(r.data.query)
				if(reg.test(body)){
					if(r.data.hasArgs){
						script(api, event, reg)
					}else{
						script(api, event)
					}
				}
			})
			
		})
	})
}

module.exports => {
	add,
	setOptions,
	setPrefix,
	start,
	getCommands,
	getAdmins,
	getPrefix
}