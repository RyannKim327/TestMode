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

config.add("gender", {
	title: "Add new Gender",
	description: "For admin use.",
	commands: [
		"gender\\s([\\w]+)\\sas\\s([\\w]+)"
	],
	admin: true,
	hasArgs: true
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
		"play\\sthe\\ssong([\\w\\W]+)\\splease",
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

config.setPrefix("√")
config.setName("Hally")
config.setOptions({
	listenEvents: true,
	selfListen: true,
	autoMarkRead: true
})

config.start({
	appState: JSON.parse(process.env['state'])
})
