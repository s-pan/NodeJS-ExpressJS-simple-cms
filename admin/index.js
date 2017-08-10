let express = require('express');
let fs = require('fs');
let path = require("path");
let request = require('request');
let cheerio = require('cheerio');
let app = express();
let bodyParser = require('body-parser');
let controller = require('./controllers');
let Pages = require('../config/schema').Page;
let passport = require('passport');	
let user = require('../config/schema').adminUsers;
let session      = require('express-session');
let cookieParser = require('cookie-parser');
let recaptcha = require('./middlewares/recaptcha');
let auth = require('./middlewares/auth');
let changePassword = require('./middlewares/changePassword');


let multer  = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, encodeURIComponent(file.originalname) + '.jpg')
    }
});
let upload = multer({storage:storage})


let rootPath = path.join(__dirname);

require('./middlewares/passport').passportAuth()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(rootPath + '/public'));
app.use(express.static(rootPath + '/public/upload'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'Super-Sec*re$%^yt',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(auth.isAuth)

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

app.get('/', controller.pageController.getAllPages)

app.get('/login', controller.adminUserController.loginView)
app.post('/login', /*recaptcha.recaptcha*/ controller.adminUserController.authenticate)

app.post('/logout', controller.adminUserController.logout)

app.get('/pages/create', controller.pageController.createPageView)
app.post('/pages/create', controller.pageController.addPage)
app.get('/pages/edit/:slug', controller.pageController.editPageView)
app.post('/pages/edit/:slug', controller.pageController.editPage)
app.post('/pages/delete/:slug', controller.pageController.deletePage)

app.get('/images', controller.pageController.getImages)
app.post('/images/upload', upload.single('image'), controller.pageController.uploadImage)

app.get('/settings', controller.settingsController.settingsView)
app.get('/settings/password', controller.settingsController.passwordView)
app.post('/settings/password/change', changePassword.checkOldPassword, controller.adminUserController.changePassword)

module.exports = app