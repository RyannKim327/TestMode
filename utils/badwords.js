const fs = require("fs")

module.exports = (text) => {
	let data = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let _ = text.toLowerCase()
	let _data = _.split(/\s/)
	let output = true
	for(let i = 0; i < _data.length; i++){
		if(data.badwords.includes(_data[i])){
			output = false
			break
		}
	}
	return output
}
