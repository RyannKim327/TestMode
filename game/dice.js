module.exports = (api, event) => {
	const b = "⚫"
	const w = "⬜"

	const dice = [
		w + w + w + w + w + "\n" + w + w + w + w + w + "\n" + w + w + b + w + w + "\n" + w + w + w + w + w + "\n" + w + w + w + w + w,
		w + w + w + w + w + "\n" + w + b + w + w + w + "\n" + w + w + w + w + w + "\n" + w + w + w + b + w + "\n" + w + w + w + w + w,
		w + w + w + w + w + "\n" + w + b + w + w + w + "\n" + w + w + b + w + w + "\n" + w + w + w + b + w + "\n" + w + w + w + w + w,
		w + w + w + w + w + "\n" + w + b + w + b + w + "\n" + w + w + w + w + w + "\n" + w + b + w + b + w + "\n" + w + w + w + w + w,
		w + w + w + w + w + "\n" + w + b + w + b + w + "\n" + w + w + b + w + w + "\n" + w + b + w + b + w + "\n" + w + w + w + w + w,
		w + w + w + w + w + "\n" + w + b + w + b + w + "\n" + w + b + w + b + w + "\n" + w + b + w + b + w + "\n" + w + w + w + w + w,
	]

	api.getUserInfo(event.senderID, (err, data) => {
		if(err) return console.error("Error [Dice game]: " + err)
		let player_name = "~ " + data[event.senderID]['name']
		let player2_name = "~ Computer"
		if(event.type == "message_reply"){
			api.getUserInfo(event.messageReply.senderID, (err, data2) => {
				if(event.messageReply.senderID != event.senderID){
					player2_name = "~ " + data2[event.messageReply.senderID]['name']
				}
			})
		}
		let player = Math.floor(Math.random() * dice.length)
		let player2 = Math.floor(Math.random() * dice.length)
		
		api.sendMessage(player_name + ":\n" + dice[player], event.threadID)
		
		setTimeout(() => {
			let who = "\n\n"
			if(player > player2){
				who += player_name + " Wins"
			}else if(player < player2){
				who += player2_name + " Wins"
			}else{
				who += "It's a tie"
			}
			api.sendMessage(player2_name + ":\n" + dice[player2] + who, event.threadID)
			
		}, 3000)
	})
}