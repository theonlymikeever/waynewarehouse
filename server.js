const express = require('express');
const app = express();
const path = require('path');
const db = require('./models/db')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, 'browser')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

db.seed();

app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
