const axios = require("axios")
const fs = require("fs")

const logs = require("./../utils/logs")

module.exports = async (api, event, prefix) => {
  const json = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"))
  const user = event.senderID
  let message = event.body.substring(prefix.length);
  const key = `${user}_${event.threadID}`
  let name = json.names[user]
  
  if(!name){
    const usr = await api.getUserInfo(user)
    if(usr[user]['name']){
      name = usr[user]['name']
    }
  }
  let msg = [{
    role: "user",
    content: `Pretend to be the girlfriend of Kyle named krysanne. By the way, I am ${json.names[user]}`,
  },
  {
    role: "system",
    content: "Hello, my name is krysanne, you may call me krys, may I ask your name?",
  }]
  
  if(!json.prompts[key]){
    json.prompts[key] = msg
  }

  if(event.messageReply){
    const body = event.messageReply.body
    const user_ = await api.getUserInfo(event.messageReply.senderID)
    message = `${message}\n\nAccording to ${user_[event.messageReply.senderID]['name']}: ${body}`
  }
  
  json.prompts[key].push({
    "role": "user",
    "content": message
  })
  
  const a = json.prompts[key]

  try{
    const { data } = await axios.post(
      "https://gpt24-ecru.vercel.app/api/openai/v1/chat/completions",
      {
        messages: a,
        stream: false,
        model: "gpt-4o-mini",
        temperature: 0.5,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
        max_tokens: 4000,
      },
    );
    api.sendMessage(data.choices[0].message.content, event.threadID, (error, msg) => {
      json.prompts[key].push({
        "role": "system",
        "content": data.choices[0].message.content
      })
      fs.writeFileSync("data/gpt.json", JSON.stringify(json, null, 2), "utf-8")
    })
  }catch(error){
    logs.log("Fallback", error)
  }
}
