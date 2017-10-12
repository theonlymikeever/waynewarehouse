const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { sync, seed } = require('./models/db')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add session
app.use(session({
  secret: 'theBatCave', 
  resave: false,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'browser')));

//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//Api Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

app.use('/login', require('./routes/login'));

app.use('/api/orders', require('./routes/orders'));

//Sync & seed promise chain. On resolve we pop server
sync()
  .then( () => {
    return seed();
  })
  .then( () => {
    app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
  });

