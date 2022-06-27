const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route - GET
// @redirects to original url from short url

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("Url not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server error");
  }
});

module.exports = router;
