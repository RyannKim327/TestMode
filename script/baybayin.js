const axios = require("axios")
const gender = require("./../utils/gender")

let result = async (str) => {
	let data = await axios.get("https://api-baybayin-transliterator.vercel.app/?text=" + str).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios baybayin]: ${e}`)
		return null
	})
	return data
}

module.exports = async (api, event, regex) => {
	let _regex = event.body.match(regex)
	let data = result(_regex[1])
	let userID = event.senderID
	let user = await api.getUserInfo(userID)
	let name = user[userID].name
	let g = gender(name)['eng']
	api.sendMessage(`The text "${_regex[1]}" in baybayin ${g} ${name} is "${data.baybayin}".`, event.threadID)
}
