const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const data = req.body;
  const product = new Product(null, data.title, data.price, data.description, data.imageUrl, req.user._id);
  product.save()
    .then(result => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode || editMode === "false")
    return res.redirect('/admin/products');

  const id = req.params.id;
  Product.findByPk(id)
    .then(product => {
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
      const updatedProduct = new Product(
        id,
        body.title,
        body.price,
        body.description,
        body.imageUrl
      );
      return updatedProduct.save();
    })
    .then(() => res.redirect(`/products/${id}`))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.deleteByPk(id)
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        products: products,
        title: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};