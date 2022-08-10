const cronjob = require("node-cron")
const fs = require("fs")

const quotes = require("./quotes")
const verse = require("./verse")

module.exports = (api) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	cronjob.schedule("30 7 * * *", () => {
		api.getThreadList(20, null, ['INBOX'], (e, data) => {
			if(e) return console.error(`Error [Cron ThreadList]: ${e}`)
			let i = 0
			data.forEach(r => {
				if(r.isGroup && i < 10 && r.name != null && !json.saga.includes(r.threadID)){
					quotes(api, r.threadID)
					verse(api, r.threadID)
					i += 1
				}
			})
		})
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})
}
