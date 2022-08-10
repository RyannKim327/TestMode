const axios = require("axios")

let quotes = async () => {
	let result = await axios.get("https://zenquotes.io/api/today").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api, threadID) => {
	let data = await quotes()
	if(data != null){
		let a = Math.floor(Math.random() * data.length)
		let b = data[a]
		let message = `A quotation from ${b.a}\n~ ${b.q}`
		api.sendMessage(message, threadID)
	}
}