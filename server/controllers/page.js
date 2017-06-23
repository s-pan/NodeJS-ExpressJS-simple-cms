var express = require('express');
var Pages = require('../model/page');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var hotelsId = fs.readFileSync('./hotelsId.json');
var bodyParser = require('body-parser');


function getPage(req, res){
    var slug = req.params.slug;
    var find = Pages.findPage(slug)

    find.then(function(data){
        if(!data){
           return res.send('the p not found')
        }
        res.render('page.ejs', {data: data})
    })
}

function getAllPages(req, res){
    var getPages = Pages.getAllPages();

    getPages.then(function(pages){
       res.render('index.ejs', {data:pages})
    })
}

module.exports = {
	getPage,
    getAllPages
}