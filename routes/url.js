const express = require("express");
const router = express.Router();
const shortId = require("shortid");
const validUrl = require("valid-url");
const config = require("config");
const Url = require("../models/Url");

const BASE_URL = config.get("baseUrl");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(BASE_URL)) {
    return res.status(401).json("Invalid Base Url");
  }
  console.log(req.body);
  const urlCode = shortId.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        return res.json(url);
      } else {
        const shortUrl = BASE_URL + "/s-url/" + urlCode;
        url = new Url({
          urlCode: urlCode,
          longUrl: longUrl,
          shortUrl: shortUrl,
          date: new Date(),
        });
        console.log("shortUrl", shortUrl);
        await url.save();
        return res.json(url);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server error");
    }
  } else {
    return res.status(400).json("Invalid Long url.");
  }
});

module.exports = router;
