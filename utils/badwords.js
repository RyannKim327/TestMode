const {read} = require("./database")

module.exports = async (text) => {
	let data = await read() //JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	console.log(data)
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
