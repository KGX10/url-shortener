const express = require("express");
const path = require("path");
const connectToDB = require("./config/dbConfig");
const cors = require("cors");
//Create a server.
const app = express();

//Middleware to use json.
app.use(express.json({ extended: false }));

// Cors fix
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:4001",
  "https://url-shortener-kg.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

//Routing
// console.log(path.join(__dirname, "..", "url-shortener", "build"));
//serving react app
app.use(express.static(path.join(__dirname, "build")));
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//Api routes

app.use("/s-url", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

//Port
const PORT = 5000;
connectToDB();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
