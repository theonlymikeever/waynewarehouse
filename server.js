const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { sync, seed } = require('./models/db')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'theBatCave', 
  resave: false,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'browser')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/users', require('./routes/users'));
app.use('/login', require('./routes/login'));

//Sync & seed promise chain. On resolve we pop server
sync()
  .then( () => {
    return seed();
  })
  .then( () => {
    app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
  });

