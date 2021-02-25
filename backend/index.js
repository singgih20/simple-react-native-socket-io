const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send("jembuy");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("chat message", msg => {
      io.emit("chat message", msg)
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});