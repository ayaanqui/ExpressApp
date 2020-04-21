const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const data = req.body;
  const product = new Product(null, data.title, data.imageUrl, data.price, data.description);
  product.save();

  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode)
    return res.redirect('/admin/products');

  const id = req.params.id;
  Product.find(id, product => {
    if (!product)
      return res.redirect('/admin/products');

    res.render('admin/edit-product', {
      title: 'Edit product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const body = req.body;
  const id = body.id;

  Product.find(id, product => {
    if (!product)
      return res.redirect(`/admin/edit-product/${id}?edit=true`);

    const updatedProduct = new Product(id, body.title, body.imageUrl, body.price, body.description);
    updatedProduct.save();

    res.redirect(`/products/${id}`);
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products: products,
      title: 'Admin Products',
      path: '/admin/products',
    });
  });
};