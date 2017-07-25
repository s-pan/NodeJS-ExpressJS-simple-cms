
let adminUser = require('../config/schema').adminUsers;
let recaptcha = require('../config/settings').recaptcha;

function authenticate (req, res){
	let user = req.body;
	let data = {
		errorMessage: 'Username or password not valid',
		recaptcha: recaptcha
	};

   		
	let aUser = adminUser.findOne({username: user.username});
		aUser.then(function(admUser){
		 if(!admUser){
		 	return res.render('login.ejs', {data: data})
		}
		 if (!admUser.authenticate(user.password)) {
            return res.render('login.ejs', {data: data})
        } else {
            req.logIn(admUser, (err, admUser) => {
              if (err) {
                return res.send('user not found')            
               }
             })
           res.redirect('/admin')
           }
    }).catch(function(err){
    	if(!user.username){
    		return res.render('login.ejs', {data: data})
    	} 
    })
}

function logout(req, res){
	req.logout();
	res.redirect('/admin/login')
}

module.exports = {
	authenticate,
	logout
}