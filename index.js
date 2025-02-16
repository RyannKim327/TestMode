const fs = require("fs");

const logs = require("./utils/logs");
const { read, save } = require("./utils/preferences");
const regex = require("./utils/regex");
const fg = require("./utils/fetchGist");
const ug = require("./utils/updateGist");
const updateGist = require("./utils/updateGist");

// TODO: To create a lists of commands
let commands = [];

const setCommand = command => {
  commands.push(command);
};

const gptname = async (api, event) => {
  if (event.senderID) {
    const g = await fg();
    const data = g;
    const user = event.senderID;
    if (!Object.keys(data.names).includes(user)) {
      const usr = await api.getUserInfo(user);
      if (usr[user]["name"]) {
        data.names[user] = usr[user]["name"].replace(/\W/gi, " ").trim();
      }
    }
    updateGist(data);
    // fs.writeFileSync("data/gpt.json", JSON.stringify(data, null, 2), "utf-8");
  }
};

const help = async (api, event, prefix) => {
  const id = 61572478455619;
  const user = await api.getUserInfo(id);
  const self = await api.getUserInfo(event.senderID);
  let message = `Hello ${self[event.senderID]["name"]} my name is ${
    user[id]["name"]
  }, a half human, half facebook bot. I was build with some commands that I hope it helps:\n\n`;
  for (let c in commands) {
    const command = commands[c];
    message += `${parseInt(c) + 1}: ${command.title ??
      `${command.script[0].toUpperCase() +
        command.script.substring(1)} Command`}\n ~ ${command.description ??
      "No description provided"}\nCommand Format: ${prefix}${command.hint ??
      command.command}\n\n`;
  }
  api.shareContact(message, id, event.threadID);
};

const mentioned = async (api, event) => {
  const self = "61572478455619";
  const usr = await api.getUserInfo(self);
  if (event.mentions[self] === `@${usr[self]["name"]}`) {
    api.sendMessage(
      `Please do wait for a moment, until the owner came back, the automation is still on, you may chat with me with colon ( : ) as prefix.`,
      event.threadID,
      (err, msg) => {}
    );
  }
};

const processes = async (api, event, prefix) => {
  let current = 0;
  const check = () => {
    if (current < commands.length) {
      const command = commands[current];
      if (command.command) {
        command.command = regex(command.command, prefix);
        if (!command.script.toLowerCase().includes("fallback")) {
          const _type = command.type ?? "message";
          if (command.command.test(event.body) && _type.includes(event.type)) {
            require(`./user/${command.script}`)(
              api,
              event,
              event.body.match(command.command)
            );
          } else {
            current++;
            check();
          }
        }
      }
    } else {
      require("./user/fallback")(api, event, prefix);
    }
  };
  check();
};

require("./fca")(
  {
    appState: JSON.parse(fs.readFileSync("appstate.json", "utf-8"))
  },
  async (error, api) => {
    if (error) return logs.error("Login", error);
    let started = false;
    logs.log("Login", "Logged in successfully");
    if (fs.existsSync("commands.json")) {
      const commands_ = JSON.parse(fs.readFileSync("commands.json", "utf-8"));
      commands = commands_;
    }

    if (fs.existsSync(`${__dirname}/temp`)) {
      fs.rm(`${__dirname}/temp`, { recursive: true }, e => {
        fs.mkdirSync(`${__dirname}/temp`);
      });
    } else {
      fs.mkdirSync(`${__dirname}/temp`);
    }

    api.setOptions({
      listenEvents: true,
      selfListen: true
    });

    api.listen(async (error, event) => {
      if (error) return logs.error("Listener", error);
      if (!started) {
        logs.log("Listener", "Listening");
        started = !started;
      }
      const botData = read();

      gptname(api, event);

      if (event.body) {
        // TODO: To create a process for checking the commands
        if (event.body.startsWith(botData.prefix)) {
          if (
            event.body === `${botData.prefix}help` ||
            event.body === botData.prefix
          ) {
            help(api, event, botData.prefix);
          } else {
            processes(api, event, botData.prefix);
          }
        } else if (event.mentions) {
          mentioned(api, event);
        }
      }
    });
  }
);
