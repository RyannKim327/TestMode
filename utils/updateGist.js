require("dotenv").config()
const axios = require("axios");

const logs = require("./../utils/logs");
const fetchGist = require("./fetchGist");

const GH_TOKEN = process.env.GH_TOKEN;
const GIST_ID = process.env.GIST_ID; // Replace with your Gist ID
const FILE_NAME = process.env.FILE; // Replace with the file name in the Gist

module.exports = async data2 => {
  try {
    const url = `https://api.github.com/gists/${GIST_ID}`;

    // Fetch the existing Gist
    const data = await fetchGist()

    // Modify the file content
    if (typeof data2 !== "string") {
      data2 = JSON.stringify(data2, null, 2);
    }

    // Send update request
    await axios.patch(
      url,
      {
        files: {
          [FILE_NAME]: { content: data2 }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GH_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );

    logs.log("GIST", "Gist updated successfully!");
  } catch (error) {
    logs.error("GIST", error.response?.data || error.message);
  }
  return "";
};
