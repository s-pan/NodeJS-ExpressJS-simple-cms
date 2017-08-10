const mongoose = require('mongoose')
let Page = require('../../config/schema').Page;


function createNewPage(data){
  var data = data;
    return new Promise(function(resolve, reject){
       Page.create(data, function(err, data){
        if(err){
              return reject(err)
        }
        return resolve(data)
      })
    })
}

function findAllPages(condition){
		return new Promise(function(resolve, reject){
      let params = condition || {};
      Page.find(params, function(err, data){
        if(err){
            return reject(err)
        }
        return resolve(data);
		  })
    })
		}


function findPage(field, value){
var findPageObj = {[field]: value};
return new Promise(function(resolve, reject){
    Page.findOne(findPageObj, function(err, data){
      if(err){
        return reject(err)
      }   
     return resolve(data)
    })
  })
}

function editPage(slug, data){
    return new Promise(function(resolve, reject){
      Page.findOne({slug: slug}) 
/*
        , function(err, d){
        if(err){
            return reject(err);            
        } else {
                   d.title.validate(data.title)
          d.title = data.title
          d.description = data.description
          d.keywords = data.keywords
          d.textarea = data.textarea
          d.category = data.category



          d.save(function(err){
            if(err){
              return resolve(err)
            }

            return resolve(data)
          });
          
        }
*/
      
  })
}

function deletePage(slug){
  return new Promise(function(resolve, reject){
    Page.findOneAndRemove({slug: slug}, function(err, data){
      if(err){
          return reject(err)
      }
      return resolve(data)
    })
  })
}

module.exports = {
   createNewPage,
   findAllPages,
   findPage,
   editPage,
   deletePage,
}