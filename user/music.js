const axios = require("axios");
const fs = require("fs");
const http = require("https");

const logs = require("./../utils/logs");

module.exports = async (api, event, result) => {
  let q = "?q=";
  const data = await axios
    .get(
      `https://kaiz-apis.gleeze.com/api/ytsearch${q}${encodeURIComponent(result[1])}`,
    )
    .then((r) => {
      return r.data.items[0];
    })
    .catch((err) => {
      logs.error("Music Search", err);
      return null;
    });
  logs.log("Music test", data);
  if (data) {
    const newData = await axios
      .get(
        `https://kaiz-ytmp4-downloader.vercel.app/ytmp4?url=${encodeURIComponent(data.url)}&quality=mp3`,
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        logs.error("Music fetch", error);
        return null;
      });
    logs.log("Fetch Music", newData);
    try {
      const filename = `${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`;
      const file = fs.createWriteStream(filename);
      http.get(newData.download_url, (res) => {
        res.pipe(file);
        file.on("finish", () => {
          api.sendMessage(
            {
              body: `Here's your request:\n  Title: ${data.title}`,
              attachment: [fs.createReadStream(filename)],
            },
            event.threadID,
            (error, msg) => {
              if (error) {
                logs.error("Music Callback", error);
              }
              if (fs.existsSync(filename)) {
                fs.unlink(filename, (error) => {});
              }
            },
          );
        });
        file.on("error", () => {
          api.sendMessage(
            "The song has some problems.",
            event.threadID,
            (error, msg) => {},
          );
        });
      });
    } catch (error) {
      logs.error("Music Catch", error);
    }
  } else {
    api.sendMessage(
      "Kindly check or revise your query.",
      event.threadID,
      (error, message) => {},
    );
  }
};
