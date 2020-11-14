const express = require("express");
const app = express();
const randomColor = require("randomcolor");
const PORT = process.env.PORT || 3000;

// Setting up the middleware
app.use(express.static("public"));

// Handles the GET request for the home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Runs the server
const server = app.listen(PORT, () => {
  console.log("Server is running");
});

const io = require("socket.io")(server);

const users = [];

io.on("connection", (socket) => {
  console.log("User connected");
  const user_data = {
    id: socket.id,
    username: "Anonymous",
    color: randomColor(),
  };

  socket.on("send_chat", (data) => {
    io.sockets.emit("send_chat", {
      msg: data,
      color: user_data.color,
    });
  });

  users.push(user_data);

});
