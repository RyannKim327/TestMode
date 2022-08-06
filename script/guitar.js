const axios = require("axios")
const cheerio = require("cheerio")
const google = require("googlethis")

let search = async (query) => {
	let data = await google.search(query, {
		safe: true
	})
	return data
}

let tabs = async (url) => {
	let { data } = await axios.get(url)
	let $ = cheerio.load(data)
	let tab = $("div[class='js-store']").attr("data-content")
	let json = JSON.parse(tab)
	return json
}

module.exports = async (api, event, regex) => {
	let body = event.body.match(regex)
	let engine = await search(body[1] + " tabs ultimate guitar")
	api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
	let results = engine.results
	if(results.length > 0){
		let i = Math.floor(Math.random() * results.length)
		let j = []
		let k = false
		while(!k && (results[i].url == undefined || !(results[i].url.startsWith("https://tabs.ultimate-guitar.com"))){
			j.push(i)
			if(j.includes(i)){
				i = Math.floor(Math.random() * results.length)
			}
			if(j.length == results.length){
				k = true
			}
		}
		if(k && j.kength >= results.length){
			api.sendMessage("There is no song found on the server.", event.threadID)
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else{
			let url = results[i].url
			let guitar = await tabs(url)
			api.setMessageReaction("⌛", event.messageID, (e) => {}, true)
			let m = guitar.store.page.data.tab_view.wiki_tab.content
			let n = guitar.store.page.data.tab
			let message = `${n.song_name} - ${n.artist_name}\nChords/Tabs by: ${n.username}\nTuning: ${n.tonality_name}\n\n` + m.replace(/(\[\/ch\]|\[\/tab\]|\[tab\]|\[ch\])/gi,"")
			api.sendMessage(message, event.threadID)
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}
	}else{
		api.sendMessage("No results found, might be a server error, or literally no results.", event.threadID)
		api.setMessageReaction("", event.messageID, (e) => {}, true)
	}
}
