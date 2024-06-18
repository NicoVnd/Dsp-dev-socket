const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/channel/:channelName", (req, res) => {
  res.sendFile(__dirname + "/channel.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join channel", (channel) => {
    socket.join(channel);
    socket.to(channel).emit("notification", `A user joined channel ${channel}`);
  });

  socket.on("chat message", (data) => {
    io.to(data.channel).emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
