var express = require('express');
var path = require('path');
var config = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var port = 8085;
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./public'));

app.use('/', function (req, res) {
    res.sendFile(path.resolve('./public/index.html'));
});

app.listen(port, function(error) {
    if(error) throw error;
    console.log("Server is listening on port: ", port);
});
