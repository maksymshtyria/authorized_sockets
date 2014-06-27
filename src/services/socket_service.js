var dbService = require('./postgres_service.js');

module.export = {
  connectionHandler: function (socket) {
    dbService.getOrganizationId({token: socket.request._query}, function (err, res) {
      /***********************************************/
      res = {rows: [{organizationId: 123456}]};
      /************************************************/

      if (err) return console.error(err);

      return socket.send({roomId: res.rows[0].organizationId});
    });
  },

  authorizationHandler: function (handshakeData, cb) {
    dbService.doesUserAuthorized({token: handshakeData._query}, function (err, res) {
      /***********************************/
      res = {rows: [{token: "321321321321321321"}]};
      /***********************************/

      if (err) return cb(err, false);

      return cb(null, handshakeData._query.token === res.rows[0].token);
    });
  }
};