const express = require("express");
const app = express();

const port = 3000;

app.get("/", function (req, res) {
  res.send("Welcome to Positljon\n");
});

app.listen(port, () => {
  console.log(
    "\n" + "\x1b[36m%s\x1b[0m",
    "The server is running. Listening to port " + port + "\n",
    "\n"
  );
});
