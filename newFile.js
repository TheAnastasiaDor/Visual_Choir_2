let socketIO=require('socket.io');
module.exports = function setupSocketIO(server) {
    let io = require('socket.io')(server);
    let users = []; // Moved from sketch.js to manage on the server-side
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF']; // Example colors

    // Function to generate random color - should be implemented server-side or use a consistent method client-side
    // function getRandomColor() {
      // ... your getRandomColor function implementation
    }
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
    // All socket.io logic here
    io.on('connection', function (socket) {
      console.log("We have a new client: " + socket.id);
      //assigne a color
      let colorIndex=users.length&colors.length;
      // Create a new user object
      let newUser = {
        id: socket.id,
        color: colors[colorIndex],
        path: []
      };
        
      // Add the new user to the users array
      users.push(newUser);
  
      // Emit the new user's data to all clients
      io.emit('newUser', newUser);
  
      // ... rest of your socket event listeners like 'move', 'disconnect' etc.
  
      socket.on('disconnect', function () {
        console.log("A client has disconnected: " + socket.id);
        // Remove the user from the users array
        users = users.filter(user => user.id !== socket.id);
        // Optionally, emit an event to all clients that a user has disconnected
      });
    });
  