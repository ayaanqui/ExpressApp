const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// Database
const sequelize = require('./util/database');
// Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
/**
 * Models relations
 */
// Products
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Cart
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


// Pug templating engine
app.set('view engine', 'pug');

// Tells express where to look for views
// in our case we look at the directory (default)
// in the ./views/ folder
app.set('views', 'views');

const path = require("path");

// Import routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errors = require('./controllers/errors');

/** Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errors.get404);

sequelize
  // .sync({ force: true })
  .sync()
  .then(res => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Ayaan', email: 'email@gmail.com' })
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    console.log('\nServer started at http://localhost:3000/\n\n');
    app.listen(3000);
  })
  .catch(err => console.log(err));