let express = require('express');
let fs = require('fs');
let path = require("path");
let request = require('request');
let cheerio = require('cheerio');
let app = express();
let bodyParser = require('body-parser');
let controller = require('./controllers');
let Pages = require('../config/schema').Page;
let rootPath =path.join(__dirname);
let passport = require('passport');	
let user = require('../config/schema').adminUsers;
let session      = require('express-session');
let cookieParser = require('cookie-parser');
let recaptcha = require('./middlewares/recaptcha');
let auth = require('./middlewares/auth')


require('./middlewares/passport')()

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

app.post('/login', recaptcha.recaptcha, controller.adminUserController.authenticate)

app.get('/create-page', controller.pageController.createPage)
app.post('/add-page', controller.pageController.addPage)
app.get('/edit/:slug', controller.pageController.findPage)

app.post('/edit-page/:slug', controller.pageController.editPage)
app.post('/delete-page/:slug', controller.pageController.deletePage)


module.exports = app