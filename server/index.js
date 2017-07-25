let express = require('express');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();
let bodyParser = require('body-parser');
let controller = require('./controllers');
let multer  = require('multer');
let router = express.Router();
let path = require("path");


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        cb(null,  req.body.fname +  Date.now() + '.jpg')
    }
});

var upload = multer({storage:storage})


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let rootPath =path.join(__dirname)

app.use(express.static(rootPath + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', controller.pageController.getAllPages)
app.get('/:slug', controller.pageController.getPage)


app.get('/page', function(req, res){
    res.render('index.ejs')
})

 app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })

module.exports = app;