var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var bodyParser = require('body-parser');
var Pages = require('../model/page');

function getContent(req, res){
	res.render('index.ejs')
}

module.exports = {
	getContent
}