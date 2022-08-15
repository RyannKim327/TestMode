const openai = require("./openai")

module.exports = (api, event) => {
	let body = event.body.split(" ")
	body.shift()
	let d = body.join(" ").replace(/\s/gi, "").replace(/([\W]+)/gi, "")
	let data = d.toLowerCase()
	let list = {
		"whodevelopedyou": "The developer didn't add anything related about him/herself. As the only priority is just to help and to share, gain knowledge.",
		"areyouanaiorarobot": "I don't know actually, but the only thing I know is, I'm just a facebook bot who's trying to apply some A.I type features.",
		"are": "",
		
	}
	if(list[data] == undefined){
		openai(api, event)
	}else{
		api.sendMessage(list[data], event.threadID)
	}
}