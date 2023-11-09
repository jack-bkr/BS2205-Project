const express = require('express');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dbURL = require('./dbURL.json');
const apiRoutes = require('./src/routes/apiRoutes');

// connect to MongoDB Atlas

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api/', apiRoutes)
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.get('/', function(req, res) {
    res.render(path.join(__dirname, "/src/views/index.ejs"))
})

mongoose
    .connect(dbURL.dbURL
)
    .then(result => {
        app.listen(port, function(){
            debug(`Listening on port ${chalk.green(port)}`);
        });
    })
    .catch(err => {
        console.log('err', err);
})
