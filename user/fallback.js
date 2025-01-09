const axios = require("axios")
const fs = require("fs")

module.exports = async (api, event, prefix) => {
  console.log("Fallback")
  const json = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"))
  const user = event.senderID
  const message = event.body.substring(prefix.length);
  
  let msg = [{
    role: "user",
    content: `Pretend to be the girlfriend of Ryann Kim Sesgundo named krysanne. By the way, I am ${json.names[user]}`,
  },
  {
    role: "system",
    content: "Hello, my name is krysanne, you may call me AI, may I ask your name?",
  }]
  if(json.prompts){
    msg = json.prompts
  }
  const { data } = await axios.post(
    "https://gpt24-ecru.vercel.app/api/openai/v1/chat/completions",
    {
      messages: message,
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
    json.prompts.push(message)
    json.prompts.push(data.choices[0].message.content)
    fs.writeFileSync("data/gpt.json", JSON.stringify(json, null, 2), "utf-8")
  })
}
