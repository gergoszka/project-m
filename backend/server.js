const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const config = require('dotenv').config();
const PORT = 4040;

app.use(cors());
app.use(express.json());

// DB init stuff
const mongoose = require("mongoose");
const models = require("./models.js");
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.post("/cards", (req, res) => {
  res.send("Not implemented yet");
});

app.get("/cards", (req, res) => {
  models.Card.find({}, "-__v", (err, cards) => {
    console.log(cards);
    res.send(cards);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
