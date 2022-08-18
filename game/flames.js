const doFLAMES = (name1, name2) => {
    let flames = 'FLAMES';
    let arrFlames = flames.split('');
    let objFlames = {
        F: 'Friends',
        L: 'Lovers',
        A: 'Affection',
        M: 'Marriage',
        E: 'Enemy',
        S: 'Siblings'
    };
    let name1Arr = name1.toLowerCase().replace(' ', '').split('');
    let name2Arr = name2.toLowerCase().replace(' ', '').split('');
    name1Arr = name1Arr.filter((letter) => !name2.toLowerCase().replace(' ', '').includes(letter));
    name2Arr = name2Arr.filter((letter) => !name1.toLowerCase().replace(' ', '').includes(letter));
    let lettersCount = name1Arr.length + name2Arr.length;
    let flamesLength = flames.length;
    let index = 0;
    while(flamesLength > 1) {
        index = Math.floor(lettersCount % flamesLength);
        if(index == 0)
            flames = flames.replace(arrFlames[flamesLength - 1], '');
        else {
            flames = flames.replace(arrFlames[index - 1], '');
            flames = flames.substring(index - 1) + flames.substring(0, index - 1);
        }
        arrFlames = flames.split('');
        flamesLength -= 1;
    }
    return objFlames[flames];
};

module.exports = async (api, event, regex) => {

	let data = event.body
	let reg = data.match(regex)
	let name = reg[1]
	let crush = reg[2]
	if(event.type == "message_reply"){
		let user = await api.getUserInfo(event.messageReply.senderID)
		crush = user[event.messageReply.senderID]['name']
		if(name == undefined){
			let owner = await api.getUserInfo(event.senderID)
			let name = owner[event.senderID]['name']
			let result = doFLAMES(name, crush)
			api.sendMessage(`The FLAMES result of ${name} and ${crush} is ${result}.`, event.threadID)
		}else{
			let result = doFLAMES(name, crush)
			api.sendMessage(`The FLAMES result of ${name} and ${crush} is ${result}.`, event.threadID)
		}
	}else{
		console.log(name)
		console.log(crush)
		if(name != undefined && crush != undefined){
			let result = doFLAMES(name, crush)
			api.sendMessage(`The FLAMES result of ${name} and ${crush} is ${result}.`, event.threadID)
		}else{
			api.sendMessage("Please complete the arguments.", event.threadID)
		}
	}
}
