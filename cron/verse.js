const axios = require("axios")

let verse = async () => {
	let result = await axios.get("https://labs.bible.org/api/?passage=votd&type=json").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Verse]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api, threadID) => {
	let data = await verse()
	if(data != null){
		let message = "Bible verse of the day:\n"
		data.forEach(r => {
			let text = r.text.replace(/<([\w]+)>|<\/([\w]+)>/gi, "")
			message += `${r.bookname} ${r.chapter}:${r.verse}\n${text}\n\n`
		})
		api.sendMessage(message, threadID)
	}
}
