var express = require('express');
let scrapeController = require('./scrape');
let pageController = require('./page');
let addPageController = require('./createPage');
let editPageController = require('./editPage');
let adminUserController = require('./adminUser')


module.exports = {
	scrapeController,
	pageController,
	addPageController,
	editPageController,
	adminUserController
}