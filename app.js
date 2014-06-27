var dbService = require('./src/services/postgres_service.js'),
    serverForUI = require('http').createServer(),
    serverForBE = require('http').createServer(),
    UIsocket = require('socket.io')(serverForUI),
    BEsocket = require('socket.io')(serverForBE),
    port = {
      ui: 3000,
      be: 3001
    };

BEsocket.on('connection', function (socket) {
  socket.on('message', function (data) {
    UIsocket.sockets.emit(data.organizationId, data.body);
    console.log(data);
  });
  socket.send('ok');
});

BEsocket.on('disconnect', function (socket) {
  socket.off('message', function (data) {
    UIsocket.sockets.emit(data.organizationId, data.body);
    console.log(data);
  });
});

UIsocket.set('authorization', function (handshakeData, cb) {
  dbService.doesUserAuthorized({token: handshakeData._query}, function (err, res) {
    /***********************************/
    res = {rows: [{token: "321321321321321321"}]};
    /***********************************/

    if (err) return cb(err, false);

    return cb(null, handshakeData._query.token === res.rows[0].token);
  });
});

UIsocket.on('connection', function (socket) {
  dbService.getOrganizationId({token: socket.request._query}, function (err, res) {
    /***********************************************/
    res = {rows: [{organizationId: 123456}]};
    /************************************************/

    if (err) return console.error(err);

    return socket.send({roomId: res.rows[0].organizationId});
  });
});

serverForUI.listen(port.ui, function () {
  console.log('server for users was opened on port ' + port.ui);
});

serverForBE.listen(port.be, function () {
  console.log('server for API was opened on port ' + port.be);
});