module.exports = async (api, event, prefix) => {
    api.shareContact("Bossing", event.messageReply.senderID, event.threadID)
}