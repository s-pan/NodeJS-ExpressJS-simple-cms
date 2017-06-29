let mongoose = require('mongoose');

mongoose.Promise = global.Promise;


function startDb(){
	mongoose.connect('mongodb://express-app:express123@ds129610.mlab.com:29610/express-cms' || 'mongodb://localhost:27017/express-db?authSource=admin');

    let db = mongoose.connection;

    db.on('error', err => console.log('Database error: ' + err))

    db.once('open', err => {
       if (err) {
           console.log(err)
       }
       console.log('MongoDB readyyyyyyyyyyyyyyyy!')
    })
}

module.exports = {
	startDb
}

