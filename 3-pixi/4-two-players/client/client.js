const socket = io.connect('http://localhost:3000');

// Handle successful connection
socket.on('connect', () => {
  console.log('Connected to server');
});

// Handle player movement event
socket.on('movement', ({ clientId, direction }) => {
  console.log(`Player with ID ${clientId} moved in direction:`, direction);
  // Update player position or perform other actions based on the received movement event
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Example: Emit a movement event when a key is pressed
document.addEventListener('keydown', (event) => {
  const direction = 'test'//determineDirectionFromKeyCode(event.keyCode);
  socket.emit('movement', direction);
});
