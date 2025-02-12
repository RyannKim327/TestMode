require("dotenv").config();
const axios = require("axios");

const logs = require("./../utils/logs");

const GH_TOKEN = process.env.GITHUB_TOKEN;
const GIST_ID = process.env.GIST_ID; // Replace with your Gist ID
const FILE_NAME = process.env.FILE; // Replace with the file name in the Gist

module.exports = async data2 => {
  try {
    const url = `https://api.github.com/gists/${GIST_ID}`;

    // Fetch the existing Gist
    const { data } = await axios.get(url, {
      headers: { Authorization: `token ${GH_TOKEN}` }
    });

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
        headers: { Authorization: `token ${GH_TOKEN}` }
      }
    );

    logs.log("GIST", "Gist updated successfully!");
  } catch (error) {
    logs.error(
      "GIST",
      "Error updating Gist:",
      error.response?.data || error.message
    );
  }
  return "";
};
