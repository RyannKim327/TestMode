const axios = require("axios")
const fs = require("fs")
const http = require("https")

const logs = require("./../utils/logs")

module.exports = async (api, event, result) => {
  const data = await axios.get(`https://betadash-search-download.vercel.app/yt?search=${encodeURI(result[1])}`).then(r => {
    return r.data
  }).catch(err => {
    logs.error("Music Search", err)
    return null
  })
  if(data){
    try{
      const filename = `${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`
      const file = fs.createWriteStream(filename)
      http.get(`https://yt-video-production.up.railway.app/ytdl?url=${encodeURI(data.url)}`, (res) => {
        res.pipe(file)
        file.on("finish", () => {
          api.sendMessage(`Here's your request:\n  Title: ${data.title}`,
            event.threadID, (error, msg) => {
              if(error){
                logs.error("Music Callback", error)
              }
            })
          api.sendMessage({
            attachment: [fs.createReadStream(filename)]
          }, event.threadID, () => {
            if(fs.existsSync(filename)){
              fs.unlink(filename, (error) => {})
            }
          })
        })
        file.on("error", () => {
          api.sendMessage("The song has some problems.", event.threadID, (error, msg) => {})
        })
      })
    }catch(error){
      logs.error("Music Catch", error)
    }
  }else{
    api.sendMessage("Kindly check or revise your query.", event.threadID, (error, message) => {})
  }
}
