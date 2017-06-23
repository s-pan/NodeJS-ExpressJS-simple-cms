var express = require('express');
var request = require('request');
var app     = express();
var bodyParser = require('body-parser');
var Page = require('../model/page').Page;
let Pages = require('../../config/schema').Page;


function getData(req, res){
	var findPages = Page.findAllPages();

	   Page.findAllPages({}, function(err, data){
	   	var data = data;
    	 return res.render('index.ejs', {data: data})
    });
}


function findPage(req, res){
	var slug = req.params.slug;
	//var page = Page.findPage(slug);
//Pages.findOne({slug: slug}, function(err, data){


       res.render('edit.ejs', {data: req.data})
  //  })

/*
	page.then(function(data){
          res.render('edit.ejs', {data:data})
	})
*/
}

function editPage(req, res){
	var data = {title:req.body.title,
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


 //   req.data = data
/*
     Pages.findOne({slug: slug}, function(err, d){
        if(err){
            return reject(err);            
        } else {
          d.title = data.title
          d.description = data.description
          d.keywords = data.keywords
          d.textarea = data.textarea
          d.category = data.category


*/
          req.data.save(function(err){
            if(err){
              res.send(err)
            }else {
            	res.redirect('/admin')
            }  
          });
}

function deletePage(req, res){
	var slug = req.params.slug;
	var delPage = Page.deletePage(slug)

	delPage.then(function(data){
		return res.render('pages.ejs', {data:data})
	})
}

module.exports = {
	getData,
	findPage,
	editPage,
	deletePage
}