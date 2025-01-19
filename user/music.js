const axios = require("axios")
const fs = require("fs")
const http = require("https")

const logs = require("./../utils/logs")

module.exports = async (api, event, result) => {
  const data = await axios.get(`https://dlvc.vercel.app/yt-audio?search=${encodeURI(result[1])}`).then(r => {
    return r.data
  }).catch(err => {
    logs.error("Music Search", err)
    return null
  })
  if(data){
    try{
      const filename = `${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`
      const file = fs.createWriteStream(filename)
      http.get(data.downloadUrl, (res) => {
        res.pipe(file)
        file.on("finish", () => {
          api.sendMessage({
            body: `Here's your request:\n  Title: ${data.title}`,
            attachment: fs.createReadStream(filename)
          },
            event.threadID, (error, msg) => {
              if(error){
                logs.error("Music Callback", error)
              }
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
