const mysql = require('mysql2');
const Cipher = require('./cipher');

const password = new Cipher('BDeciaeDJBcF.BDHacDeHceaa.BDJHgggBaDcB.BecFaJiFciii.BeFcFDcaaBaB.ccHgaccHgiiB.DcBaeFaiFeBD.DaHcJFJaJaii.cHHaFgJDaacB.DBcHJFcgFgia.BHFeDgJcgaia.JigDaFcJDDg', 52323).decrypt();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: password,
});

module.exports = pool.promise();