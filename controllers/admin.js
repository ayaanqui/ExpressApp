const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: "Add product",
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const data = req.body;
  const product = new Product(data.title, data.imageUrl, data.price, data.description);
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products: products,
      title: "Admin Products",
      path: "/admin/products",
    });
  });
};