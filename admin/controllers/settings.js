function settingsView(req, res){
	res.render('settings.ejs')
}

function passwordView(req, res){
	res.render('password.ejs', {data: false})
}

function changePassword(req, res){

}

module.exports = {
	settingsView,
	passwordView
}