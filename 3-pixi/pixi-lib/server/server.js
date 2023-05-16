const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const ioOptions = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
};

const io = socketIO(server, ioOptions);

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Enable CORS for Express routes
app.use(cors());

// Store connected clients
const clients = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Generate a unique ID for the client
  const clientId = socket.id;

  // Store the client in the clients object
  clients[clientId] = { socket };

  // Handle client disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete clients[clientId];
  });

  // Handle player movement
  socket.on('movement', ({ clientId, newPosition }) => {
    // Broadcast the movement to other clients
    socket.broadcast.emit('movement', { clientId, newPosition });
  });

  const clientIdList = Object.keys(clients);
  console.log(clientIdList);
  io.emit('clientIdList', clientIdList);

  // Other game-related events and logic can be implemented here
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
