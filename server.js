const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "2SW059hx4NRbdkSb1f6021ab2e1fcda20d5d330ab678c9c61";

app.post("/browse", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch("https://chrome.browserless.io/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ url, waitUntil: "load" }),
    });

    const html = await response.text();
    res.send(html);
  } catch (err) {
    res.status(500).send("Error contacting Browserless");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
