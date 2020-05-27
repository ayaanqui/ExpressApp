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
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            title: "Cart",
            path: "/cart",
            products: products,
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const id = req.body.id;
  let fetchedCart;
  let quantity = 1;

  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({
        where: { id: id }
      });
    })
    .then(([product]) => {
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        quantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(id);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: quantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDelete = (req, res, next) => {
  const id = req.body.id;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: id } });
    })
    .then(([product]) => {
      return product.cartItem.destroy();
    })
    .then(result => res.redirect('/cart/'))
    .catch(err => console.log(err));
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