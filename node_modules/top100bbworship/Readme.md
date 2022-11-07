# Billboard TOP 100 Worship songs
### MPOP Reverse II


### How to install
``` Bash
npm install top100bbworship
```

### How to use (NodeJS)
``` NodeJS
const top100bb = require("top100bbworship")

(async () => {
	let top100 = await top100bb()
	console.log(top100)
})
```

### Sample output (JSON)
``` JSON
[
	{
		"title": "Sample song",
		"artist": "Sample artist"
	}
]

```