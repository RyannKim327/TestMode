const UG = require("ultimate-guitar");

module.exports = async (api, event, result) => {
  const body = result[1];
  const data = await UG.searchSong(body, UG.CHORDS);
  const s = data.responses[0];
  const guitar = await UG.fetchChords(s);
  api.sendMessage(
    `Here's your request:\n\nTitle: ${s.song_name}\nArtist: ${s.artist_name}\n\n${guitar.response}`,
    event.threadID,
    (error, msg) => { },
  );
};
