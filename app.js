const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));

app.get('/', function(req, res) {
    res.send("Hello World!");
})

app.listen(port, function(){
    debug(`Listening on port ${chalk.green(port)}`);
})