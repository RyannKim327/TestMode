const axios = require("axios")
const cron = require("node-cron")

let quote = async () => {
	let result = await axios.get("https://zenquotes.io/api/random").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api) => {
	cron.schedule("* */3 * * *", async () => {
		let quotes = await quote()
		api.getThreadList(20, null, ['INBOX'], async (error, data) => {
			let sent = 5
			data.forEach(async (r) => {
				if(r.isGroup && i < 10 && r.name != null && !json.saga.includes(r.threadID) && sent > 0){
					let n = Math.floor(Math.random() * quotes.length)
					let q = quotes[n]
					let thread = await api.getThreadInfo(r.threadID)
					api.sendMessage(`A random quotation for ${thread.threadName}\n\n.  ${q.q}\n~${q.a}`, r.threadID)
				}
				sent -= 1
			})
		})
	},{
		timezone: "Asia/Manila",
		scheduled: true
	})
}
