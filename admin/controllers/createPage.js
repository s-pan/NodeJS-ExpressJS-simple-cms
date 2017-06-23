var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var bodyParser = require('body-parser');
var Page = require('../model/page');
var slug = require('slug');


function createSlug(title){
	var newSlug = slug(title)
	return newSlug
}

function getContent(req, res){

	var categories = Page.findAllPages();

	categories.then(function(data){
    	res.render('createPage.ejs', {categories: data})
	})

}

function addPage(req, res){

	var slug = createSlug(req.body.title);

    var createPage = Page.createNewPage({title:req.body.title,
	 	                                 description: req.body.description,
                                         keywords: req.body.keywords,
                                         textarea: req.body.textarea,
                                         category: req.body.category,
                                         slug: slug
    })

    createPage.then(function(data){
    	 res.redirect('/admin');
    })

    createPage.catch(function(err){
    	res.send('duplicate page title')
    })
   
}

module.exports = {
	getContent,
	addPage
}