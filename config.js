const fca = require("fca-unofficial")
const fs = require("fs")
const cron = require("./cron/start")
const regex = require("./utils/regex")

let options = {
	listenEvents: true,
	selfListen: false
}
let commands = []
let prefix
let name
let admins = []

let add = (script, data) => {
	if(script != "" && data.title != ""){
		commands.push({
			script,
			data
		})
	}
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
let getName = () => {
	return name
}
let getPrefix = () => {
	return prefix
}

let cd = (api, event, cooldown, json) => {
	if(cooldown && !admins.includes(event.senderID)){
		json.cooldown[event.senderID] = true
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		setTimeout(() => {
			json.cooldown[event.senderID] = undefined
			api.sendMessage("Cooldown done", event.threadID, event.messageID)
			fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		}, (1000 * 60))
	}
}

let system = (api, event, r, q, _prefix) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let cooldown = true
	let admin = false
	let args = false
	let game = false
	let type = ["message"]
	let reg = regex(_prefix + q)
	if(r.data.admin != undefined)
		admin = r.data.admin
	if(r.data.hasCooldown != undefined)
		cooldown = r.data.hasCooldown
	if(r.data.hasArgs != undefined)
		args = r.data.hasArgs
	if(r.data.game != undefined)
		game = r.data.game
	if(r.data.type != undefined)
		type = r.data.type
	
	if(json.cooldown[event.senderID] == undefined){
		if(reg.test(event.body) && type.includes(event.type) && ((json.status && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID)) || admins.includes(event.senderID))){
			let script
			if(admin){
				script = require("./admin/" + r.script)
				if(admins.includes(event.senderID)){
					if(args){
						script(api, event, reg)
					}else{
						script(api, event)
					}
				}
			}else if(game){
				script = require("./game/" + r.script)
				if(args){
					script(api, event, reg)
				}else{
					script(api, event)
				}
			}else{
				script = require("./script/" + r.script)
				if(args){
					cd(api, event, cooldown, json)
					script(api, event, reg)
				}else{
					cd(api, event, cooldown, json)
					script(api, event)
				}
			}
			return false
		}else{
			return true
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
			api.sendMessage("Bot service is now activated.", id)
		})
		
		cron(api)
		
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
				let loop = true
				
				let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
				if(!admins.includes(event.senderID) && json.busy && !json.busylist.includes(event.threadID)){
					let thread = await api.getThreadInfo(event.threadID)
					if(thread.isGroup == false){
						api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID)
						json.busylist.push(event.threadID)
						fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
					}else if(event.mentions != undefined){
						if(event.mentions[self] != undefined){
							api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID)
							json.busylist.push(event.threadID)
							fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
						}
					}
				}
				
				if(body_lowercase.startsWith(name_lowercase)){
					commands.forEach(r => {
						if(r.data.queries != undefined && loop){
							r.data.queries.forEach(q => {
								let _prefix = name + ", "
								loop = system(api, event, r, q, _prefix)
							})
						}
					})
				}else if(body.startsWith(prefix)){
					commands.forEach(r => {
						if(r.data.commands != undefined && loop){
							r.data.commands.forEach(q => {
								loop = system(api, event, r, q, prefix)
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
	getName,
	getPrefix
}
