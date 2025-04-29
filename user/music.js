const axios = require("axios");
const fs = require("fs");
const http = require("https");

const logs = require("./../utils/logs");

module.exports = async (api, event, result) => {
  let q = "?q=";
  api.sendMessage(`Searching for matches`, event.threadID, async (err, msg) => {
    if (err) {
      return logs.error("Music", err);
    }
    const data = await axios
      .get(
        `https://kaiz-apis.gleeze.com/api/ytsearch${q}${encodeURIComponent(
          result[1]
        )}`
      )
      .then(r => {
        return r.data.items[0];
      })
      .catch(err => {
        logs.error("Music Search", err);
        return null;
      });
    api.editMessage(`INFO [${data.title}]: Song found`, msg.messageID);
    logs.log("Music test", data);
    let trials = 1;

    if (data) {
      api.editMessage(
        `INFO [${data.title}]: Trying to fetch the data [${trials}/10]`,
        msg.messageID
      );
      const fetching = async () => {
        logs.log("Music Trials", trials);
        axios
          .get(
            `https://kaiz-ytmp4-downloader.vercel.app/ytmp4?url=${encodeURIComponent(
              data.url
            )}&quality=mp3`
          )
          .then(res => {
            const newData = res.data;

            logs.log("Fetch Music", newData);
            try {
              const filename = `${__dirname}/../temp/${event.senderID}_${event.threadID}.mp3`;
              const file = fs.createWriteStream(filename);
              api.editMessage(
                `INFO [${data.title}]: Processing audio`,
                msg.messageID
              );
              http.get(newData.download_url, res => {
                res.pipe(file);
                file.on("finish", () => {
                  api.sendMessage(
                    {
                      body: "",
                      attachment: [fs.createReadStream(filename)]
                    },
                    event.threadID,
                    (error, msg_) => {
                      if (error) {
                        logs.error("Music Callback", error);
                        api.editMessage(
                          `There's something wrong happened`,
                          msg.messageID
                        );
                      } else {
                        api.editMessage(
                          `Here's your request:\n  Title: ${data.title}`,
                          // `The music is already uploaded. Enjoy Sensei`,
                          msg.messageID
                        );
                      }
                      if (fs.existsSync(filename)) {
                        fs.unlink(filename, error => {});
                      }
                    }
                  );
                });
                file.on("error", () => {
                  api.editMessage("The song has some problems.", msg.messageID);
                });
              });
            } catch (error) {
              logs.error("Music Catch", error);
              if (trials <= 10) {
                trials++;
                api.editMessage(
                  `INFO [${data.title}]: Trying to fetch the data [${trials}/10]`,
                  msg.messageID
                );
                fetching();
              } else {
                api.editMessage(
                  "There's something wrong, sorry prii",
                  msg.messageID
                );
              }
            }
          })
          .catch(error => {
            logs.error("Music fetch", error);
            if (trials <= 10) {
              trials++;
              api.editMessage(
                `INFO [${data.title}]: Trying to fetch the data [${trials}/10]`,
                msg.messageID
              );
              fetching();
            } else {
              api.editMessage(
                "There's something wrong, sorry prii",
                msg.messageID
              );
            }
          });
      };
      fetching();
    } else {
      api.editMessage("Kindly check or revise your query.", msg.messageID);
    }
  });
};
