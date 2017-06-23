var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var hotelsId = fs.readFileSync('./hotelsId.json');
var bodyParser = require('body-parser');
var controller = require('./controllers');
var multer  = require('multer');
var router = express.Router();
var path = require("path");


var storage = multer.diskStorage({
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

console.log(rootPath)

app.use(express.static(rootPath + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use('/admin', express.static(__dirname + '/admin/public'))

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


/*testovi*/

app.get('/getData', controller.pageController.getPage)
//app.post('/t', upload.single('image'), controller.pageController.addPage)
app.post('/', function(req, res){
   var gresponse = req.body['g-recaptcha-response'];
   var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + "6LeOsxsUAAAAAK6QuZXqSNyb6Kg6MNq-8yVacPwy" + "&response=" + req.body['g-recaptcha-response']
   request(verificationUrl, function(err, response, body){
    body = JSON.parse(body);
       // console.log(body.success)
        if(!body.success){
            res.send('Invalid input')
        } else {
             res.redirect('/show-hotels');
        }
    })
})

app.get('/scrape',controller.scrapeController.scrape)
app.get('/show-hotels', function(req, res, next){
    fs.readFile('./hotelsId.json', 'utf-8', function (err,data){
        var data = JSON.parse(data)
        var count = Object.keys(data).length, 
            html = '',
            i;
        for(var k in data){
            html += data[k].restaurantName + '<br>';
        }

        //var count = Object.keys(data).length;
        //console.log(count)
res.send(html)
    })
   //  var count = Object.keys(hotels).length;

    
})


module.exports = app;