const cron = require("node-cron")

module.exports = async (api) => {
	cron.schedule("* */6 * * *", async () => {
		await api.getAppState()
	},{
		timezone: "Asia/Manila",
		scheduled: true
	})
}
