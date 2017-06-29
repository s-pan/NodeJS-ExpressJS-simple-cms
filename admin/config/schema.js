let mongoose = require('mongoose')

let adminUsersSchema = mongoose.Schema({
	username: {type:String, require: true, unique: true},
	password: {type: String, require: true}
})

adminUsersSchema.method({
  authenticate: function (password) {
  //  let inputHashedPassword = encryption.generateHashedPassword(this.salt, password)
    if (password === this.password) {
      return true
    } else {
      return false
    }
  }
})

let adminUsers = mongoose.model('adminUsers', adminUsersSchema)

module.exports = {
	adminUsers
}