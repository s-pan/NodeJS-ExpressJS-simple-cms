var express = require('express');
let scrapeController = require('./scrape');
let pageController = require('./page');
let addContentController = require('./addContent');
//var app     = express();


module.exports = {
	scrapeController,
	pageController,
	addContentController
}