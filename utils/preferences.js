const fs = require("fs")
const logs = require("./logs")

module.exports.read = () => {
  if(fs.existsSync("data/preferences.json")){
    return JSON.parse(fs.readFileSync("data/preferences.json", "utf-8"))
  }
  return logs.err("Preferences Read", "Data not found")
}

module.exports.save = (data) => {
  if(fs.existsSync("data/preferences.json")){
    if(typeof data === 'object'){
      fs.writeFileSync("data/preferences.json", JSON.stringify(data, null, 2), "utf-8")
    }else{
      return logs.err("Preferences Save", "Data is not in JSON format")
    }
  }
  return logs.err("Preferences Read", "Data not found")
}


