let mongoose = require('mongoose')
let encryption = require('../config/encryption')

let adminUsersSchema = mongoose.Schema({
	username: {type:String, require: true, unique: true},
	password: {type: String, require: true},
	salt: String
})

adminUsersSchema.method({
  authenticate: function (pass) {
   return encryption.generateHashedPassword(this.salt, pass) === this.password;
  }
})

let adminUsers = mongoose.model('adminUsers', adminUsersSchema)

module.exports = {
	adminUsers
}