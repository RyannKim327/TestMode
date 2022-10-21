const fs = require("fs")

module.exports = (api, event, regex) => {
	let body = event.body.match(regex)[1]
	let json = JSON.parse(fs.readFileSync("data/games.json", "utf8"))
	if(json.answer[event.senderID] == undefined){
		api.sendMessage("Please play a game first.", event.threadID)
	}else{
		let data = json.answer[event.senderID]
		if(score == undefined){
			json[current_game][score][event.senderID] = 0
		}
		if(data == body){
			json[current_game][score][event.senderID] += 1
			api.sendMessage("You've got it.", event.threadID)
		}else{
			let score = json[current_game][score][event.senderID]
			if(json[current_game] == "word"){
				if(json.word.trials[event.senderID] > 1){
					json.word.trials[event.senderID] -= 1
				}else{
					api.sendMessage(`Wrong answer, it must be ${json.answer[event.senderID]}.`, event.threadID)
					if(json[current_game][score][event.senderID] > 0){
						json[current_game][score][event.senderID] -= 1
					}
				}
			}else{
				api.sendMessage(`Wrong answer, it must be ${json.answer[event.senderID]}.`, event.threadID)
				if(json[current_game][score][event.senderID] > 0){
					json[current_game][score][event.senderID] -= 1
				}
			}
		}
		api.sendMessage(`Your current score: ${json[current_game][score][event.senderID]}`, event.threadID, event.messageID)
		json.answer[event.senderID] = undefined
		fs.writeFileSync("data/games.json", JSON.stringify(json), "utf8")
	}
}