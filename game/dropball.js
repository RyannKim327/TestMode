let drop = (pos) => {
	let str = ""
	let min = 1
	let max = 5
	let floors = 15
	for(let i = 0; i < 15; i++){
		let r = Math.floor(Math.random() * 10)
		if(pos >= max){
			pos--
		}else if(pos <= min){
			pos++
		}else{
			if((r % 2) == 0){
				pos++
			}else{
				pos--
			}
		}
		for(let j = min; j <= max; j++){
			if(j == pos){
				str += "🟢"
			}else{
				str += "⚪"
			}
		}
		str += "\n"
	}
	return str
}

module.exports = (api, event, regex) => {
	let num = parseInt(event.body.match(regex)[1] - 1)
	let str = drop(num)
	api.sendMessage(str, event.threadID)
}