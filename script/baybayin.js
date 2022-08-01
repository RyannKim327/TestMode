const axios = require("axios")

async function data(text) {
	let { data } = await axios.get("https://api-baybayin-transliterator.vercel.app?text=" + text)
	return data
}

module.exports = (api, event, regex) => {
	let {
		body,
		threadID
	} = event
	let _data = data.match(regex)[1]
	if(_data == undefined){
		api.sendMessage("Baybayin: Error", threadID)
	}else{
		let baybayin = data(_data)
		api.sendMessage("Result: " + baybayin.baybay, threadID)
	}
}