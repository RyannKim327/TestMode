const axios = require("axios")
const fs = require("fs")
const http = require("https")

const logs = require("./../utils/logs")

module.exports = async (api, event, result) => {
  try{
  const { data } = await axios.get(`https://dlvc.vercel.app/yt-audio?search=${encodeURI(result[1])}`)
  const file = fs.createWriteStream(`temp/${event.senderID}_${event.threadID}.mp3`)
  http.get(data.downloadUrl, (res) => {
    res.pipe(file)
    file.on("finish", () => {
      api.sendMessage({
        body: `Here's your request:\n  Title: ${data.title}`,
        attachment: fs.createReadStream(`${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`).on("end", () => {
          if(fs.existsSync(`${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`)){
            fs.unlink(`${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`, (error) => {})
          }
        })
      }, event.threadID, (error, msg) => {})
    })
  })
  }catch(error){
    logs.err("Music Catch", error)
  }
}
