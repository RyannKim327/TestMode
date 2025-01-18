module.exports.log = (from, message) => {
  if(typeof message === "string"){
    console.log(`\x1b[32mLOG [${from}]:\x1b[37m ${message}`)
  }else{
    console.log(`\x1b[32mLOG [${from}]:\x1b[37m ${JSON.stringify(message, null, 2)}`)
  }
}

module.exports.error = (from, message) => {
  if(typeof message === "string"){
    console.error(`\x1b[31mERROR [${from}]:\x1b[37m ${message}`)
  }else{
    console.error(`\x1b[31mERROR [${from}]:\x1b[37m ${JSON.stringify(message, null, 2)}`)
  }
}
