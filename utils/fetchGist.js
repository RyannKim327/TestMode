require("dotenv");
const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get(
    `https://api.github.com/gists/${process.env.GIST_ID}`,
    {
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );
  const newData = JSON.parse(data.files[process.env.FILE].content);

  return newData;
};
