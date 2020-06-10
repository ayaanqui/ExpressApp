const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(id, title, price, description, imageUrl) {
    this._id = new mongodb.ObjectId(id);
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    let ob;
    if (this._id) {
      // Update product
      ob = getDb().collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      ob = getDb().collection('products').insertOne(this);
    }
    return ob
      .then(_result => { })
      .catch(err => console.log(err));
  }

  static fetchAll() {
    return getDb().collection('products')
      .find()
      .toArray()
      .then(products => products)
      .catch(err => console.log(err));
  }

  static findByPk(id) {
    return getDb().collection('products').find({ _id: mongodb.ObjectID(id) })
      .next()
      .then(product => product)
      .catch(err => console.log(err));
  }
}

module.exports = Product;