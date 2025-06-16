require("dotenv").config()
const axios = require('axios');

module.exports = async () => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/gists/${process.env.GIST_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GH_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        },
      }
    );

    const fileName = process.env.FILE;
    if (!data.files[fileName]) {
      throw new Error(`File ${fileName} not found in Gist.`);
    }

    const newData = JSON.parse(data.files[fileName].content);
    return newData;
  } catch (error) {
    console.error("Failed to fetch or parse Gist file:", error.message);
    return {}
  }
}
