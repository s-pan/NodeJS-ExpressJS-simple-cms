let express = require('express');
let Page = require('../model/page');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();
let bodyParser = require('body-parser');
let Pages = require('../../config/schema').Page;
let slug = require('slug');
let recaptcha = require ('../config/settings').recaptcha;

/* private*/
function createSlug(title){
	var newSlug = slug(title.toLowerCase())
	return newSlug
}

/****/

function login (req, res){
    let data = {
    	errorMessage: false,
    	recaptcha: recaptcha
    }
	res.render('login.ejs', {data: data})
}

function getAllPgs(req, res){
    let findPages = Page.findAllPages();
    findPages.then(function(pages){
    	console.log(pages)
         res.json(pages)
    });
}


function createPage(req, res){
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

function findPage(req, res){
	let slug = req.params.slug;
    res.render('edit.ejs', {data: req.data})
}

function editPage(req, res){
	let data = {title:req.body.title,
	 	        description: req.body.description,
                keywords: req.body.keywords,
                textarea: req.body.textarea,
                category: req.body.category                                         
               }
    
    req.data.title = data.title
    req.data.description = data.description;
    req.data.keywords = data.keywords
    req.data.textarea = data.textarea
    req.data.category = data.category

    req.data.save(function(err){
            if(err){
              res.send(err)
            }else {
            	res.redirect('/admin')
            }  
          });
}


function deletePage(req, res){
	let slug = req.params.slug;
	let delPage = Page.deletePage(slug)

	delPage.then(function(data){
		Pages.find({}, function(err, data){
        if(err){
            return err
        }
        return res.render('pages.ejs', {data:data})
		})
	})
}

function getAllPages(req, res){
    let findPages = Page.findAllPages();

    findPages.then(function(pages){
         res.render('pages.ejs', {data: pages})
    });
}

function getData(req, res){
	var findPages = Page.findAllPages();

	   Page.findAllPages({}, function(err, data){
	   	var data = data;
    	 return res.render('index.ejs', {data: data})
    });
}

module.exports = {
	createPage,
	addPage,
	findPage,
	editPage,
	deletePage,
	getAllPages,
	login,
	getAllPgs
}	