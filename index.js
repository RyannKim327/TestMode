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
		"information",
		"introduction",
		"helpdesk",
		"tutorial",
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

config.add("morse", {
	title: "Morse code",
	description: "An encryption command from a-z 0-9 to morse code and vice versa.",
	queries: [
		
	]
})

config.add("music", {
	title: "YouTube Music Command",
	description: "A music command which gives you a youtube music based results",
	queries: [
		"play\\sthe\\ssong([\\w\\W]+)\\please",
		"please\\splay\\sthe\\ssong([\\w\\W]+)"
	],
	commands: [
		"music\\s([\\w\\W]+)",
		"sing\\s([\\w\\W]+)",
		"play\\s([\\w\\W]+)"
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

config.setPrefix("")
config.setName("Hally")
config.setOptions({
	listenEvents: true,
	selfListen: true,
	autoMarkRead: true
})

config.start({
	appState: JSON.parse(process.env['state'])
})
