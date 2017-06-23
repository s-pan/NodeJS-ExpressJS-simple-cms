const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  title: {type:String},
})

var Category = mongoose.model('Category', categorySchema)


function create(data){
	Category.create(data)
}

function find (){
		var data = Page.find({}, function(err, data){
			return data
		})
		//return data
}


module.exports = {
	Category
}