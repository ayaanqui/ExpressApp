const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  const password = require('./password');
  MongoClient.connect(`mongodb+srv://ayaanqui:${password}@learning-bhblw.mongodb.net/expressapp?retryWrites=true&w=majority`)
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log("\n\n***ERROR CONNECTING TO MONGODB***");
      throw err;
    });
};

const getDb = () => {
  if (_db)
    return _db;
  throw "No database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;