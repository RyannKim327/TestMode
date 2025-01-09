module.exports.log = (from, message) => {
  if(typeof message === "string"){
    console.log(`LOG [${from}]: ${message}`)
  }else{
    console.log(`LOG [${from}]: ${JSON.stringify(message, null, 2)}`)
  }
}

module.exports.err = (from, message) => {
  if(typeof message === "string"){
    console.error(`LOG [${from}]: ${message}`)
  }else{
    console.error(`LOG [${from}]: ${JSON.stringify(message, null, 2)}`)
  }
}
