var express = require('express');
//var fs = require('fs');
//var request = require('request');
//var cheerio = require('cheerio');
var base = express();
var app = require('./server/index');
var adminApp = require('./admin/index');

require('./config/database').startDb();


base.use('/admin', adminApp)
base.use('/', app)



 base.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })



base.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = base;
