const fs = require("fs")

module.exports = (name) => {
	let names = name.toLowerCase().split(/\s/gi)
	let json = JSON.parse(fs.readFileSync("data/gender.json", "utf8"))
	let gender
	if(json[names[0]] == undefined){
		if(json[names[1]] == undefined){
			gender = {
				eng: "Mr./Ms.",
				tag: "Ginoong/Binibining"
			}
		}else{
			if(json[names[1]] == 1){
				gender = {
					eng: "Mr.",
					tag: "Ginoong"
				}
			}else if(json[names[0]] == 0){
				gender = {
					eng: "Ms.",
					tag: "Binibining"
				}
			}else{
				gender = {
					eng: "Mr./Ms.",
					tag: "Ginoong/Binibining"
				}
			}
		}
	}else{
		if(json[names[0]] == 1){
			gender = {
				eng: "Mr.",
				tag: "Ginoong"
			}
		}else if(json[names[0]] == 0){
			gender = {
				eng: "Ms.",
				tag: "Binibining"
			}
		}else{
			if(names.length > 1){
				if(json[names[1]] == undefined){
					gender = {
						eng: "Mr./Ms.",
						tag: "Ginoong/Binibining"
					}
				}else{
					if(json[names[1]] == 1){
						gender = {
							eng: "Mr.",
							tag: "Ginoong"
						}
					}else if(json[names[0]] == 0){
						gender = {
							eng: "Ms.",
							tag: "Binibining"
						}
					}else{
						gender = {
							eng: "Mr./Ms.",
							tag: "Ginoong/Binibining"
						}
					}
				}
			}else{
				gender = {
					eng: "Mr./Ms.",
					tag: "Ginoong/Binibining"
				}
			}
		}
	}
	return gender
}
