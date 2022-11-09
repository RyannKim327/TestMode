const axios = require("axios")
const cronjob = require("node-cron")
const fs = require("fs")

let date = require("./../utils/date")

const japan = require("./japan")
const music = require("./music")

let today = async () => {
	let time = date("Asia/Manila")
	let result = await axios.get(`https://today.zenquotes.io/api/${time.getMonth() + 1}/${time.getDay()}`).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Event of the day]: ${e}`)
		return null
	})
	return result
}

let quote = async () => {
	let result = await axios.get("https://zenquotes.io/api/today").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result[0]
}

let verses = async () => {
	let result = await axios.get("https://labs.bible.org/api/?passage=votd&type=json").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Verse]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let self = await api.getCurrentUserID()
	cronjob.schedule("0 0 * * *", () => {
		json.busylist = []
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
	},{
		schedule: true,
		timezone: "Asia/Manila"
	})
	cronjob.schedule("30 6 * * *", async () => {
		let q_data = await quote()
		let v_data = await verses()
		let time = await today()
		let eve = time.data.Events
		let res = ""
		let lastBook = ""
		let lastChapter = ""
		for(let r of v_data){
			let book = r.bookname
			let chapter = r.chapter
			let verse = r.verse
			let text = r.text.replace(/<([\w]+)>|<\/([\w]+)>/gi, "")
			if(lastBook != book){
				res += "\n" + book
			}
			if(lastChapter != chapter && lastBook == book){
				res += "\n\n" + book + " " + chapter + "\n"
			}else if(lastChapter != chapter || lastBook != book){
				res += " " + chapter + "\n"
			}
			res += "[" + verse + "] " + text
			lastBook = book
			lastChapter = chapter
			//`${r.bookname} ${r.chapter}:${r.verse}\n${text}\n\n`
		}
		api.getThreadList(20, null, ['INBOX'], async (e, data) => {
			if(e) return console.error(`Error [Cron ThreadList]: ${e}`)
			let i = 0
			data.forEach(r => {
				if(self != r.threadID && !json.offcron.includes(r.threadID) && i < 10 && !json.saga.includes(r.threadID)){
					let ents = eve[Math.floor(Math.random() * eve.length)]
					let txt = ents.text.replace(/\d\s&#8211;/gi, "").replace(/&#91;\d&#93;/gi, "")
					let message = "Bible verse of the day:\n"
					message += res + "\n\n"
					message += `Quotation of the day from ${q_data.a}\n~ ${q_data.q}\n\nRandom event trivia for today\n~ ${txt}`
					api.sendMessage(message, r.threadID)
					i += 1
				}
			})
		})
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})
	cronjob.schedule("0 8 * * 7", () => {
		api.getThreadList(20, null, ['INBOX'], (e, data) => {
			if(e) return (`Error [Worship]: ${e}`)
			let i = 0
			data.forEach(r => {
				if(self != r.threadID && !json.offcron.includes(r.threadID) && i < 5 && !json.saga.includes(r.threadID)) {
					music(api, r.threadID)
				}
			})
		})
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})
}
