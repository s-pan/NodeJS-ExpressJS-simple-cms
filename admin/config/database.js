let mongoose = require('mongoose');

mongoose.Promise = global.Promise;


function startDb(){
	mongoose.connect('mongodb://localhost:27017/express-db?authSource=admin');

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

