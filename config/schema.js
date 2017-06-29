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

module.exports = {
	Page
}