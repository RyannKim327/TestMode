const axios = require("axios")
const fs = require("fs")
const cron = require("node-cron")
const g = require("./../utils/gender")

let quote = async () => {
	let result = await axios.get("https://zenquotes.io/api/quotes").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	cron.schedule("0 12 * * *", async () => {
		let quotes = await quote()
		let self = await api.getCurrentUserID()
		api.getThreadList(20, null, ['INBOX'], async (error, data) => {
			let sent = 7
			data.forEach(async (r) => {
				if(r.threadID != self && !json.offcron.includes(r.threadID) && !json.saga.includes(r.threadID) && sent > 0){
					let n = Math.floor(Math.random() * quotes.length)
					let q = quotes[n]
					let thread = await api.getThreadInfo(r.threadID)
					if(thread.isGroup){
						api.sendMessage(`A random quotation for ${thread.threadName}.\n\n  ${q.q}\n~${q.a}`, r.threadID)
					}else{
						let user = await api.getUserInfo(r.threadID)
						let gender = g(user[r.threadID]['firstName'])['eng']
						api.sendMessage({
							body: `A random quotation for you ${gender} ${user[r.threadID]['name']}.\n\n  ${q.q}\n~${q.a}`,
							mentions: [{
								id: r.threadID,
								tag: user[r.threadID]['name']
							}]
						}, r.threadID)
					}
				}
				sent -= 1
			})
		})
	},{
		timezone: "Asia/Manila",
		scheduled: true
	})
	
	cron.schedule("0 18 * * *", async () => {
		let quotes = await quote()
		let self = await api.getCurrentUserID()
		api.getThreadList(20, null, ['INBOX'], async (error, data) => {
			let sent = 7
			data.forEach(async (r) => {
				if(r.threadID != self && !json.offcron.includes(r.threadID) && !json.saga.includes(r.threadID) && sent > 0){
					let n = Math.floor(Math.random() * quotes.length)
					let q = quotes[n]
					let thread = await api.getThreadInfo(r.threadID)
					if(thread.isGroup){
						api.sendMessage(`A random quotation for ${thread.threadName}.\n\n  ${q.q}\n~${q.a}`, r.threadID)
					}else{
						let user = await api.getUserInfo(r.threadID)
						let gender = g(user[r.threadID]['firstName'])['eng']
						api.sendMessage({
							body: `A random quotation for you ${gender} ${user[r.threadID]['name']}.\n\n  ${q.q}\n~${q.a}`,
							mentions: [{
								id: r.threadID,
								tag: user[r.threadID]['name']
							}]
						}, r.threadID)
					}
				}
				sent -= 1
			})
		})
	},{
		timezone: "Asia/Manila",
		scheduled: true
	})
}

