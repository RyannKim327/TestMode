module.exports = (api, event) => {
  api.sendMessage("Hello test", event.threadID, (error, msg) => {})
}
