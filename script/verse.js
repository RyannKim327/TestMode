const axios = require("axios")
const g = require("./../utils/gender")

let verse = async(data) => {
	if(data == undefined || data == null){
		let result = await axios.get("https://labs.bible.org/api/?passage=random&type=json").then(r => {
			return r.data
		}).catch(e => {
			console.error(`Error [Axios Verse]: ${e}`)
			return null
		})
		return result
	}else{
		let result = await axios.get("https://labs.bible.org/api/?passage=" + data + "&type=json").then(r => {
			return r.data
		}).catch(e => {
			console.error(`Error [Axios Verse]: ${e}`)
			return null
		})
		return result
	}
}

module.exports = async (api, event, regex) => {
	let body = event.body.match(regex)[1]
	let v = await verse(body)
	if(v == null){
		api.sendMessage("Please check your console", event.threadID)
	}else{
		let user = await api.getUserInfo(event.senderID)
		let gender = g(user[event.senderID]['firstName'])['eng']
		let message = `Here's your verse ${gender} ${user[event.senderID]['name']}\n\n`
		let res = message
		let lastBook = ""
		let lastChapter = ""
		v.forEach(r => {
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
		})
		v.forEach(r => {
			let text = r.text.replace(/<([\w]+)>|<\/([\w]+)>/gi, "")
			message += `${r.bookname} ${r.chapter}:${r.verse}\n${text}\n\n`
		})
		api.sendMessage({
			body: res,
			mentions: [{
				id: event.senderID,
				tag: user[event.senderID]['name']
			}]
		}, event.threadID)
	}
}
