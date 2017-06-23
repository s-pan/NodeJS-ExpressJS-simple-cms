var express = require('express');
var Page = require('../model/page');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var bodyParser = require('body-parser');


function getAllPages(req, res){
    var findPages = Page.findAllPages();

    findPages.then(function(pages){
         res.render('pages.ejs', {data: pages})
    });
}

module.exports = {
	getAllPages
}