const config = require("./config")

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
		"busy"
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
	hasArgs: true
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
		"pin"
	],
	type: [
		"message",
		"message_reply"
	],
	admin: true
})

config.add("toggle", {
	title: "Toggle Status",
	description: "For admin use",
	commands: [
		"toggle"
	],
	admin: true
})

config.add("verse", {
	title: "Bible verse",
	description: "May share an specific bible verse requested by a user, or send a random verse given by the server.",
	queries: [
		"may\\sI\\shave\\sa\\srandom\\bible\\verse\\splease",
		"what\\sis\\s([\\w\\W]+)\\sin\\sthe\\sbible",
		"may\\sI\\shave\\s([\\w\\W]+)\\sin\\sthe\\sbible\\splease"
	],
	commands: [
		"verse$",
		"verse\\s([\\w\\W]+)$"
	],
	hasArgs: true
})

config.add("wiki", {
	title: "Wikipedia Search",
	description: "A simple search document which gives you a wikipedia based resukts.\nDisclaimer: Wikipedia is not so accurate so that if you were using this for research purposes, please don't continue it.",
	queries: [
		"what\\sis\\s([\\w\\W]+)",
		"can\\sI\\shave\\sa\\swiki\\sresult\\sof\\s([\\w\\W]+)"
	],
	commands: [
		"wiki\\ssearch\\s([\\w\\W]+)",
		"wiki\\s([\\w\\W]+)"
	],
	hasArgs: true
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

config.setPrefix("√")
config.setName("Mikay")
config.setFullName("Mikaella Aloa")
config.setOptions({
	listenEvents: true,
	selfListen: true,
	autoMarkRead: true
})

config.start({
	appState: JSON.parse(process.env['state'])
})
