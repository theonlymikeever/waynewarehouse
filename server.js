const express = require('express');
const app = express();
const path = require('path');
const { sync, seed } = require('./models/db')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'browser')));

//Main App Route
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//Api Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

//Sync & seed promise chain. On resolve we pop server
sync()
  .then( () => {
    return seed();
  })
  .then( () => {
    app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
  });

