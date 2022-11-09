const fs = require("fs")
const top100 = require("top100bbworship")
const youtubei = require("youtubei.js")
const g = require("./../utils/gender")

module.exports = async (api, event) => {
	let name = `${__dirname}/../temp/${event}_worship.mp3`
	let top = await top100()
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	if(!fs.existsSync(name)){
		let yt = await new youtubei()
		let dom = Math.floor(Math.random() * 100)
		let songs = json.lists
		let song = songs[Math.floor(Math.random() * songs.length)]
		if((dom % 2) == 0){
			songs = top
			let afk = songs[Math.floor(Math.random() * songs.length)]
			song = afk.title + " " + afk.artist
		}
		let search = await yt.search(song)
		if(search.videos.length > 0){
			let s_id = search.videos[0].id
			if(s_id != undefined){
				const info = await yt.getDetails(s_id)
				if(info.title != undefined){
					let file = fs.createWriteStream(`temp/${event}_worship.mp3`)
					let dl = yt.download(s_id, {
						format: "mp4",
						quality: "tiny",
						type: "audio",
						audioQuality: "lowest",
						audioBitrate: "550"
					})
					dl.pipe(file)
					dl.on("end", async () => {
						let thread = await api.getThreadInfo(event)
						if(thread.isGroup){
							api.sendMessage({
								body: `A random worship song for ${thread.threadName} entitled ${info.title}`,
								attachment: fs.createReadStream(name).on("end", async () => {
									if(fs.existsSync(name)){
										fs.unlink(name, (e) => {
											if(e) return console.error(`Error [Unlink worship]: ${e}`)
										})
									}
								})
							}, event)
						}else{
							let user = await api.getUserInfo(event)
							let gender = g(user[event]['firstName'])["eng"]
							api.sendMessage({
								body: `Here's a random worship song for you ${gender} ${user[event]['name']} entitled ${info.title}`,
								attachment: fs.createReadStream(name).on("end", async () => {
									if(fs.existsSync(name)){
										fs.unlink(name, (e) => {
											if(e) return console.error(`Error [Unlink worship]: ${e}`)
										})
									}
								}),
								mentions: [{
									id: event,
									tag: user[event]['name']
								}]
							}, event)
						}
					})
				}
			}
		}
	}
	
}