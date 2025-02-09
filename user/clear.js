const fg = require("./../utils/fetchGist");
const ug = require("./../utils/updateGist");

module.exports = async (api, event, regex) => {
  const key = `${event.senderID}_${event.threadID}`;
  const f = await fg();
  f.prompts[key] = [];
  const u = await ug(f);
  api.sendMessage(
    "History conversation are now cleared.",
    event.threadID,
    (err, msg) => {}
  );
};
