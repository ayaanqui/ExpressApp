const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const data = req.body;
  req.user
    .createProduct({
      title: data.title,
      price: data.price,
      imageUrl: data.imageUrl,
      description: data.description
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode)
    return res.redirect('/admin/products');

  const id = req.params.id;
  req.user
    .getProducts({
      where: {
        id: id
      }
    })
    .then(([product]) => {
      if (!product)
        return res.redirect('/admin/products');

      res.render('admin/edit-product', {
        title: 'Edit product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const body = req.body;
  const id = body.id;
  Product.findByPk(id)
    .then(product => {
      product.title = body.title;
      product.price = body.price;
      product.imageUrl = body.imageUrl;
      product.description = body.description;
      return product.save();
    })
    .then(() => res.redirect(`/products/${id}`))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findByPk(id)
    .then(product => {
      return product.destroy();
    })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        products: products,
        title: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};