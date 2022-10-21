const { Configuration, OpenAIApi } = require("openai")

let config = async (str) => {
	let configurations = new Configuration({
		"apiKey": process.env['openai']
	})
	let openai = new OpenAIApi(configurations)
	let { data } = await openai.createCompletion({
		prompt: str,
		model: "text-davinci-002",
		temperature: 0.5,
		max_tokens: 4000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0
	})
	return data
}

module.exports = async (api, event) => {
	let body = event.body
	if(body.split(" ").length > 1){
		let ai = await config(body)
		api.sendMessage("- " + ai.choices[0].text, event.threadID)
	}
}
