const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// MySQL Database
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
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
    console.log('\nServer started at http://localhost:3000/\n\n');
    app.listen(3000);
  })
  .catch(err => console.log(err));