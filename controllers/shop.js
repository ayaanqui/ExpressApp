const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        products: products,
        title: "Homepage",
        path: "/",
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        products: products,
        title: "Shop",
        path: "/products",
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then(product => {
      res.render('shop/product-detail', {
        title: product.title,
        path: `/products/${product.id}`,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.findAll()
      .then(products => {
        const cartProducts = [];

        products.map(product => {
          const cartProductData = cart.products.find(p => p.id !== product.id);

          if (cartProductData)
            cartProducts.push({ product: product, qty: cartProductData.qty });
        });
        return cartProducts;
      })
      .then(results => {
        res.render('shop/cart', {
          title: "Cart",
          path: "/cart",
          products: results,
        });
      })
      .catch(err => console.log(err));
  })
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
    .then(product => {
      Cart.addProduct(id, product.price);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDelete = (req, res, next) => {
  const id = req.body.id;
  Product.find(id, product => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'My Orders',
    path: '/orders',
  });
};