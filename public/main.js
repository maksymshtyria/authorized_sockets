var socket = io('http://localhost', {
  query:      "token=321321321321321321",
  transports: ['websocket']
});

socket.on('message', function(data){
  socket.on(data.roomId, function (data) {
    console.log(data);
  })
});