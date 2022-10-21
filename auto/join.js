const fs = require("fs")
const config = require("./../config")
const g = require("./../utils/gender")
const youtube = require("youtubei.js")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let thread = await api.getThreadInfo(event.threadID)
	if(event.type == "event"){
		switch(event.logMessageType){
			case "log:subscribe":
				let lists = await event.logMessageData.addedParticipants
				let self = api.getCurrentUserID()
				let message = {
					body: `Welcome to ${thread.threadName}\n\n`,
					mentions: []
				}
				for(let r of lists) {
					console.log(r)
					let id = r.userFbId
					let user = await api.getUserInfo(id)
					if(id == self){
						let name = config.getName()
						api.sendMessage(`Hello, I am ${name}, nice meeting you here.`, event.threadID)
					}else{
						let gender = g(user[id]['firstName'])["eng"]
						message.body += `${gender} ${user[id]['name']}\n`
						message.mentions.push({
							id,
							tag: user[id]['name'],
							fromIndex: 9
						})
					}
				}
				api.sendMessage(message, event.threadID)
			break
			case "log:unsubscribe":/*
				if(thread.isGroup){
					let self = await api.getCurrentUserID()
					let id = event.logMessageData.leftParticipantFbId
					if(self != id){
						let user = await api.getUserInfo(id)
						let songs =  [
							"goodbye by air supply",
							"farewell by raymond lauchengco",
							
						]
					}
				}
			*/break
		}
	}
}