let encryption = require('../config/encryption')
let adminUser = require('../config/schema').adminUsers;

function checkOldPassword(req, res, next){
	let oldPassword = req.body.oldPassword;
	let newPassword = req.body.newPassword;
	let repeatPassword = req.body.newPasswordRepeat;
	let userId = req.session.passport.user;

	let errorMessages = {
		repeatPassworderrorMessage: 'The passwords do not match',
		oldPassworderrorMessage: 'Old password is not correct',
		minMaxSymbols: 'The password must be between 5 and 20 symbols'
	}

	let checkSymbols = countSymbols(newPassword)
	let checkPasswords = comparePasswords(newPassword, repeatPassword)

	if(!checkSymbols){
        return res.render('password.ejs', {data: {minMaxSymbols: errorMessages.minMaxSymbols}})
	}

	if(!checkPasswords){
	    return res.render('password.ejs', {data: {repeatPassworderrorMessage: errorMessages.repeatPassworderrorMessage}})
    }
    
    let aUser = adminUser.findById(userId);
		aUser.then(function(admUser){
   	        if (!admUser.authenticate(oldPassword)) {
                return res.render('password.ejs', {data: {oldPassworderrorMessage: errorMessages.oldPassworderrorMessage}})
            }
            return next()
        })
	
}

function countSymbols(password){
	return (password.length > 4 && password.length < 21) || false
}

function comparePasswords(pass1, pass2){
	return (pass1 === pass2) || false
}

module.exports = {
	checkOldPassword
}