const config = require("./config")
const server = require("./server")

config.add("info", {
	title: "Bot Information",
	description: "A simple introduction about the bot.",
	queries: [
		"who\\sare\\syou",
		"please\\sintroduce\\syourself\\sto\\sus"
	],
	commands: [
		"info",
		"help",
		"intro",
		"how",
		"tut"
	],
	hasCooldown: false
})

config.add("admin", {
	title: "Admin commands",
	description: "Lists of all admin commandments.",
	commands: [
		"admin"
	],
	admin: true
})

config.add("baybayin", {
	title: "Baybayin Transliterator",
	description: "A command which can transform a normal text into baybayin characters.",
	queries: [
		"please\\stransliterate\\s([\\w\\W]+)\\sto\\sbaybayin",
	],
	commands: [
		"baybay\\s([\\w\\W]+)",
		"baybayin\\s([\\w\\W]+)"
	],
	hasArgs: true
})

config.add("busy", {
	title: "Busy Mode",
	description: "Setup by an admin during busy.",
	commands: [
		"busy",
		"clearbusy"
	],
	admin: true
})

config.add("cron", {
	title: "Close Cron Commands.",
	description: "This is to disable automatic responses from a user.",
	commands: [
		"off cron"
	],
	hasCooldown: false,
	affect: true
})

config.add("feeds", {
	title: "Application feedback",
	description: "For feedbacks and error comming from the app.",
	commands: [
		"feedback"
	],
	admin: true
})

config.add("gender", {
	title: "Add new Gender",
	description: "Setup by an admin to add a new name data with gender..",
	commands: [
		"gender\\s([\\w]+)\\sas\\s([\\w]+)"
	],
	admin: true,
	hasArgs: true,
	type: [
		"message",
		"message_reply"
	]
})

config.add("google", {
	title: "Google Search Engine",
	description: "A command with educational purposes searches.",
	commands: [
		"google\\s([\\w\\W]+)"
	],
	hasArgs: true,
	cd: 3
})

config.add("guitar", {
	title: "Ultimate Guitar Tabs Command",
	description: "A command which gives you a random guitar chords/tabs.",
	commands:[
		"guitar\\s([\\w\\W]+)",
		"tabs\\s([\\w\\W]+)"
	],
	hasArgs: true
})

config.add("music", {
	title: "YouTube Music Command",
	description: "A music command which gives you a youtube music based results",
	queries: [
		"play\\sthe\\ssong\\s([\\w\\W]+)\\splease",
		"please\\splay\\sthe\\ssong\\s([\\w\\W]+)"
	],
	commands: [
		"music\\s([\\w\\W]+)",
		"sing\\s([\\w\\W]+)",
		"play\\s([\\w\\W]+)"
	],
	hasArgs: true
})

config.add("name", {
	title: "New bot name",
	description: "For modifications only",
	commands: [
		"set\\sname\\sas\\s([\\w]+)"
	],
	hasArgs: true,
	admin: true
})

config.add("off", {
	title: "Off/On Bot Feature",
	description: "Setup by an admin to enable/disable the bot commands in a particular group or person.",
	commands: [
		"off",
		"on"
	],
	type: [
		"message",
		"message_reply"
	],
	admin: true
})

config.add("pin", {
	title: "Pin a message",
	description: "Setup a pinned message, or show the pinned message.",
	commands: [
		"clearpin",
		"pin"
	],
	type: [
		"message_reply"
	],
	admin: true
})

config.add("pin", {
	title: "Show pinned message",
	description: "Showing the current pinned message",
	commands: [
		"pin"
	],
	hasCooldown: false
})

config.add("toggle", {
	title: "Toggle Status",
	description: "For admin use",
	commands: [
		"toggle"
	],
	admin: true
})

config.add("updates", {
	title: "Application Updates",
	description: "An updater of app",
	commands: [
		"app_update\\s([\\W\\w]+)$"
	],
	admin: true,
	hasArgs: true
})

config.add("verse", {
	title: "Bible verse",
	description: "May share an specific bible verse requested by a user, or send a random verse given by the server.",
	queries: [
		"may\\sI\\shave\\sa\\srandom\\sbible\\sverse\\splease",
		"what\\sis\\s([\\w\\W]+)\\sin\\sthe\\sbible",
		"may\\sI\\shave\\s([\\w\\W]+)\\sin\\sthe\\sbible\\splease"
	],
	commands: [
		"verse$",
		"verse\\s([\\w\\W]+)$"
	],
	hasArgs: true
})

config.add("video", {
	title: "Youtube Video Command",
	description: "This will send the top search result video from youtube platform.",
	queries: [
		"play\\sthe\\svideo\\s([\\w\\W]+)\\splease",
		"please\\splay\\sthe\\svideo\\s([\\w\\W]+)"
	],
	commands: [
		"video\\s([\\w\\W]+)$"
	],
	hasArgs: true,
	cd: 5
})

config.add("wiki", {
	title: "Wikipedia Search",
	description: "A simple search document which gives you a wikipedia based resukts.\nDisclaimer: Wikipedia is not so accurate so that if you were using this for research purposes, please don't continue it.",
	queries: [
		"please\\ssearch\\s([\\w\\W]+)\\splease",
		"can\\sI\\shave\\sa\\swiki\\sresult\\sof\\s([\\w\\W]+)"
	],
	commands: [
		"wiki\\ssearch\\s([\\w\\W]+)$",
		"wiki\\s([\\w\\W]+)$"
	],
	hasArgs: true
})

config.add("worship", {
	title: "New Worship song",
	description: "Add new worship song playlist.",
	commands: [
		"add\\sworship\\ssong\\s([\\w\\W]+)"
	],
	hasArgs: true,
	admin: true
})

config.add("worshiplists", {
	title: "Worship song lists",
	description: "Get worship song playlist.",
	commands: [
		"worship\\slists"
	],
	admin: true
})

config.add("answer", {
	title: "Answer in a game",
	description: "This must be your response if you want to answer in your game.",
	queries: [
		"my\\sanswer\\sis\\s([\\w\\W]+)"
	],
	commands: [
		"answer\\s([\\w\\W]+)"
	],
	game: true,
	hasArgs: true,
	show: false
})

config.add("dice", {
	title: "Roll A Die Game",
	description: "A simple random with vs players or vs computer.",
	commands: [
		"game\\sroll\\sa\\sdie"
	],
	type: [
		"message",
		"message_reply"
	],
	game: true
})

config.add("dropball", {
	title: "Drop Ball",
	description: "Test Mode",
	commands: [
		"drop\\s([\\d]+)"
	],
	hasArgs: true,
	game: true
})

config.add("flames", {
	title: "Flames",
	description: "A game or just for fun feature that recognized your relationship status with your crush.",
	commands: [
		"flames$",
		"flames\\s([\\w\\W]+)$",
		"flames\\s([\\w\\W]+)\\sand\\s([\\w\\W]+)$"
	],
	type: [
		"message",
		"message_reply"
	],
	game: true,
	hasArgs: true
})

config.setAdmins("100081698814451")

config.setPrefix("√")
config.setOptions({
	listenEvents: true,
	selfListen: true,
	autoMarkRead: true
})

config.start({
	appState: JSON.parse(process.env['state'])
})

let run = () => {
	console.log("Run")
	setTimeout(run, 60000)
}

server()