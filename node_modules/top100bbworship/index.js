const axios = require("axios")
const cheerio = require("cheerio")

module.exports = async () => {
	let a = await axios.get("https://www.billboard.com/charts/year-end/hot-christian-songs").then(r => {
		return r.data
	}).catch(e => {
		return null
	})
	let b = await cheerio.load(a)
	let c = b(".o-chart-results-list__item")
	let d = []
	c.each((i, e) => {
		let f = {}
		let g = b(e).children("h3").text().replace(/\n/gi, "").replace(/\t/gi, "").replace(/\r/gi, "")
		let h = b(e).children("span")
		if(g != undefined && g != ""){
			f.title = g
			f.artist = h.text().replace(/\n/gi, "").replace(/\t/gi, "").replace(/\r/, "")
			d.push(f)
		}
	})
	return d
}