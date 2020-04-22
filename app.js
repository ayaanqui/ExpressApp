const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// MySQL Database
const sequelize = require('./util/database');

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

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errors.get404);

sequelize.sync()
  .then(res => {
    console.log('\nServer started at http://localhost:3000/\n\n');
    app.listen(3000);
  })
  .catch(err => console.log(err));