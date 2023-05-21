/* eslint-disable no-undef */
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

// Handle client connections
function handleClientConnection(socket) {
  console.log('A user connected');

  const clientId = generateClientId(socket);
  storeClient(clientId, socket);
  handleClientDisconnection(clientId);

  handlePlayerMovement(socket);

  const clientIdList = getClientIdList();
  emitClientIdList(clientIdList);

  // Other game-related events and logic can be implemented here
}

// Generate a unique ID for the client
function generateClientId(socket) {
  return socket.id;
}

// Store the client in the clients object
function storeClient(clientId, socket) {
  clients[clientId] = { socket };
}

// Handle client disconnections
function handleClientDisconnection(clientId) {
  clients[clientId].socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete clients[clientId];
  });
}

// Handle player movement
function handlePlayerMovement(socket) {
  socket.on('movement', ({ clientId, newPosition }) => {
    socket.broadcast.emit('movement', { clientId, newPosition });
  });
}

// Get the list of client IDs
function getClientIdList() {
  return Object.keys(clients);
}

// Emit the client ID list to all clients
function emitClientIdList(clientIdList) {
  io.emit('clientIdList', clientIdList);
}

// Handle client connections
io.on('connection', handleClientConnection);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
