module.exports = (name) => {
	let names = name.split(" ")
	let gender
	if(names[0] == undefined){
		if(names[1] == undefined){
			gender = {
				eng: "Mr./Ms.",
				tag: "Ginoong/Binibining"
			}
		}else{
			if(names[1] == 1){
				gender = {
					eng: "Mr.",
					tag: "Ginoong"
				}
			}else if(names[0] == 0){
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
		if(names[0] == 1){
			gender = {
				eng: "Mr.",
				tag: "Ginoong"
			}
		}else if(names[0] == 0){
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
	return gender
}