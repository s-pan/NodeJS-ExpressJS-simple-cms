var request = require('request');

module.exports= {
	recaptcha: function (req, res, next){
	            var gresponse = req.body['g-recaptcha-response'];
                var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + "6LeOsxsUAAAAAK6QuZXqSNyb6Kg6MNq-8yVacPwy" + "&response=" + req.body['g-recaptcha-response']
                var verificationUrlProduction = "https://www.google.com/recaptcha/api/siteverify?secret=" + "6LeYcycUAAAAAHrz2Tjgbzk7rIFbrgUpMb7k7jBk-8yVacPwy" + "&response=" + req.body['g-recaptcha-response']
                request(verificationUrlProduction || verificationUrl, function(err, response, body){
                    body = JSON.parse(body);
                    // console.log(body.success)
                    if(!body.success){
                        res.render('login.ejs', {errorMessage: 'Invalid recaptcha'})
                    } else {
                        next()
                    }
                })
    }
}