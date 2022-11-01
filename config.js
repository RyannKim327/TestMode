const fca = require("fca-unofficial")
const fs = require("fs")
const cron = require("./cron/start")
const cron_api = require("./cron/api")
const cron_feed = require("./cron/feeds")
const join = require("./auto/join")
const openai = require("./auto/openai")
const bw = require("./utils/badwords")
//const { read } = require("./utils/database")
const regex = require("./utils/regex")

let invervals = {}

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
let getAdmins = () => {
	return admins
}
let getName = () => {
	return name
}
let getPrefix = () => {
	return prefix
}

let interval_ = () => {
	intervals = {}
	setTimeout(interval_, 90000)
}

let cd = (api, event, cooldown, json, time) => {
	if(cooldown && !admins.includes(event.senderID)){
		json.cooldown[event.senderID] = true
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		setTimeout(() => {
			json.cooldown[event.senderID] = undefined
			api.sendMessage("Cooldown done", event.threadID, event.messageID)
			fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		}, (1000 * 60) * time)
	}
}

let system = (api, event, r, q, _prefix) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let cooldown = true
	let admin = false
	let args = false
	let game = false
	let _cd = 1.5
	let type = ["message"]
	let reg = regex(_prefix + q)
	let notAffect = false
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
	if(r.data.cd != undefined)
		_cd = r.data.cd
	if(r.data.affect != undefined)
		notAffect = r.data.affect
	
	if(json.cooldown[event.senderID] == undefined){
		if(reg.test(event.body) && type.includes(event.type) && ((json.status && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && bw(event.body)) || notAffect || admins.includes(event.senderID))){
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
					cd(api, event, cooldown, json, _cd)
					script(api, event, reg)
				}else{
					cd(api, event, cooldown, json, _cd)
					script(api, event)
				}
			}
			return false
		}else{
			return true
		}
	}else{
		return false
	}
}

let start = (state) => {
	fca(state, async (error, api) => {
		if(error) return console.error(`Error [API]: ${error}`)
		
		const self = await api.getCurrentUserID()
		
		/*let db_read = await read()
		if(db_read != null)
			fs.writeFileSync("data/preferences.json", JSON.stringify(db_read), "utf8")
		*/
		if(options.selfListen)
			admins.push(self)
		admins.forEach(id => {
			api.sendMessage(`Bot service is now activated.`, id)
		})
		
		await cron(api)
		await cron_api(api)
		//await cron_feed(api, admins)
		
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		json.cooldown = {}
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		name = json.name

		interval_()
		
		api.setOptions(options)
		api.listen(async (error, event) => {
			if(error) return console.error(`Error [Listen Emitter]: ${error}`)
			
			if(options.autoMarkRead != undefined){
				if(options.autoMarkRead){
					await api.markAsReadAll()
				}
			}

			//join(api, event)
			
			if(event.body != null){
				let body = event.body
				let body_lowercase = body.toLowerCase()
				let name_lowercase = name.toLowerCase()
				let loop = true

				if(intervals[event.senderID] == undefined)
					intervals[event.senderID] = 5

				if(intervals[event.senderID] == 0 && !json.off.includes(event.senderID) && !admins.includes(event.senderID))
					api.sendMessage(getPrefix() + "off", event.threadID, event.messageID)
				
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
				
				if(body_lowercase == name_lowercase && !json.off.includes(event.senderID)){
					intervals[event.senderID] -= 1
					api.sendMessage("I'm still alive. Something you wanna ask for?", event.threadID)
					//api.sendMessage(JSON.stringify(intervals), self)
				}else if(body_lowercase.startsWith(name_lowercase)){
					intervals[event.senderID] -= 1
					commands.forEach(r => {
						if(r.data.queries != undefined){
							r.data.queries.forEach(q => {
								if(loop){
									let _prefix = name + ", "
									loop = system(api, event, r, q, _prefix)
								}
							})
						}
					})
					if(loop && ((json.status && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && json.cooldown[event.senderID] == undefined) || admins.includes(event.senderID))){
						let cooldown = true
						openai(api, event)
						cd(api, event, cooldown, json, 3)
					}
				}else if(body.startsWith(prefix)){
					intervals[event.senderID] -= 1
					commands.forEach(r => {
						if(r.data.commands != undefined){
							r.data.commands.forEach(q => {
								if(loop){
									loop = system(api, event, r, q, prefix)
								}
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
	getAdmins,
	getName,
	getPrefix
}
