const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { spawn } = require("child_process");
const config = require("dotenv").config();
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

app.get("/py", (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn("python", ["script1.py"]);

  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });

  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);

    // send data to browser
    res.send(dataToSend);
  });
});

app.post("/cards", (req, res) => {
  res.send("Not implemented yet");
});

app.get("/cards", (req, res) => {
  models.Card.find({}, "-__v", (err, cards) => {
    //console.log(cards);
    res.send(cards);
  });
});

app.get("/allcards", (req, res) => {
  models.ScryfallCard.find({}, "-_id name", (err, cards) => {
    console.log(cards.map((card) => card.name));
    const file = {
      test: cards
        .map((card) => card.name + "$1")
        .sort()
        .join("\n"),
    };
    res.set({ "Content-Disposition": 'attachment; filename="test.txt"' });
    res.send(file["test"]);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
