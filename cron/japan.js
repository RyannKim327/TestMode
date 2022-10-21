const japan = require("japanese-wotd")

let senpai = async () => {
	let result = await japan.getJapaneseWordOfTheDay()
	return result
}

module.exports = async (api, event) => {
	let data = await senpai()
	console.log(data)
}