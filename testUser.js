var io = require('socket.io-client');

var socket = io.connect('http://localhost:3001', {
  transports:   ['websocket'],
  query:        'token=server',
  reconnect:    true
});

// Add a connect listener
socket.on('connect', function(sock) {
  console.log('Connected!');

  setInterval(function () {
    socket.send({organizationId: 123456, body: 'Hello my dear practice'});
    console.log(54544444444)
  }, 3000);
});