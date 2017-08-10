let adminUser = require('../config/schema').adminUsers;
let recaptcha = require('../config/settings').recaptcha;
let encryption = require('../config/encryption')

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

function changePassword (req, res){
    let userId = req.session.passport.user
	let salt = encryption.generateSalt()
	let hashedPassword = encryption.generateHashedPassword(salt, req.body.newPassword)
    let admUser = adminUser.findById(userId);
    admUser.then(function(user){
    	user.password = hashedPassword;
    	user.salt = salt;
    	user.save(function(err){
    		if(err)console.log(err)
    		 else{res.redirect('/admin')}
    	})
    })
}

function loginView (req, res){
    let data = {
    	errorMessage: false,
    	recaptcha: recaptcha
    }

     
    adminUser.findOne({username: 'admin'})
    .then(function(user){
    	let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, '123456')
        user.salt = salt;
        user.password = hashedPass
        user.save(function(err){
        	if(err){
        		console.log(err)
        	}
        })
    })
	res.render('login.ejs', {data: data})
}

function logout(req, res){
	req.logout();
	res.redirect('/admin/login')
}

module.exports = {
	authenticate,
	logout,
	loginView,
	changePassword
}