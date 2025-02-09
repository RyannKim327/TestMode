const axios = require("axios");
const bible = require("biblegateway-scrape");

module.exports = async (api, event, result) => {
  const data = await bible.verse(
    result[1],
    bible.version.ENG_KING_JAMES_VERSION
  );
  // console.log(data);
  api.sendMessage(
    `Bible Verse:\nVerse: ${data[0].book}\nPassage: ${data[0].verse}`,
    event.threadID,
    (err, msg) => {}
  );
};
