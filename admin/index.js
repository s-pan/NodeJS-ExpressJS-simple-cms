var express = require('express');
var fs = require('fs');
var path = require("path");
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var bodyParser = require('body-parser');
var controller = require('./controllers');
let Pages = require('../config/schema').Page;
let rootPath =path.join(__dirname);
var passport = require('passport');	
let user = require('../config/schema').adminUsers;
var session      = require('express-session');
var cookieParser = require('cookie-parser');


require('./config/database')
require('./config/passport')()
var auth = require('./config/auth')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.use(express.static(rootPath + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'neshto-taino!@#$%',
    resave: true,
    saveUninitialized: true
  }))
app.use(passport.initialize());
app.use(passport.session())

app.param('slug', function(req, res, next, slug){
	Pages.findOne({slug: slug}, function(err, d){
		if(err){
           res.send('opaaa')     			
           res.end()       
        } else if(!d){
        	res.send('page not found')
        }  	else {	
          	   req.data = d
               next()
        }
    })
})

app.use(auth.isAuth)

app.get('/', controller.pageController.getAllPages)

app.get('/login', function(req, res){
	res.render('login.ejs', {errorMessage: false})
})

app.post('/logout', controller.adminUserController.logout)

app.post('/login', controller.adminUserController.authenticate)

app.get('/create-page', controller.addPageController.getContent)
app.post('/add-page', controller.addPageController.addPage)
app.get('/edit/:slug', controller.editPageController.findPage)

app.post('/edit-page/:slug', controller.editPageController.editPage)
app.post('/delete-page/:slug', controller.editPageController.deletePage)



module.exports = app