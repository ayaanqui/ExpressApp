const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Pug templating engine
app.set('view engine', 'pug')

// Tells express where to look for views
// in our case we look at the directory (default)
// in the ./views/ folder
app.set('views', 'views');

const path = require("path");

// Import routes
const admin = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const error404Routes = require("./routes/404.js");

/** Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', admin.routes);
app.use(shopRoutes);
app.use(error404Routes);

app.listen(3000);