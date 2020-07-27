const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./models/db');

const routes = require('./routes/user.route');
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));
