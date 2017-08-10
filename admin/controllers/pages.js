let express = require('express');
let Page = require('../model/page');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();
let bodyParser = require('body-parser');
let Pages = require('../../config/schema').Page;
let slug = require('slug');
let recaptcha = require ('../config/settings').recaptcha;
let path = require("path");
let multer  = require('multer'); 	

/* private*/
function createSlug(title){
	var newSlug = slug(title.toLowerCase())
	return newSlug
}

/****/

function createPageView(req, res){
	var categories = Page.findAllPages();
	categories.then(function(data){
    	res.render('createPage.ejs', {categories: data})
	})
}

function addPage(req, res){
	let pageData = {title:req.body.title,
	 	            description: req.body.description,
                    keywords: req.body.keywords,
                    textarea: req.body.textarea,
                    slug: createSlug(req.body.title)
    }
	let findParentCategory = Page.findPage('title', req.body.category);

    findParentCategory.then(function(category){
        if(category !== null){
        	pageData.category = {parent: false, id: category._id, name: category.title}
    	    return pageData
        } 
        if(category === null){
            return pageData
        }
    })

    .then(function(data){
    	return Page.createNewPage(data)
    })

    .then(function(data){
    	 res.redirect('/admin');
    })

    .catch(function(err){
    	res.send('Error occurs while trying to create the page' + err)
    })
   
}

function editPageView(req, res){
    let page = Page.findPage('slug', req.params.slug);
    let allPages = Page.findAllPages({'category.parent': true});
    
    Promise.all([page, allPages])

   .then(function(values){
     	let data = {pageData: values[0],
     	            categoriesData: values[1]}
     	return data
    })

    .then(function(data){
   	   data.pageData.parentCategory = data.pageData.category;
  	   return data
    })

    .then(function(data){
        res.render('edit.ejs', {data: data})
    })

}
    
function editPage(req, res){
	let pageData = {title:req.body.title,
	 	            description: req.body.description,
                    keywords: req.body.keywords,
                    textarea: req.body.textarea,
                    category: {parent: false}
    }

var findParentCategory = Page.findPage('title', req.body.category);

    findParentCategory.then(function(parentCategory){
        if(parentCategory !== null){
        	pageData.category = {parent: false, id: parentCategory._id, name: parentCategory.title}
    	    return pageData
        } 

        if(parentCategory === null){
        	pageData.category.parent = true;
            return pageData
        }


    })

    .then(function(data){
    	req.data.title = data.title
        req.data.description = data.description;
        req.data.keywords = data.keywords
        req.data.textarea = data.textarea
        req.data.category = data.category
        
    req.data.save(function(err){
            if(err){
              res.send(err)
            }else {
           	res.redirect('/admin')
            }  
          });
    })
}


function deletePage(req, res){
	let slug = req.params.slug;
	let delPage = Page.deletePage(slug)

	delPage.then(function(data){
		Pages.find({}, function(err, data){
        if(err){
            return err
        }
        return res.redirect('/admin')
		})
	})
}

function getAllPages(req, res){
    let findPages = Page.findAllPages();

    findPages.then(function(pages){
         res.render('pages.ejs', {data: pages})
    });
}

function getData(req, res){
	var findPages = Page.findAllPages();

	   Page.findAllPages({}, function(err, data){
	   	var data = data;
    	 return res.render('index.ejs', {data: data})
    });
}

function getImages(req, res){
	let imagesPath = path.resolve(__dirname, '..', '..' , '/server/public/uploads/')
	console.log(imagesPath)
	fs.readdir(imagesPath, 'utf8', function(err, images){
		if(err){
			res.send(err)
		} else {
		    function getAllImages(){
		    	return new Promise(function(res, rej){
				    let html = [];
				        images.forEach(function(image){
			 	    	    let img = '/' + encodeURIComponent(image)
			 	            let obj = {src: img};
				            html.push(obj)
		                })
		            if(err){
                       return rej(err)
                    }
                    return res(html)
                })
		    }		

		    let allImages = getAllImages();
		    allImages.then(function(images){
			    console.log(images)
		    	res.json(images)
		    })
		}
	})
}

function uploadImage(req, res){
	res.send('ok')  
}

function deleteImages (req, res){
    fs.unlink(path.resolve(__dirname, '..', 'public/upload/gifts.jpg'))
}

module.exports = {
	createPageView,
	addPage,
	editPageView,
	editPage,
	deletePage,
	getAllPages,
	getImages,
	uploadImage
}	
