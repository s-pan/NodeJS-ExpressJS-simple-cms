var express = require('express');
let pageController = require('./pages');
let adminUserController = require('./adminUser')


module.exports = {
	pageController,
	adminUserController
}