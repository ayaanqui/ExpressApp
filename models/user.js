const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
  }

  save() {
    return getDb().collection('users').insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cartProduct => {
    //   return cartProduct._id === product._id;
    // });

    const updatedCart = { item: [{ ...product, quantity: 1 }] };
    return getDb().collection('users').updateOne(
      { id: new mongodb.ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findByPk(id) {
    return getDb().collection('users')
      .findOne({ _id: mongodb.ObjectId(id) });
  }
}

module.exports = User;