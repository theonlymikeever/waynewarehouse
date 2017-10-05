const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')
const chalk = require('chalk');
const port = process.env.PORT || 3000;


app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

db.seed();

app.listen(port, () => console.log(chalk.blue(`Listening intently on port ${port}`)));
