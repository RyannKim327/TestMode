module.exports = (str, prefix) => {
	return new RegExp(`^${prefix ?? ""}${str}`, "i")
}
