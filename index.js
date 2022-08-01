const config = require("./config")

config.add("info", {
	title: "Bot Information",
	description: "A command that introduces the bot",
	queries: [
		"info"
	]
})

config.add("baybayin", {
	title: "Baybayin Transliterator",
	description: "A transliterator from roman characters to baybayin script",
	queries: [
		"baybay ([\\w\\W]+)"
	],
	hasArgs: true
})

config.setOptions({
	listenEvents: true,
	selfListen: true,
	markAsRead: true
})

config.setPrefix("√")

config.start()