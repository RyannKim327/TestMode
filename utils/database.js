const axios = require("axios")

let read = async () => {
	let result = await axios.get("https://mikayserver.ultramicrospectrophotometer.repl.co/").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Database R]: ${e}`)
		return null
	})
	return result
}

let write = async (data) => {
	let result = await axios.get("https://mikayserver.ultramicrospectrophotometer.repl.co/write?key=" + process.env['key'] + "&json=" + JSON.stringify(data)).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Database W]: ${e}`)
		return null
	})
	
	return result
}

module.exports = {
	read,
	write
}
