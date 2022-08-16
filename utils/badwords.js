const fs = require("fs")

module.exports = (text) => {
	let data = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let _data = text.split(/\s/)
	for(let i = 0; i < _data.length; i++){
		if(data.includes(_data[i])){
			return true
			break
		}
	}
	return false
}
