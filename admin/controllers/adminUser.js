
let adminUser = require('../../config/schema').adminUsers;

function authenticate (req, res){
	let user = req.body;
	let message = 'Username or password not valid';
    		
	let aUser = adminUser.findOne({username: user.username});
		aUser.then(function(admUser){
		 if(!admUser){
		 	return res.render('login.ejs', {errorMessage: message})
		}
		 if (!admUser.authenticate(user.password)) {
             res.render('login.ejs', {errorMessage: message})
        } else {
            req.logIn(admUser, (err, admUser) => {
              if (err) {
                return res.send('userrrrr not found')            
               }
             })
           res.redirect('/admin')
           }
    }).catch(function(err){
    	if(!user.username){
    		return res.render('login.ejs', {errorMessage: message})
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