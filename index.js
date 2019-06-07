const express = require('express');
const crypto = require("crypto");
const path = require('path');
const PORT = process.env.PORT || 3000;


const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, 'static')));

let curr = 0;
let sockets = [];
io.on("connection", socket => {
  socket.emit("update", {page: curr});
});

app.post("/api/update/:method", (req, res) => {
  const method = req.params.method;

  if(method === "forward") {
    curr++;
  } else if(method === "back") {
    curr--;
  }
  io.emit("update", {page: curr});
  curr = Math.max(curr, 0);
  res.end();
});

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))
