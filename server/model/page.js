let mongoose = require('mongoose');
let Page = require('../../config/schema').Page;

mongoose.Promise = global.Promise;





//var Pages = mongoose.model('Pages', pagesSchema)

function findPage(slug){
  var slug = slug;
  return new Promise(function(resolve, reject){
    Page.findOne({slug: slug}, function(err, data){
      if(err){
        return reject(err)
      }
     return resolve(data)
    })
  })
}

function getAllPages(){
    return new Promise(function(resolve, reject){
      Page.find({}, function(err, data){
        if(err){
          return reject(err)
        }
        return resolve(data);
      })
    })
    }

module.exports = {
  findPage,
  getAllPages
}