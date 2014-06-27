var pg = require('pg'),
    client = new pg.Client("postgres://username:password@localhost/database");

client.connect(function (err) {
  if (err) return console.error('could not connect to postgres', err);
});

module.exports = {
  doesUserAuthorized: function (data, next) {
    var query = 'SELECT USER FROM USERS WHERE ID = ' + data.token;

    return client.query(query, next);
  },

  getOrganizationId: function (data, next) {
    var query = 'SELECT ORGANIZATION FROM USERS WHERE ID = ' + data.token;

    return client.query(query, next);
  }
};