module.exports = (str, prefix) => {
  if(typeof str === "string"){
    str = str.replace(/__all__/gi, "([\\w\\W]+)")
    str = str.replace(/__alpha__/gi, "([\\w]+)")
    str = str.replace(/__digits__/gi, "([\\d]+)")
    str = str.replace(/__spaces__/gi, "([\\s]+)")
    str = str.replace(/__characters__/gi, "([\\W]+)")
    return new RegExp(`^${prefix ?? ""}${str}`, "i")
  }
  return str
}
