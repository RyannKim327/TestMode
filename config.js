const fca = require("fca-unofficial")
const fs = require("fs")
const regex = require("./utils/regex")

let options = {
	listenEvents: true,
	selfListen: false
}
let commands = []
let prefix = ""
let name = ""
let admins = []

let add = (script, data) => {
	commands.push({
		script,
		data
	})
}
let setAdmins = (data) => {
	admins.push(data)
}
let setName = (data) => {
	name = data
}
let setOptions = (data) => {
	options = data
}
let setPrefix = (data) => {
	prefix = data
}

let system = (api, event, r, q, _prefix) => {
	let json_cooldown = JSON.parse(fs.readFileSync("data/cooldown.json", "utf8"))
	let cooldown = true
	let admin = false
	let args = false
	let reg = regex(prefix + q)
	if(r.data.admin != undefined)
		admin = r.data.admin
	if(r.data.hasCooldown != undefined)
		cooldown = r.data.hasCooldown
	if(r.data.hasArgs != undefined)
		args = r.data.hasArgs
	
	if(json_cooldown[event.senderID] == undefined){
		if(reg.test(event.body)){
			let script
			if(admin){
				script = require("./admin/" + r.script)
			}else{
				script = require("./script/" + r.script)
			}
			if(args){
				script(api, event, regex)
			}else{
				script(api, event)
			}
		}
		if(cooldown && admins.includes(event.senderID)){
			json_cooldown[event.senderID] = true
			fs.writeFileSync("data/cooldown.json", JSON.stringify(json_cooldown), "utf8")
			setTimeout(() => {
				json_cooldown[event.senderID] = undefined
				fs.writeFileSync("data/cooldown.json", JSON.stringify(json_cooldown), "utf8")
			}, (1000 * 60))
		}
	}
}

let start = (state) => {
	fca(state, async (error, api) => {
		if(error) return console.error(`Error [API]: ${error}`)
		
		const self = await api.getCurrentUserID()
		if(options.selfListen)
			admins.push(self)
		admins.forEach(id => {
			api.sendMessage("Bot service is now actived.", id)
		})
		api.setOptions(options)
		api.listen(async (error, event) => {
			if(error) return console.error(`Error [Listen Emitter]: ${error}`)
			
			if(options.autoMarkRead != undefined){
				if(options.autoMarkRead){
					await api.markAsReadAll()
				}
			}
			
			if(event.body != null){
				let body = event.body
				let body_lowercase = body.toLowerCase()
				let name_lowercase = name.toLowerCase()
				if(body_lowercase.startsWith(name_lowercase)){
					commands.forEach(r => {
						if(r.data.queries != undefined)
							r.data.queries.forEach(q => {
								system(api, event, r, q, name + ", ")
							})
						}
					})
				}else if(body.startsWith(prefix)){
					commands.forEach(r => {
						if(r.data.commands != undefined){
							r.data.commands.forEach(q => {
								system(api, event, r, q, prefix)
							})
						}
					})
				}
			}
		})
	})
}

module.exports = {
	add,
	setAdmins,
	setName,
	setOptions,
	setPrefix,
	start,
	
	commands,
	name,
	prefix
}
