let request = require('request');
const recaptcha = require('../config/settings').recaptcha;

module.exports= {
	recaptcha: function (req, res, next){
	            var gresponse = req.body['g-recaptcha-response'];
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + recaptcha.secretKey + "&response=" + req.body['g-recaptcha-response']

               request(verificationUrl, function(err, response, body){
                    body = JSON.parse(body);
                    if(!body.success){
                        res.render('login.ejs', {errorMessage: 'Invalid recaptcha'})
                    } else {
                        next()
                    }
                })
    }
}