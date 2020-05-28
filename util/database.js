const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  const password = require('./password');
  MongoClient.connect(`mongodb+srv://ayaanqui:${password}@learning-bhblw.mongodb.net/test?retryWrites=true&w=majority`)
    .then(result => {
      console.log("Connected!");
      callback(result);
    })
    .catch(err => {
      console.log("\n\n***ERROR CONNECTING TO MONGODB***");
      console.log(err);
    });
};

module.exports = mongoConnect;