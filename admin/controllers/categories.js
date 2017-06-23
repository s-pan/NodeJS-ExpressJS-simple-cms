var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var bodyParser = require('body-parser');
var Category = require('../model/categories')

function createCategory(req, res){
	
}

function getAllCategories (){
	Category.find({}, function(err, categories){
		console.log(categories)
	})
}

module.exports = {
	createCategory,
	getAllCategories
}