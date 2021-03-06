const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../whatsapp-mern/public");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
app.use(express.json());
app.use(express.static(publicDirectoryPath));
app.use(cors());

io.on("connect", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    console.log("socketID = " + socket.id);
    if (error) {
      return callback(error);
    }

    socket.join(user.room); //emits only to those who are in this room in other words adds this specific connection ( socket ) into the room.

    socket.emit(
      "message",
      generateMessage(
        "Admin",
        `Hello ${user.username}, welcome to the room ${user.room}`
      )
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", generateMessage(user.username, message));

    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left !`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
