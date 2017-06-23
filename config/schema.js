let mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let pageSchema = mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String},
    keywords: {type: String},
    textarea:{type: String, required: true},
    category: {type:String, required: true},
    slug: {type: String, required: true, unique: true}
})
let Page = mongoose.model('Page', pageSchema)



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
	Page,
	adminUsers
}