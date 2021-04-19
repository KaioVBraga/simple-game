import express from "express";
import http from "http";
import createGame from "./public/game.js";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static("public"));

const game = createGame();

game.addFruit({ fruitId: "fruit1", fruitX: 8, fruitY: 3 });

sockets.on("connection", (socket) => {
  const playerId = socket.id;

  game.addPlayer({ playerId, playerX: 1, playerY: 0 });

  console.log(`Player connected on Server with ID: ${playerId}`);

  socket.emit("setup", game.state);
});

server.listen(3333, () => console.log("Server listening at port 3333"));
