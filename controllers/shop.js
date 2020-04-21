const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products: products,
      title: "Shop",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.find(id, product => {
    if (!product)
      next(); // return 404
    else {
      res.render('shop/product-detail', {
        title: product.title,
        path: `/products/${product.id}`,
        product: product,
      });
    }
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products: products,
      title: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: "Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
  Product.find(id, product => {
    Cart.addProduct(id, product.price);
  });
  res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: "Checkout",
    path: '/checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'My Orders',
    path: '/orders',
  });
};